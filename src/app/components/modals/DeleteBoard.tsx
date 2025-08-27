"use client";

import { useContext } from "react";
import { GlobalContext } from "@/app/context/GlobalContext";
import { X } from "lucide-react";
import { DeleteBoardModalProps } from "@/app/types/types";

export default function DeleteBoard({
  boardId,
  onClose,
}: DeleteBoardModalProps) {
  const context = useContext(GlobalContext);
  if (!context) return null;

  const { boards, setBoards, activeBoardId, setOpenModal } = context;
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
    setOpenModal(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-[400px]">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          <X size={20} />
        </button>
        <h2 className="text-lg font-semibold mb-4">Delete Board?</h2>
        <p className="mb-6 text-sm text-gray-600">
          Are you sure you want to delete &apos;
          {boards[activeBoardId ?? 0]?.name}&apos; board? This action cannot be
          undone.
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
