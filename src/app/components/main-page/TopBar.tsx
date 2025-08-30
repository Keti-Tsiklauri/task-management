"use client";
import { useContext, useRef, useEffect } from "react";
import { GlobalContext } from "@/app/context/GlobalContext";
import Logo from "../navigation/Logo";
import AddNewTask from "../modals/AddNewTask";
import EditDeleteBoard from "../modals/EditDeleteBoard";

export default function TopBar() {
  const context = useContext(GlobalContext);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  if (!context) return <p>Loading...</p>;

  const {
    boards,
    activeBoardId,
    darkMode,
    isOpen,
    setIsOpen,
    openBoardModal,
    setOpenBoardModal,
  } = context;
  // ✅ Get the active board name
  const activeBoardName =
    boards.find((board) => board.id === activeBoardId)?.name || "No Board";

  return (
    <div
      className={`${
        darkMode ? "bg-[#2B2C37] border-[#979797]" : "bg-white border-[#E4EBFA]"
      } absolute top-0 w-full h-[97px] flex items-center justify-between px-6 border-b`}
    >
      <div className="pl-4 pt-4">
        <Logo />
      </div>

      {/* Title */}
      <h1
        className={`font-plus-jakarta-sans font-bold text-[24px] leading-[30px] ${
          darkMode ? "text-white" : "text-[#000112]"
        }`}
      >
        {activeBoardName}
      </h1>

      {/* Right side controls */}
      <div className="flex items-center gap-4 relative">
        {/* Add New Task Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center gap-2 w-[192px] h-[48px] bg-[#635FC7] rounded-[24px] opacity-25 hover:opacity-100 transition"
          disabled={!activeBoardId} // ✅ disable if no board is selected
        >
          <span className="text-white font-plus-jakarta-sans font-bold text-[15px] leading-[19px] cursor-pointer">
            + Add New Task
          </span>
        </button>

        {/* Options (3 dots) */}
        <div
          className="flex flex-col justify-between h-[20px] cursor-pointer"
          onClick={() => setOpenBoardModal((prev) => !prev)}
        >
          <div className="w-[4.62px] h-[4.62px] rounded-full bg-[#828FA3]" />
          <div className="w-[4.62px] h-[4.62px] rounded-full bg-[#828FA3]" />
          <div className="w-[4.62px] h-[4.62px] rounded-full bg-[#828FA3]" />
        </div>

        {/* Dropdown under 3 dots */}
        {openBoardModal && (
          <div ref={dropdownRef} className="absolute top-[120%] right-0">
            <EditDeleteBoard />
          </div>
        )}
      </div>

      {isOpen && <AddNewTask onClose={() => setIsOpen(false)} />}
    </div>
  );
}
