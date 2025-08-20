"use client";
import Navigation from "./Navigation";
import AddButton from "./AddButton";
import ModeToggle from "./ModeToggle";
import { useContext } from "react";
import { GlobalContext } from "@/app/context/GlobalContext";

export default function DesktopNavigation() {
  const context = useContext(GlobalContext);

  if (!context) return <p>Loading...</p>;

  const { darkMode, hide } = context;

  return (
    <div className="relative w-[260px] h-[calc(100vh-97px)] flex flex-col justify-between">
      {/* Sidebar container */}
      <div
        className={`flex flex-col flex-1 w-full transition-all duration-300 ${
          darkMode ? "bg-[#2B2C37]" : "bg-white"
        } ${hide ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <div className="mt-7">
          <Navigation />
        </div>

        <div className="pl-4 mt-4">
          <AddButton />
        </div>

        <div className="pl-4 mt-auto flex flex-col gap-4 pb-15">
          <ModeToggle />
        </div>
      </div>

      {/* Always visible toggle button */}
    </div>
  );
}
