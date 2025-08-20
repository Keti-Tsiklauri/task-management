"use client";
import Navigation from "./Navigation";
import Logo from "./Logo";
import AddButton from "./AddButton";
import ModeToggle from "./ModeToggle";
import { useContext } from "react";
import { GlobalContext } from "@/app/context/GlobalContext";
import HideSideBar from "./HideSideBar";

export default function DesktopNavigation() {
  const context = useContext(GlobalContext);

  if (!context) return <p>Loading...</p>;

  const { darkMode, hide } = context;

  return (
    <div className="relative w-[260px] h-screen">
      {/* Sidebar container keeps fixed width */}
      <div
        className={`flex flex-col w-full h-full transition-all duration-300 ${
          darkMode ? "bg-[#2B2C37]" : "bg-white"
        } ${hide ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <div className="pl-4 pt-4">
          <Logo />
        </div>

        <div className="mt-10">
          <Navigation />
        </div>

        <div className="pl-4 mt-4">
          <AddButton />
        </div>

        <div className="pl-4 mt-auto flex flex-col gap-4 mb-14">
          <ModeToggle />
        </div>
      </div>

      {/* Make HideSideBar fixed at the bottom of sidebar */}
      <div className="absolute bottom-1">
        <HideSideBar />
      </div>
    </div>
  );
}
