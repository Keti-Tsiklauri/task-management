"use client";
import { GlobalContext } from "@/app/context/GlobalContext";
import { useContext, useState } from "react";
import Image from "next/image";

export default function Navigation() {
  const context = useContext(GlobalContext);
  const [activeIndex, setActiveIndex] = useState(0); // default first board active
  if (!context) return <p>Loading...</p>;

  const { boards, darkMode } = context;

  // State to track the active board

  return (
    <div
      className={`flex flex-col gap-4 ${darkMode ? "bg-black" : "bg-white"}`}
    >
      <p
        className={`h-[15px] font-plus-jakarta-sans font-bold text-[12px] leading-[15px] tracking-[2.4px] ml-[24px]
        ${darkMode ? "text-black" : "text-[#828FA3]"}`}
      >
        all boards ({boards.length})
      </p>

      {boards.map((elem, index) => (
        <div
          key={index}
          onClick={() => setActiveIndex(index)} // set active on click
          className={`rounded-tr-[100px] rounded-br-[100px] rounded-tl-0 rounded-bl-0 w-[240px] h-[50px] flex items-center cursor-pointer
            ${
              index === activeIndex
                ? "bg-[#635FC7]"
                : darkMode
                ? "bg-[#20212C]"
                : "bg-[#F4F7FD]"
            }`}
        >
          <div className="flex items-center gap-3 ml-[24px]">
            <Image
              src={
                index === activeIndex
                  ? "/images/navigation/board-active.svg"
                  : "/images/navigation/board-inactive.svg"
              }
              alt="board image"
              width={20}
              height={20}
            />
            <p
              className={`font-plus-jakarta-sans font-bold text-[15px] leading-[19px] h-[19px]
                ${index === activeIndex ? "text-white" : "text-[#828FA3]"}`}
            >
              {elem.name}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
