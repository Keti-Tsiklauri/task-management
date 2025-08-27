"use client";
import { GlobalContext } from "@/app/context/GlobalContext";
import { useContext, useState, useEffect } from "react";
import Image from "next/image";

export default function Navigation() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const context = useContext(GlobalContext);

  // ✅ set first board as default if none is active
  useEffect(() => {
    if (
      boards.length > 0 &&
      (activeBoardId === null || activeBoardId === undefined)
    ) {
      setActiveBoardId(boards[0].id);
    }
  }, [context]);
  if (!context) return <p>Loading...</p>;
  const { boards, darkMode, activeBoardId, setActiveBoardId } = context;

  return (
    <div className="flex flex-col gap-4">
      <p
        className={`pl-4 h-[15px] font-plus-jakarta-sans font-bold text-[12px] leading-[15px] tracking-[2.4px] 
        text-[#828FA3]`}
      >
        ALL BOARDS ( {mounted ? boards.length : null} )
      </p>

      {boards.map((elem, index) => (
        <div
          key={index}
          onClick={() => setActiveBoardId(elem.id)}
          className={`pl-4 rounded-tr-[100px] rounded-br-[100px] w-[240px] h-[50px] flex items-center cursor-pointer
            ${
              elem.id === activeBoardId
                ? "bg-[#635FC7]"
                : darkMode
                ? "bg-[#2B2C37]"
                : "bg-[#F4F7FD]"
            }`}
        >
          <div className="flex items-center gap-3">
            <Image
              src={
                elem.id === activeBoardId
                  ? "./images/navigation/board-active.svg"
                  : "./images/navigation/board-inactive.svg"
              }
              alt="board image"
              width={20}
              height={20}
            />
            <p
              className={`font-plus-jakarta-sans font-bold text-[15px] leading-[19px]
                ${elem.id === activeBoardId ? "text-white" : "text-[#828FA3]"}`}
            >
              {elem.name}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
