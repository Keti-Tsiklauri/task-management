"use client";
import Navigation from "./Navigation";
import Logo from "./Logo";
import AddButton from "./AddButton";
import ModeToggle from "./ModeToggle";
import { useContext } from "react";
import { GlobalContext } from "@/app/context/GlobalContext";
export default function DesktopNavigation() {
  const context = useContext(GlobalContext);

  if (!context) return <p>Loading...</p>;

  const { darkMode } = context;
  return (
    <div
      className={`absolute top-0 left-0 flex flex-col w-[260px] h-screen  ${
        darkMode ? "bg-[#2B2C37]" : "bg-[white]"
      }`}
    >
      <Logo />
      <div className="mt-10">
        <Navigation />
      </div>
      <AddButton />
      <div className="mt-auto">
        <ModeToggle />
      </div>
    </div>
  );
}
