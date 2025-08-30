"use client";

import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "@/app/context/GlobalContext";
import { Task } from "@/app/types/types";
import EditDeleteTask from "./EditDeleteTask";
export default function TaskModal() {
  const context = useContext(GlobalContext);

  // Hooks must always be called at the top
  const [localTask, setLocalTask] = useState<Task | null>(null);

  useEffect(() => {
    if (context?.selectedTask) {
      setLocalTask(context.selectedTask);
    }
  }, [context?.selectedTask]);

  const [showModal, setShowModal] = useState(false);
  if (!context || !context.selectedTask || !localTask) return null;

  const {
    boards,
    setBoards,
    setSelectedTask,
    selectedTask,
    darkMode,
    activeBoardId,
  } = context;

  const toggleSubtask = (index: number) => {
    setLocalTask((prev) => ({
      ...prev!,
      subtasks: prev!.subtasks.map((s, i) =>
        i === index ? { ...s, isCompleted: !s.isCompleted } : s
      ),
    }));
  };
  console.log(selectedTask);
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!localTask) return;
    setLocalTask({ ...localTask, status: e.target.value });
  };
  const handleSave = () => {
    if (!localTask) return;

    const updatedBoards = boards.map((board) => {
      if (board.id !== activeBoardId) return board;

      const updatedColumns = board.columns.map((col) => {
        if (col.name === localTask.status) {
          // update the task in-place if it already exists in this column
          const tasks = col.tasks.map((t) =>
            t.id === localTask.id ? localTask : t
          );

          // if task not in this column yet, append it
          const taskExists = col.tasks.some((t) => t.id === localTask.id);
          return {
            ...col,
            tasks: taskExists ? tasks : [...tasks, localTask],
          };
        } else {
          // remove task from other columns
          return {
            ...col,
            tasks: col.tasks.filter((t) => t.id !== localTask.id),
          };
        }
      });

      return { ...board, columns: updatedColumns };
    });

    setBoards(updatedBoards);
    setSelectedTask(null);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={() => setSelectedTask(null)}
    >
      <div
        className={`w-[343px] max-h-[90vh] overflow-y-auto rounded-lg p-6 shadow-lg ${
          darkMode ? "bg-[#2B2C37] text-white" : "bg-white text-[#000112]"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex justify-between items-start mb-4">
          <h2 className="font-bold text-lg leading-[23px]">
            {localTask.title}
          </h2>
          <button
            className="flex flex-col gap-[3px]"
            onClick={() => setShowModal((prev) => !prev)}
          >
            <span className="w-1 h-1 rounded-full bg-[#828FA3]" />
            <span className="w-1 h-1 rounded-full bg-[#828FA3]" />
            <span className="w-1 h-1 rounded-full bg-[#828FA3]" />
          </button>

          {/* Dropdown / EditDeleteTask */}
          {showModal && (
            <div className="absolute top-full right-0 z-50 mt-2">
              <EditDeleteTask />
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-[#828FA3] mb-6 leading-6">
          {localTask.description}
        </p>

        {/* Subtasks */}
        <div className="mb-6">
          <p className="text-xs font-bold text-[#828FA3] mb-2">
            Subtasks ({localTask.subtasks.filter((s) => s.isCompleted).length}{" "}
            of {localTask.subtasks.length})
          </p>
          <div className="flex flex-col gap-2">
            {localTask.subtasks.map((s, i) => (
              <label
                key={i}
                className={`flex items-center gap-3 rounded px-3 py-2 cursor-pointer select-none ${
                  darkMode ? "bg-[#20212C]" : "bg-[#F4F7FD]"
                }`}
              >
                <input
                  type="checkbox"
                  checked={s.isCompleted}
                  onChange={() => toggleSubtask(i)}
                  className="w-4 h-4 accent-[#635FC7] cursor-pointer"
                />
                <span
                  className={`text-xs font-bold ${
                    s.isCompleted
                      ? "line-through text-gray-400"
                      : darkMode
                      ? "text-white"
                      : "text-black"
                  }`}
                >
                  {s.title}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Status Dropdown */}
        <div className="flex flex-col gap-2 mb-4">
          <p className="text-xs font-bold text-[#828FA3]">Current Status</p>
          <select
            value={localTask.status}
            onChange={handleStatusChange}
            className="w-full border rounded p-2 text-sm outline-none focus:ring-2 focus:ring-[#635FC7]"
          >
            <option value="Todo">Todo</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-[#635FC7] text-white py-2 rounded hover:bg-[#4E4AC9]"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
