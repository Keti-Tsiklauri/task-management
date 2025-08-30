"use client";

import { useContext } from "react";
import { GlobalContext } from "@/app/context/GlobalContext";

import { DeleteBoardModalProps } from "@/app/types/types";

export default function DeleteBoard({
  boardId,
  onClose,
}: DeleteBoardModalProps) {
  const context = useContext(GlobalContext);
  if (!context) return null;

  const { boards, setBoards, activeBoardId, setOpenBoardModal, darkMode } =
    context;
  const handleDelete = () => {
    // Remove the board
    const filteredBoards = boards.filter((board) => board.id !== boardId);

    // Re-index remaining boards
    const reIndexedBoards = filteredBoards.map((board, index) => ({
      ...board,
      id: index,
    }));

    setBoards(reIndexedBoards);

    // Set activeBoardId to first board if any boards remain
    if (reIndexedBoards.length > 0) {
      context.setActiveBoardId(0); // default to first board
    } else {
      context.setActiveBoardId(null); // if no boards remain
    }

    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-center ${
        darkMode ? "bg-black/80" : "bg-black/40"
      }`}
    >
      <div
        className={`relative w-[400px] max-w-[90%] p-6 rounded-lg shadow-xl
      ${darkMode ? "bg-[#2B2C37] text-white" : "bg-white text-[#000112]"}`}
      >
        {/* Close button */}

        {/* Title */}
        <h2 className="text-xl font-bold mb-4 text-[#EA5555]">Delete Board?</h2>

        {/* Message */}
        <p className="mb-6 text-sm text-gray-400">
          Are you sure you want to delete &apos;
          {boards[activeBoardId ?? 0]?.name}&apos; board? This action cannot be
          undone.
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
