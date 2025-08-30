"use client";

import React, { useContext, useState, useEffect, useRef } from "react";
import { GlobalContext } from "@/app/context/GlobalContext";
import { Task } from "@/app/types/types";
import EditDeleteTask from "./EditDeleteTask";

export default function TaskModal() {
  const context = useContext(GlobalContext);

  const [localTask, setLocalTask] = useState<Task | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (context?.selectedTask) setLocalTask(context.selectedTask);
  }, [context?.selectedTask]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!context || !context.selectedTask || !localTask) return null;

  const { boards, setBoards, setSelectedTask, darkMode, activeBoardId } =
    context;

  const statusColors: { [key: string]: string } = {
    Todo: darkMode ? "bg-[#49C4E5]" : "bg-[#49C4E5]",
    Doing: darkMode ? "bg-[#635FC7]" : "bg-[#635FC7]",
    Done: darkMode ? "bg-[#3CB371]" : "bg-[#3CB371]",
  };

  const handleStatusChange = (status: string) => {
    if (!localTask) return;
    setLocalTask({ ...localTask, status });
    setDropdownOpen(false);
  };

  const toggleSubtask = (index: number) => {
    setLocalTask((prev) => ({
      ...prev!,
      subtasks: prev!.subtasks.map((s, i) =>
        i === index ? { ...s, isCompleted: !s.isCompleted } : s
      ),
    }));
  };

  const handleSave = () => {
    if (!localTask) return;

    const updatedBoards = boards.map((board) => {
      if (board.id !== activeBoardId) return board;

      // Ensure all default columns exist (Todo, Doing, Done)
      const requiredColumns = ["Todo", "Doing", "Done"];
      const newColumns = [...board.columns];

      requiredColumns.forEach((colName, index) => {
        if (!newColumns.find((c) => c.name === colName)) {
          newColumns.push({
            id: Date.now() + index, // ✅ number
            name: colName,
            tasks: [],
          });
        }
      });

      // Update tasks
      const updatedColumns = newColumns.map((col) => {
        if (col.name === localTask.status) {
          const tasks = col.tasks.map((t) =>
            t.id === localTask.id ? localTask : t
          );
          const taskExists = col.tasks.some((t) => t.id === localTask.id);
          return {
            ...col,
            tasks: taskExists ? tasks : [...col.tasks, localTask],
          };
        } else {
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
        {/* Header */}
        <div className="relative flex justify-between items-start mb-4">
          <h2 className="font-bold text-lg leading-[23px]">
            {localTask.title}
          </h2>
          <button
            className="flex flex-col gap-[3px] cursor-pointer"
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
            {localTask.subtasks.map((subtask, idx) => (
              <label
                key={subtask.id}
                className={`flex items-center gap-2 p-2 border rounded ${
                  darkMode ? "border-[#3E3F4E]" : "border-[#E4EBFA]"
                }`}
              >
                <input
                  type="checkbox"
                  checked={subtask.isCompleted}
                  onChange={() => toggleSubtask(idx)}
                  className="accent-[#635FC7]"
                />
                <span className={subtask.isCompleted ? "line-through" : ""}>
                  {subtask.title}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Status Dropdown */}
        <div className="flex flex-col gap-2 mb-6 relative" ref={dropdownRef}>
          <p
            className="text-xs font-bold"
            style={{ color: darkMode ? "#828FA3" : "#828FA3" }}
          >
            Current Status
          </p>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className={`w-full p-2 rounded border text-left text-sm ${
              darkMode
                ? `${
                    statusColors[localTask.status]
                  } border-[#3E3F4E] text-white`
                : `${
                    statusColors[localTask.status]
                  } border-[#E4EBFA] text-white`
            }`}
          >
            {localTask.status}
          </button>
          {dropdownOpen && (
            <ul
              className={`absolute left-0 w-full mt-6 rounded border overflow-hidden z-50 ${
                darkMode
                  ? "bg-[#2B2C37] border-[#3E3F4E]"
                  : "bg-white border-[#E4EBFA]"
              }`}
            >
              {["Todo", "Doing", "Done"].map((statusOption) => (
                <li
                  key={statusOption}
                  onClick={() => handleStatusChange(statusOption)}
                  className={`p-2 text-sm cursor-pointer hover:${
                    darkMode ? "bg-[#4B4C5E]" : "bg-[#635FC71A]"
                  }`}
                >
                  {statusOption}
                </li>
              ))}
            </ul>
          )}
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
