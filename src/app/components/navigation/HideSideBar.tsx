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
        <div className="w-[56px] h-[48px] bg-[#635FC7] rounded-r-[100px] flex items-center justify-center">
          {/* only image is clickable */}
          <Image
            src="./images/navigation/show.svg"
            alt="show"
            width={20}
            height={20}
            onClick={() => setHide(false)}
            className="cursor-pointer  block"
          />
        </div>
      ) : (
        <div className="w-[120px] h-[48px] flex items-center justify-center  ml-2 gap-2">
          {/* only image is clickable */}
          <Image
            src="./images/navigation/hide.svg"
            alt="hide"
            width={18}
            height={16}
            onClick={() => setHide(true)}
            className="cursor-pointer"
          />
          <p className="font-['Plus_Jakarta_Sans'] font-bold text-[15px] leading-[19px] text-[#828FA3]">
            Hide Sidebar
          </p>
        </div>
      )}
    </div>
  );
}
