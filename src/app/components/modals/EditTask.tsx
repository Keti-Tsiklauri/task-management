"use client";

import { GlobalContext } from "@/app/context/GlobalContext";
import { useContext, useState, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";
import { Board, Column, Task, Subtask } from "@/app/types/types";

type EditTaskProps = {
  onClose: () => void;
};

export default function EditTask({ onClose }: EditTaskProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [subtasks, setSubtasks] = useState<string[]>([]);

  useEffect(() => {
    if (!selectedTask) return;

    setTitle(selectedTask.title || "");
    setDescription(selectedTask.description || "");
    setStatus(selectedTask.status?.toLowerCase() || "todo");
    setSubtasks(selectedTask.subtasks.map((s) => s.title || ""));
  }, []);
  const context = useContext(GlobalContext);
  if (!context) return <p>Loading...</p>;
  const {
    darkMode,
    boards,
    setBoards,
    activeBoardId,
    selectedTask,
    setSelectedTask,
  } = context;
  if (!selectedTask) return null;

  // ----------------- Handlers -----------------
  const handleChange = (index: number, value: string) => {
    const updated = [...subtasks];
    updated[index] = value;
    setSubtasks(updated);
  };

  const handleRemove = (index: number) =>
    setSubtasks(subtasks.filter((_, i) => i !== index));

  const handleAdd = () => setSubtasks([...subtasks, ""]);

  const handleSave = () => {
    if (!title.trim()) return;

    const updatedTask: Task = {
      ...selectedTask,
      title,
      description,
      status: status.charAt(0).toUpperCase() + status.slice(1),
      subtasks: subtasks
        .filter((s) => s.trim() !== "")
        .map<Subtask>((s, idx) => ({
          id:
            selectedTask.subtasks[idx]?.id ||
            Math.floor(Math.random() * 1000000),
          title: s.trim(),
          isCompleted: selectedTask.subtasks[idx]?.isCompleted || false,
        })),
    };

    const updatedBoards = boards.map((board: Board) => {
      if (board.id !== activeBoardId) return board;

      const updatedColumns = board.columns.map((col: Column) => {
        // remove from old column if status changed
        if (
          col.tasks.some((task) => task.id === selectedTask.id) &&
          col.name.toLowerCase() !== status.toLowerCase()
        ) {
          return {
            ...col,
            tasks: col.tasks.filter((t) => t.id !== selectedTask.id),
          };
        }

        // add/update in new column
        if (col.name.toLowerCase() === status.toLowerCase()) {
          const existing = col.tasks.some((t) => t.id === selectedTask.id);
          return {
            ...col,
            tasks: existing
              ? col.tasks.map((t) =>
                  t.id === selectedTask.id ? updatedTask : t
                )
              : [...col.tasks, updatedTask],
          };
        }

        return col;
      });

      return { ...board, columns: updatedColumns };
    });

    setBoards(updatedBoards);
    setSelectedTask(updatedTask);
    onClose();
    setSelectedTask(null);
  };

  // ----------------- JSX -----------------
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="min-w-[343px] max-w-[480px] w-full max-h-[90vh] overflow-auto rounded-md p-6 flex flex-col gap-6"
        style={{ backgroundColor: darkMode ? "#2B2C37" : "white" }}
      >
        {/* Header */}
        <div className="flex justify-between">
          <p
            className="font-bold text-[18px]"
            style={{ color: darkMode ? "white" : "black" }}
          >
            Edit Task
          </p>
          <button
            onClick={onClose}
            className="text-[#828FA3] hover:text-red-500 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Title */}
        <div className="w-full flex flex-col gap-2">
          <label
            className="font-bold text-[12px]"
            style={{ color: darkMode ? "white" : "#828FA3" }}
          >
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-[40px] border rounded-[4px] px-3 text-[13px]"
            style={{
              backgroundColor: darkMode ? "#2B2C37" : "white",
              color: darkMode ? "white" : "black",
            }}
          />
        </div>

        {/* Description */}
        <div className="w-full flex flex-col gap-2">
          <label
            className="font-bold text-[12px]"
            style={{ color: darkMode ? "white" : "#828FA3" }}
          >
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full min-h-[100px] border rounded-[4px] px-3 py-2 text-[13px]"
            style={{
              backgroundColor: darkMode ? "#2B2C37" : "white",
              color: darkMode ? "white" : "black",
            }}
          />
        </div>

        {/* Subtasks */}
        <div className="w-full flex flex-col gap-3">
          <label
            className="font-bold text-[12px]"
            style={{ color: darkMode ? "white" : "#828FA3" }}
          >
            Subtasks
          </label>
          {subtasks.map((subtask, index) => (
            <div
              key={index}
              className="flex items-center gap-2 w-full h-[40px] border rounded-[4px] px-3"
              style={{ backgroundColor: darkMode ? "#2B2C37" : "white" }}
            >
              <input
                type="text"
                value={subtask}
                onChange={(e) => handleChange(index, e.target.value)}
                className="flex-1 bg-transparent outline-none text-[13px]"
                style={{ color: darkMode ? "white" : "black" }}
              />
              <button
                onClick={() => handleRemove(index)}
                className="text-[#828FA3] hover:text-red-500"
              >
                <X size={16} />
              </button>
            </div>
          ))}
          <button
            onClick={handleAdd}
            className="w-full h-[40px] rounded-md bg-[#635FC71A] text-[#635FC7] font-bold text-[13px] hover:bg-[#635FC733]"
          >
            + Add New Subtask
          </button>
        </div>

        {/* Status */}
        <div className="w-full flex flex-col gap-2 relative">
          <label
            className="font-bold text-[12px]"
            style={{ color: darkMode ? "white" : "#828FA3" }}
          >
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full h-[40px] px-3 rounded-[4px] border pr-8 text-[13px]"
            style={{
              backgroundColor: darkMode ? "#2B2C37" : "white",
              color: darkMode ? "white" : "black",
            }}
          >
            <option value="todo">Todo</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#635FC7]"
            size={16}
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full h-[40px] bg-[#635FC7] rounded-[20px] flex items-center justify-center text-white text-[13px] font-bold hover:bg-[#6f6bda]"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
