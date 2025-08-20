"use client";
import { useContext } from "react";
import { GlobalContext } from "@/app/context/GlobalContext";
import Logo from "../Logo";
export default function TopBar() {
  const context = useContext(GlobalContext);

  if (!context) return <p>Loading...</p>;

  // ✅ get from context
  const { selectedOption } = context;
  return (
    <div className="absolute  top-0 w-full  h-[97px] bg-white flex items-center  justify-between px-6 border-b border-[#E4EBFA]">
      <div className="pl-4 pt-4">
        <Logo />
      </div>
      {/* Title */}
      <h1 className="font-plus-jakarta-sans font-bold text-[24px] leading-[30px] text-[#000112]">
        {selectedOption}
      </h1>

      {/* Right side controls */}
      <div className="flex items-center gap-4">
        {/* Add New Task Button */}
        <button className="flex items-center justify-center gap-2 w-[192px] h-[48px] bg-[#635FC7] rounded-[24px] opacity-25 hover:opacity-100 transition">
          <span className="text-white font-plus-jakarta-sans font-bold text-[15px] leading-[19px] cursor-pointer">
            + Add New Task
          </span>
        </button>

        {/* Options (3 dots) */}
        <div className="flex flex-col justify-between h-[20px] cursor-pointer">
          <div className="w-[4.62px] h-[4.62px] rounded-full bg-[#828FA3]" />
          <div className="w-[4.62px] h-[4.62px] rounded-full bg-[#828FA3]" />
          <div className="w-[4.62px] h-[4.62px] rounded-full bg-[#828FA3]" />
        </div>
      </div>
    </div>
  );
}
