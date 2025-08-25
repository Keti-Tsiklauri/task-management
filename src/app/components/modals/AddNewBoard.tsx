import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "@/app/context/GlobalContext";

type AddNewTaskProps = {
  onClose: () => void;
};

export default function AddNewBoard({ onClose }: AddNewTaskProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [boardName, setBoardName] = useState("");

  // Close modal if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const context = useContext(GlobalContext);
  if (!context) return <p>Loading...</p>;

  const { darkMode, boards, setBoards } = context;

  const handleCreateBoard = () => {
    if (!boardName.trim()) return;

    const newBoard = {
      id: Date.now(),
      name: boardName.trim(),
      columns: [],
      title: boardName.trim(), // add if your Board type requires
      description: "",
    };

    setBoards([...boards, newBoard]); // ✅ add to global state
    onClose(); // ✅ close modal
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div
        ref={modalRef}
        className={`w-full max-w-[480px] min-w-[280px] sm:min-w-[343px] max-h-[90vh] overflow-auto rounded-md p-6 flex flex-col gap-6 
        ${darkMode ? "bg-[#2B2C37]" : "bg-white"}`}
      >
        {/* Title */}
        <p
          className={`font-['Plus_Jakarta_Sans'] font-bold text-[18px] leading-[23px] 
          ${darkMode ? "text-white" : "text-[#000112]"}`}
        >
          Add New Board
        </p>

        {/* Input Group */}
        <div className="w-full flex flex-col gap-2">
          <label className="font-['Plus_Jakarta_Sans'] font-bold text-[12px] leading-[15px] text-[#828FA3]">
            Board Name
          </label>
          <input
            type="text"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            placeholder="e.g. Web Design"
            className={`w-full h-[40px] rounded-[4px] border px-3 
            font-['Plus_Jakarta_Sans'] font-medium text-[13px] leading-[23px] 
            focus:outline-none focus:ring-2 focus:ring-[#635FC7] 
            ${
              darkMode
                ? "bg-[#2B2C37] text-white border-[rgba(130,143,163,0.25)] placeholder:text-white/40"
                : "bg-white text-[#000112] border-[rgba(130,143,163,0.25)] placeholder:text-[#000112]/25"
            }`}
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleCreateBoard}
          className="w-full h-10 bg-[#635FC7] rounded-[20px] flex items-center justify-center hover:bg-[#514ecf] transition"
        >
          <span className="font-['Plus_Jakarta_Sans'] font-bold text-[13px] leading-[23px] text-white">
            Create New Board
          </span>
        </button>
      </div>
    </div>
  );
}
