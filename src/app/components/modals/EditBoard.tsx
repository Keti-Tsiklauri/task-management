"use client";

import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "@/app/context/GlobalContext";

import { EditBoardModalProps } from "@/app/types/types";

export default function EditBoard({ boardId, onClose }: EditBoardModalProps) {
  const context = useContext(GlobalContext);

  // Initialize state with empty string first (unconditional)
  const [boardName, setBoardName] = useState("");

  // Then set the initial value once the board is available
  useEffect(() => {
    const board = boards.find((b) => b.id === boardId);
    if (board) {
      setBoardName(board.name);
    }
  }, []);
  if (!context) return null;
  const { boards, setBoards, darkMode } = context;

  const handleSave = () => {
    if (!boardName.trim()) return;

    const updatedBoards = boards.map((b) =>
      b.id === boardId ? { ...b, name: boardName } : b
    );

    setBoards(updatedBoards);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className={`absolute inset-0 ${
          darkMode ? "bg-black/80" : "bg-black/50"
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative w-[400px] p-6 rounded-lg shadow-lg ${
          darkMode ? "bg-[#2B2C37] text-white" : "bg-white text-black"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 hover:text-red-500"
        ></button>

        <h2 className="text-lg font-semibold mb-4">Edit Board</h2>
        <input
          type="text"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          className={`w-full p-2 mb-6 rounded border ${
            darkMode ? "bg-[#20212C] border-gray-600" : "border-gray-300"
          }`}
          placeholder="Board Name"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-[#635FC7] text-white hover:bg-[#5247c4]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
