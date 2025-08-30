"use client";
import Image from "next/image";
import { useState, useContext } from "react";
import { GlobalContext } from "@/app/context/GlobalContext";
import Navigation from "./Navigation";
import ModeToggle from "./ModeToggle";
import AddNewTask from "../modals/AddNewTask";
import EditDeleteBoard from "../modals/EditDeleteBoard";

export default function MobileTopBar() {
  const [open, setOpen] = useState(false); // 👈 dropdown toggle
  const context = useContext(GlobalContext);

  if (!context) return <p>Loading...</p>;

  const {
    boards,
    activeBoardId,
    darkMode,
    isOpen,
    setIsOpen,
    openModal,
    setOpenModal,
  } = context;

  // ✅ Get the active board’s name
  const activeBoardName =
    boards.find((board) => board.id === activeBoardId)?.name || "No Board";

  return (
    <div className="relative w-full h-[64px] bg-[#2B2C37] flex items-center px-4">
      {/* Left Logo (3 bars) */}
      <div className="flex gap-[3px]">
        <div className="w-[6px] h-[25px] bg-[#635FC7] rounded-[2px]" />
        <div className="w-[6px] h-[25px] bg-[#635FC7] rounded-[2px] opacity-75" />
        <div className="w-[6px] h-[25px] bg-[#635FC7] rounded-[2px] opacity-50" />
      </div>

      {/* Dropdown under 3 dots */}
      {openModal && (
        <div className="absolute top-[110%] right-0 z-50">
          <EditDeleteBoard />
        </div>
      )}

      {/* Title + Dropdown toggle */}
      <div
        className="flex items-center gap-1 ml-4 cursor-pointer select-none"
        onClick={() => setOpen((prev) => !prev)}
      >
        <h1 className="font-['Plus_Jakarta_Sans'] font-bold text-[18px] leading-[23px] text-white">
          {activeBoardName}
        </h1>
        <Image
          src="/images/navigation/arrow.svg"
          alt="dropdown"
          width={8}
          height={4}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </div>

      {/* Add button */}
      <div
        className={`ml-auto flex items-center justify-center w-[48px] h-[32px] rounded-[24px] ${
          activeBoardId !== null
            ? "bg-[#635FC7] opacity-100 cursor-pointer"
            : "bg-gray-500 opacity-50 cursor-not-allowed"
        }`}
        onClick={() => activeBoardId !== null && setIsOpen(true)}
      >
        <span className="text-white text-[20px] leading-none">+</span>
      </div>

      {/* Options (3 dots) */}
      <div
        className="ml-3 flex flex-col justify-between h-[16px] cursor-pointer"
        onClick={() => setOpenModal((prev) => !prev)}
      >
        <div className="w-[3.69px] h-[3.69px] bg-[#828FA3] rounded-full" />
        <div className="w-[3.69px] h-[3.69px] bg-[#828FA3] rounded-full" />
        <div className="w-[3.69px] h-[3.69px] bg-[#828FA3] rounded-full" />
      </div>

      {/* Dropdown menu */}
      {open && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-[#979797] opacity-50 z-40"
            onClick={() => setOpen(false)}
          ></div>

          {/* Dropdown content */}
          <div
            className={`absolute left-[54px] top-[80px] w-[264px] shadow-lg rounded-lg z-50 flex flex-col ${
              darkMode ? "bg-[#2B2C37]" : "bg-white"
            }`}
            style={{
              boxShadow: "0px 10px 20px rgba(54, 78, 126, 0.25)",
            }}
          >
            <div className="mt-4">
              <Navigation />
            </div>
            <div className="pl-4 mt-3 mb-4">
              <ModeToggle />
            </div>
          </div>
        </>
      )}

      {isOpen && <AddNewTask onClose={() => setIsOpen(false)} />}
    </div>
  );
}
