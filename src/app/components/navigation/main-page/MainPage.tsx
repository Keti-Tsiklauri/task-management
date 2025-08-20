"use client";

import { useContext } from "react";
import { GlobalContext } from "@/app/context/GlobalContext";

const columnColors = ["#49C4E5", "#8471F2", "#67E2AE"];

export default function MainPage() {
  const context = useContext(GlobalContext);

  if (!context) return <p>Loading...</p>;

  const { boards, selectedOption } = context;

  const selectedBoard = boards.find((board) => board.name === selectedOption);

  return (
    <div>
      {/* Board Columns */}
      <div className="flex gap-6 p-6 mx-auto mt-[97px]">
        {selectedBoard ? (
          selectedBoard.columns.map((column, colIndex) => (
            <div key={colIndex} className="w-72 shrink-0 relative">
              {/* Column Circle */}
              <div className="flex items-center mb-4">
                <div
                  className="absolute  w-4 h-4 rounded-full"
                  style={{
                    backgroundColor:
                      columnColors[colIndex % columnColors.length],
                  }}
                ></div>

                {/* Column Header */}
                <h2 className="uppercase text-gray-500 font-bold tracking-wide  ml-6">
                  {column.name} ({column.tasks.length})
                </h2>
              </div>
              {/* Tasks */}
              <div className="flex flex-col gap-4">
                {column.tasks.map((task, taskIndex) => (
                  <div
                    key={taskIndex}
                    className="p-4 rounded-lg shadow bg-white border"
                  >
                    <h3 className="font-semibold">{task.title}</h3>
                    {task.description && (
                      <p className="text-sm text-gray-500">
                        {task.description}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 mt-2">
                      {task.subtasks.filter((s) => s.isCompleted).length} of{" "}
                      {task.subtasks.length} subtasks
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 p-6">
            No board found for {selectedOption}
          </p>
        )}
      </div>
    </div>
  );
}
