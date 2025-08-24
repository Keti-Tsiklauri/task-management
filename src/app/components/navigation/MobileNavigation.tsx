// src/app/components/navigation/MobileTopBar.tsx

"use client";
import Image from "next/image";
import { useState, useContext } from "react";
import { GlobalContext } from "@/app/context/GlobalContext";
import Navigation from "./Navigation";
import ModeToggle from "./ModeToggle";
export default function MobileTopBar() {
  const [open, setOpen] = useState(false); // 👈 dropdown toggle
  const context = useContext(GlobalContext);

  if (!context) return <p>Loading...</p>;

  const { selectedOption, darkMode } = context;

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
        <>
          {/* Overlay for everything except the dropdown */}
          <div
            className="fixed inset-0 bg-[#979797] opacity-50 z-40"
            // clicking the overlay can close the dropdown if you want
            onClick={() => setOpen(false)}
          ></div>

          {/* Dropdown stays on top of the overlay */}
          <div
            className={`absolute left-[54px] top-[80px] w-[264px] h-[full] shadow-lg rounded-lg z-50 flex flex-col ${
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
    </div>
  );
}
