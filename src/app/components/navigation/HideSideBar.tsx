"use client";
import { useContext } from "react";
import { GlobalContext } from "@/app/context/GlobalContext";
import Image from "next/image";

export default function HideSideBar() {
  const context = useContext(GlobalContext);

  if (!context) return <p>Loading...</p>;

  const { hide, setHide } = context;

  return (
    <div className="w-[240px]">
      {hide ? (
        <div className="   w-[56px] h-[48px] bg-[#635FC7] rounded-r-[100px] flex items-center justify-center">
          <Image
            src="/images/navigation/show.svg"
            alt="show"
            width={18}
            height={16}
            className="cursor-pointer"
            onClick={() => setHide(false)} // 👈 change here
          />
        </div>
      ) : (
        <div className="w-[120px]  h-[48px] flex items-center justify-center cursor-pointer">
          <Image
            src="/images/navigation/hide.svg"
            alt="hide"
            width={18}
            height={16}
            className="cursor-pointer"
            onClick={() => setHide(true)}
          />
          <p className="font-['Plus_Jakarta_Sans'] font-bold text-[15px] leading-[19px] text-[#828FA3]">
            Hide Sidebar
          </p>
        </div>
      )}
    </div>
  );
}
