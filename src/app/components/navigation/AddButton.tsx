"use client";
import Image from "next/image";
import { useContext } from "react";
import { GlobalContext } from "@/app/context/GlobalContext";
export default function AddButton() {
  const context = useContext(GlobalContext);
  if (!context) return <p>Loading...</p>;

  const { darkMode } = context;
  return (
    <div className="flex w-[240px] gap-3 ml-[24px] mt-4">
      <Image
        src={
          darkMode
            ? "/images/navigation/board-active.svg"
            : "/images/navigation/board-inactive.svg"
        }
        alt="board image"
        width={20}
        height={20}
      />
      <p className=" h-[19px] font-plus-jakarta-sans font-bold text-[15px] leading-[19px] text-[#635FC7] cursor-pointer">
        + Create New Board
      </p>
    </div>
  );
}
