"use client";

import { useContext, useState } from "react";
import { GlobalContext } from "@/app/context/GlobalContext";

import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";

export default function EditDeleteTask() {
  const context = useContext(GlobalContext);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  if (!context) return <p>Loading...</p>;

  const { darkMode, selectedTask, setOpenModal } = context;
  if (!selectedTask) return null; // Don't render if no task is selected

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
          Edit Task
        </p>
        <p
          className="font-plus-jakarta-sans font-medium text-[13px] leading-[23px] 
          text-[#EA5555] cursor-pointer hover:text-red-400 transition-colors"
          onClick={() => setShowDeleteModal(true)}
        >
          Delete Task
        </p>
      </div>

      {/* Edit Task Modal */}
      {showEditModal && (
        <EditTask
          onClose={() => {
            setShowEditModal(false);
            setOpenModal(false);
          }}
        />
      )}

      {/* Delete Task Modal */}
      {showDeleteModal && selectedTask?.id !== undefined && (
        <DeleteTask
          taskId={selectedTask.id}
          onClose={() => {
            setShowDeleteModal(false);
            setOpenModal(false);
          }}
        />
      )}
    </>
  );
}
