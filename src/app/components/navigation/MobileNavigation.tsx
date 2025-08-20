// src/app/components/navigation/MobileTopBar.tsx

"use client";
import Image from "next/image";
import { useState, useContext } from "react";
import { GlobalContext } from "@/app/context/GlobalContext";

export default function MobileTopBar() {
  const [open, setOpen] = useState(false); // 👈 dropdown toggle
  const context = useContext(GlobalContext);

  if (!context) return <p>Loading...</p>;

  const { boards, selectedOption, setSelectedOption } = context;

  return (
    <div className="relative w-full  h-[64px] bg-[#2B2C37] flex items-center px-4">
      {/* Left Logo (3 bars) */}
      <div className="flex gap-[3px]">
        <div className="w-[6px] h-[25px] bg-[#635FC7] rounded-[2px]" />
        <div className="w-[6px] h-[25px] bg-[#635FC7] rounded-[2px] opacity-75" />
        <div className="w-[6px] h-[25px] bg-[#635FC7] rounded-[2px] opacity-50" />
      </div>

      {/* Title + Dropdown toggle */}
      <div
        className="flex items-center gap-1 ml-4 cursor-pointer select-none"
        onClick={() => setOpen((prev) => !prev)}
      >
        <h1 className="font-['Plus_Jakarta_Sans'] font-bold text-[18px] leading-[23px] text-white">
          {selectedOption}
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
      <div className="ml-auto flex items-center justify-center w-[48px] h-[32px] rounded-[24px] bg-[#635FC7] opacity-25">
        <span className="text-white text-[20px] leading-none">+</span>
      </div>

      {/* Options (3 dots) */}
      <div className="ml-3 flex flex-col justify-between h-[16px]">
        <div className="w-[3.69px] h-[3.69px] bg-[#828FA3] rounded-full" />
        <div className="w-[3.69px] h-[3.69px] bg-[#828FA3] rounded-full" />
        <div className="w-[3.69px] h-[3.69px] bg-[#828FA3] rounded-full" />
      </div>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute top-[64px] left-0 w-full bg-[#2B2C37] border-t border-[#3E3F4E] shadow-lg z-50">
          {boards.map((board: { name: string }, idx: number) => (
            <div
              key={idx}
              className="px-4 py-3 text-white hover:bg-[#635FC7] hover:text-white cursor-pointer font-['Plus_Jakarta_Sans']"
              onClick={() => {
                setSelectedOption(board.name);
                setOpen(false);
              }}
            >
              {board.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
