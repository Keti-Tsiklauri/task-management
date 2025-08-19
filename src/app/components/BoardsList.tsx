"use client";

import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function BoardsList() {
  const boards = useContext(GlobalContext);
  console.log(boards);
  console.log(1);
  return (
    <div>
      <h1>Boards</h1>
    </div>
  );
}
