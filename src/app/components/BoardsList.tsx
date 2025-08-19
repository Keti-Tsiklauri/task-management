"use client";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function BoardsList() {
  const global = useContext(GlobalContext);

  if (!global) return <p>Loading...</p>;

  const { boards } = global;
  console.log(boards);
  console.log(1);
  return (
    <div>
      <h1>Boards</h1>
      {boards.map((board, i) => (
        <div key={i}>
          {board.columns.map((col, j) => (
            <div key={j}>
              <h3>{col.name}</h3>
              <ul>
                {col.tasks.map((task, k) => (
                  <li key={k}>{task.title}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
