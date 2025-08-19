import Image from "next/image";

export default function AddButton() {
  return (
    <div className="flex w-[240px] gap-3 mt-5 ">
      <Image
        src="./images/navigation/board-inactive.svg"
        alt="board image"
        width={20}
        height={20}
      />
      <p className=" h-[19px] font-plus-jakarta-sans font-bold text-[15px] leading-[19px] text-[#635FC7] cursor-pointer">
        + Create New Board
      </p>
    </div>
  );
}
