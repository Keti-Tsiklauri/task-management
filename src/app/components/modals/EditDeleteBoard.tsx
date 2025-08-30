"use client";
import { useContext, useState } from "react";
import { GlobalContext } from "@/app/context/GlobalContext";
import DeleteBoard from "./DeleteBoard";
import EditBoard from "./EditBoard";
export default function EditDeleteBoard() {
  const context = useContext(GlobalContext);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  if (!context) return <p>Loading...</p>;

  const { darkMode, activeBoardId } = context;
  return (
    <>
      <div
        className={`flex flex-col w-[200px] rounded-lg shadow-[0px_10px_20px_rgba(54,78,126,0.25)] p-4
        ${darkMode ? "bg-[#2B2C37]" : "bg-white"}`}
      >
        <p
          className="font-plus-jakarta-sans font-medium text-[13px] leading-[23px] 
          text-[#828FA3] cursor-pointer hover:text-[#635FC7] transition-colors"
          onClick={() => setShowEditModal(true)}
        >
          Edit Board
        </p>
        <p
          className="font-plus-jakarta-sans font-medium text-[13px] leading-[23px] 
          text-[#EA5555] cursor-pointer hover:text-red-400 transition-colors"
          onClick={() => setShowDeleteModal(true)}
        >
          Delete Board
        </p>
      </div>

      {showDeleteModal && (
        <DeleteBoard
          boardId={activeBoardId} // <-- make sure you have this id
          onClose={() => setShowDeleteModal(false)}
        />
      )}
      {showEditModal && (
        <EditBoard
          boardId={activeBoardId} // <-- make sure you have this id
          onClose={() => setShowEditModal(false)}
        />
      )}
    </>
  );
}
