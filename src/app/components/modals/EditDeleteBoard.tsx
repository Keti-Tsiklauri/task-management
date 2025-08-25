import { useContext } from "react";
import { GlobalContext } from "@/app/context/GlobalContext";

export default function EditDeleteBoard() {
  const context = useContext(GlobalContext);

  if (!context) return <p>Loading...</p>;

  const { darkMode } = context;

  return (
    <div
      className={`flex flex-col w-[200px] rounded-lg shadow-[0px_10px_20px_rgba(54,78,126,0.25)] p-4
        ${darkMode ? "bg-[#2B2C37]" : "bg-white"}`}
    >
      <p
        className="font-plus-jakarta-sans font-medium text-[13px] leading-[23px] 
          text-[#828FA3] cursor-pointer hover:text-[#635FC7] transition-colors"
      >
        Edit Board
      </p>
      <p
        className="font-plus-jakarta-sans font-medium text-[13px] leading-[23px] 
          text-[#EA5555] cursor-pointer hover:text-red-400 transition-colors"
      >
        Delete Board
      </p>
    </div>
  );
}
