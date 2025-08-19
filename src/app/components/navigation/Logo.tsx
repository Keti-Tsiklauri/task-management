"use client";
import { GlobalContext } from "@/app/context/GlobalContext";
import Image from "next/image";
import { useContext } from "react";

export default function Logo() {
  const context = useContext(GlobalContext);
  if (!context) return <p>Loading...</p>;

  const { darkMode } = context;

  return (
    <div className="pl-4 pt-5">
      <Image
        src={
          darkMode
            ? "./images/navigation/logo-dark.svg"
            : "./images/navigation/logo-light.svg"
        }
        alt="logo"
        width={200}
        height={20}
      />
    </div>
  );
}
