"use client";
import Image from "next/image";
import { useContext } from "react";
import { GlobalContext } from "@/app/context/GlobalContext";

export default function ModeToggle() {
  const context = useContext(GlobalContext);
  if (!context) return <p>Loading...</p>;

  const { setDarkMode, darkMode } = context;

  const handleToggle = () => {
    setDarkMode(!darkMode); // toggle global state
  };

  return (
    <div
      className={`w-[235px] h-[48px] left-[13px] rounded-md flex items-center justify-around ${
        darkMode ? "bg-[#20212C]" : "bg-[#F4F7FD]"
      }`}
    >
      <div className="flex justify-between w-[120px]">
        <Image
          src="./images/navigation/light.svg"
          alt="light"
          width={18}
          height={18}
        />
        <button
          onClick={handleToggle}
          className="relative w-10 h-5 rounded-full transition-colors duration-300 
                     bg-[#635FC7] cursor-pointer"
        >
          <span
            className={`absolute top-[3px] left-[3px] w-[14px] h-[14px] rounded-full bg-white 
                        transition-transform duration-300 ${
                          darkMode ? "translate-x-[20px]" : "translate-x-0"
                        }`}
          />
        </button>
        <Image
          src="./images/navigation/dark.svg"
          alt="dark"
          width={18}
          height={18}
        />
      </div>
    </div>
  );
}
