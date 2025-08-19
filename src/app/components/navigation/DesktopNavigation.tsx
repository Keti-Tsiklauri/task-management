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
      {/* Sidebar */}
      <div
        className={`absolute top-0 left-0 flex flex-col w-[260px] h-full transition-transform duration-300 ${
          darkMode ? "bg-[#2B2C37]" : "bg-white"
        } ${hide ? "-translate-x-full" : "translate-x-0"}`}
      >
        {/* All elements except Navigation have padding-left */}
        <div className="pl-4 pt-4">
          <Logo />
        </div>

        {/* Navigation without padding */}
        <div className="mt-10">
          <Navigation />
        </div>

        <div className="pl-4 mt-4">
          <AddButton />
        </div>

        <div className="pl-4 mt-auto flex flex-col gap-4">
          <ModeToggle />
          <HideSideBar />
        </div>
      </div>

      {/* Hide/Show button when sidebar is hidden */}
      {hide && (
        <div className="fixed bottom-4 left-0 z-50">
          <HideSideBar />
        </div>
      )}
    </div>
  );
}
