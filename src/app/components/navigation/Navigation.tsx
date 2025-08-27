"use client";
import { GlobalContext } from "@/app/context/GlobalContext";
import { useContext, useState, useEffect } from "react";
import Image from "next/image";

export default function Navigation() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  const context = useContext(GlobalContext);

  if (!context) return <p>Loading...</p>;

  // ✅ get from context
  const { boards, darkMode, selectedOption, setSelectedOption } = context;
  console.log(boards);
  return (
    <div className="flex flex-col gap-4">
      <p
        className={`pl-4 h-[15px] font-plus-jakarta-sans font-bold text-[12px] leading-[15px] tracking-[2.4px] 
        text-[#828FA3]`}
      >
        ALL BOARDS ( {mounted ? boards.length : null})
      </p>

      {boards.map((elem, index) => (
        <div
          key={index}
          onClick={() => setSelectedOption(elem.name)} // ✅ set global selected option
          className={`pl-4 rounded-tr-[100px] rounded-br-[100px] w-[240px] h-[50px] flex items-center cursor-pointer
            ${
              elem.name === selectedOption
                ? "bg-[#635FC7]"
                : darkMode
                ? "bg-[#2B2C37]"
                : "bg-[#F4F7FD]"
            }`}
        >
          <div className="flex items-center gap-3">
            <Image
              src={
                elem.name === selectedOption
                  ? "./images/navigation/board-active.svg"
                  : "./images/navigation/board-inactive.svg"
              }
              alt="board image"
              width={20}
              height={20}
            />
            <p
              className={`font-plus-jakarta-sans font-bold text-[15px] leading-[19px]
                ${
                  elem.name === selectedOption ? "text-white" : "text-[#828FA3]"
                }`}
            >
              {elem.name}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
