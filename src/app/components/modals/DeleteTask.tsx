"use client";

import { useContext } from "react";
import { GlobalContext } from "@/app/context/GlobalContext";

type DeleteTaskProps = {
  taskId: number;
  onClose: () => void;
};

export default function DeleteTask({ taskId, onClose }: DeleteTaskProps) {
  const context = useContext(GlobalContext);
  if (!context) return null;

  const {
    boards,
    setBoards,
    activeBoardId,
    setOpenTaskModal,
    darkMode,
    setSelectedTask,
  } = context;

  const handleDelete = () => {
    const updatedBoards = boards.map((board) => {
      if (board.id !== activeBoardId) return board;

      const updatedColumns = board.columns.map((col) => ({
        ...col,
        tasks: col.tasks.filter((task) => task.id !== taskId),
      }));

      return { ...board, columns: updatedColumns };
    });

    setBoards(updatedBoards);
    onClose();
    setOpenTaskModal((prev) => !prev);
    setSelectedTask(null);
  };

  // Get task title for confirmation message
  const task = boards[activeBoardId ?? 0]?.columns
    .flatMap((col) => col.tasks)
    .find((t) => t.id === taskId);

  return (
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-center ${
        darkMode ? "bg-black/80" : "bg-black/40"
      }`}
    >
      <div
        className={`relative w-[400px] max-w-[90%] p-6 rounded-lg shadow-xl ${
          darkMode ? "bg-[#2B2C37] text-white" : "bg-white text-[#000112]"
        }`}
      >
        {/* Title */}
        <h2 className="text-xl font-bold mb-4 text-[#EA5555]">Delete Task?</h2>

        {/* Message */}
        <p className="mb-6 text-sm text-gray-400">
          Are you sure you want to delete &apos;{task?.title}&apos; task? This
          action cannot be undone.
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-5 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
