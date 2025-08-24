"use client";

import { GlobalContext } from "@/app/context/GlobalContext";
import { useContext, useState, useRef, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

type AddNewTaskProps = {
  onClose: () => void;
};

export default function AddNewTask({ onClose }: AddNewTaskProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [subtasks, setSubtasks] = useState<string[]>(["", ""]);

  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);
  const context = useContext(GlobalContext);
  if (!context) return null;
  const { darkMode, boards, setBoards } = context;
  const handleChange = (index: number, value: string) => {
    const updated = [...subtasks];
    updated[index] = value;
    setSubtasks(updated);
  };

  const handleRemove = (index: number) =>
    setSubtasks(subtasks.filter((_, i) => i !== index));
  const handleAdd = () => setSubtasks([...subtasks, ""]);

  const handleCreate = () => {
    if (!title.trim()) return;

    const newTask = {
      id: uuidv4(),
      title,
      description,
      status: status.charAt(0).toUpperCase() + status.slice(1),
      subtasks: subtasks
        .filter((s) => s.trim() !== "")
        .map((s) => ({ id: uuidv4(), title: s.trim(), isCompleted: false })),
    };

    const updatedBoards = boards.map((board) => {
      // check if the column exists
      const columnIndex = board.columns.findIndex(
        (col) => col.name.toLowerCase() === status.toLowerCase()
      );

      if (columnIndex !== -1) {
        // column exists, add task
        const updatedColumns = [...board.columns];
        updatedColumns[columnIndex] = {
          ...updatedColumns[columnIndex],
          tasks: [...updatedColumns[columnIndex].tasks, newTask],
        };
        return { ...board, columns: updatedColumns };
      } else {
        // column doesn't exist, create it
        const newColumn = {
          id: uuidv4(),
          name: status.charAt(0).toUpperCase() + status.slice(1),
          tasks: [newTask],
        };
        return { ...board, columns: [...board.columns, newColumn] };
      }
    });

    setBoards(updatedBoards);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div
        ref={modalRef}
        className="w-[480px] max-h-[90vh] overflow-auto rounded-md p-6 flex flex-col gap-6"
        style={{ backgroundColor: darkMode ? "#2B2C37" : "white" }}
      >
        {/* Title */}
        <p
          className="font-bold text-[18px]"
          style={{ color: darkMode ? "white" : "black" }}
        >
          Add New Task
        </p>

        {/* Title Input */}
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
            placeholder="e.g. Take coffee break"
            className="w-full h-[40px] border border-[rgba(130,143,163,0.25)] rounded-[4px] px-3 text-[13px] leading-[23px] font-medium"
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
            placeholder="e.g. It’s always good to take a break..."
            className="w-full min-h-[100px] border border-[rgba(130,143,163,0.25)] rounded-[4px] px-3 py-2 text-[13px] leading-[23px] font-medium resize-none"
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
              className="flex items-center gap-2 w-full h-[40px] border border-[rgba(130,143,163,0.25)] rounded-[4px] px-3"
              style={{ backgroundColor: darkMode ? "#2B2C37" : "white" }}
            >
              <input
                type="text"
                value={subtask}
                onChange={(e) => handleChange(index, e.target.value)}
                placeholder="e.g. Make coffee"
                className="flex-1 bg-transparent outline-none text-[13px] leading-[23px]"
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
            className="w-full h-[40px] rounded-md bg-[#635FC71A] text-[#635FC7] font-bold text-[13px] leading-[23px] hover:bg-[#635FC733]"
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
            className="w-full h-[40px] px-3 rounded-[4px] border font-medium text-[13px] leading-[23px] appearance-none pr-8"
            style={{
              backgroundColor: darkMode ? "#2B2C37" : "white",
              color: darkMode ? "white" : "black",
              borderColor: darkMode ? "rgba(130,143,163,0.25)" : "#828FA3",
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

        {/* Submit */}
        <button
          onClick={handleCreate}
          className="w-full h-[40px] bg-[#635FC7] rounded-[20px] flex items-center justify-center text-white text-[13px] font-bold hover:bg-[#6f6bda]"
        >
          Create Task
        </button>
      </div>
    </div>
  );
}
