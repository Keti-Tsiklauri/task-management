"use client";
import { GlobalContext } from "@/app/context/GlobalContext";
import { useContext, useState, useRef, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";

type AddNewTaskProps = {
  onClose: () => void;
};

export default function AddNewTask({ onClose }: AddNewTaskProps) {
  const { darkMode, boards, setBoards } = useContext(GlobalContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [subtasks, setSubtasks] = useState<string[]>(["", ""]);

  const modalRef = useRef<HTMLDivElement>(null);

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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleChange = (index: number, value: string) => {
    const updated = [...subtasks];
    updated[index] = value;
    setSubtasks(updated);
  };

  const handleRemove = (index: number) => {
    setSubtasks(subtasks.filter((_, i) => i !== index));
  };

  const handleAdd = () => {
    setSubtasks([...subtasks, ""]);
  };

  const handleCreate = () => {
    if (!title.trim()) return; // Do nothing if title is empty

    const newTask = {
      title,
      description,
      status,
      subtasks: subtasks.filter((s) => s.trim() !== ""),
    };

    // Example: add to first board
    const updatedBoards = boards.map((board, i) => {
      if (i === 0) return { ...board, tasks: [...board.tasks, newTask] };
      return board;
    });

    setBoards(updatedBoards);
    onClose(); // close modal after adding
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div
        ref={modalRef}
        className={`w-[480px] max-h-[90vh] overflow-auto bg-white dark:bg-[#2B2C37] rounded-md p-6 flex flex-col gap-6`}
      >
        {/* Title */}
        <p className={`text-black dark:text-white font-bold text-[18px]`}>
          Add New Task
        </p>

        {/* Title Input */}
        <div className="w-full flex flex-col gap-2">
          <label className="text-[#828FA3] dark:text-white font-bold text-[12px]">
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Take coffee break"
            className="w-full h-[40px] border border-[rgba(130,143,163,0.25)] rounded-[4px] px-3 text-[13px] leading-[23px] font-medium bg-white dark:bg-[#2B2C37] text-black dark:text-white placeholder:text-[#000112]/25 dark:placeholder:text-white/25"
          />
        </div>

        {/* Description */}
        <div className="w-full flex flex-col gap-2">
          <label className="text-[#828FA3] dark:text-white font-bold text-[12px]">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. It’s always good to take a break..."
            className="w-full min-h-[100px] border border-[rgba(130,143,163,0.25)] rounded-[4px] px-3 py-2 text-[13px] leading-[23px] font-medium bg-white dark:bg-[#2B2C37] text-black dark:text-white placeholder:text-[#000112]/25 dark:placeholder:text-white/25 resize-none"
          />
        </div>

        {/* Subtasks */}
        <div className="w-full flex flex-col gap-3">
          <label className="text-[#828FA3] dark:text-white font-bold text-[12px]">
            Subtasks
          </label>
          {subtasks.map((subtask, index) => (
            <div
              key={index}
              className="flex items-center gap-2 w-full h-[40px] border border-[rgba(130,143,163,0.25)] rounded-[4px] px-3 bg-white dark:bg-[#2B2C37]"
            >
              <input
                type="text"
                value={subtask}
                onChange={(e) => handleChange(index, e.target.value)}
                placeholder="e.g. Make coffee"
                className="flex-1 bg-transparent outline-none text-[13px] leading-[23px] text-black dark:text-white placeholder:text-[#000112]/25 dark:placeholder:text-white/25"
              />
              <button
                onClick={() => handleRemove(index)}
                className="text-[#828FA3] hover:text-red-500"
              >
                <X size={16} />
              </button>
            </div>
          ))}
          <button
            onClick={handleAdd}
            className="w-full h-[40px] rounded-md bg-[#635FC71A] text-[#635FC7] font-bold text-[13px] leading-[23px] hover:bg-[#635FC733]"
          >
            + Add New Subtask
          </button>
        </div>

        {/* Status */}
        <div className="w-full flex flex-col gap-2 relative">
          <label className="text-[#828FA3] dark:text-white font-bold text-[12px]">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full h-[40px] px-3 rounded-[4px] border border-[#828FA3] dark:border-[rgba(130,143,163,0.25)] bg-white dark:bg-[#2B2C37] text-black dark:text-white font-medium text-[13px] leading-[23px] appearance-none pr-8"
          >
            <option value="todo">Todo</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#635FC7]"
            size={16}
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleCreate}
          className="w-full h-[40px] bg-[#635FC7] rounded-[20px] flex items-center justify-center text-white text-[13px] font-bold hover:bg-[#6f6bda]"
        >
          Create Task
        </button>
      </div>
    </div>
  );
}
