"use client";

import { useContext } from "react";
import { GlobalContext } from "@/app/context/GlobalContext";
import TaskModal from "../modals/TaskModal";

const columnColors = ["#49C4E5", "#8471F2", "#67E2AE"];
const columnNames = ["Todo", "Doing", "Done"]; // always show these columns

export default function MainPage() {
  const context = useContext(GlobalContext);

  if (!context) return <p>Loading...</p>;

  const { boards, selectedOption, darkMode, selectedTask, setSelectedTask } =
    context;

  const selectedBoard = boards.find((board) => board.name === selectedOption);

  return (
    <div>
      {/* Board Columns */}
      <div
        className={`flex flex-col md:gap-6 md:p-6 mx-auto md:mt-[97px] ${
          darkMode ? "bg-[#000112]" : "bg-[#F4F7FD]"
        } min-h-screen max-w-5xl w-full`}
      >
        {selectedBoard ? (
          columnNames.map((colName, colIndex) => {
            // find the column in the board or use empty tasks
            const column = selectedBoard.columns.find(
              (c) => c.name === colName
            ) || {
              name: colName,
              tasks: [],
            };

            return (
              <div
                key={colIndex}
                className="w-72 shrink-0 relative mx-auto mt-6"
              >
                {/* Column Circle */}
                <div className="flex items-center mb-4">
                  <div
                    className="absolute w-4 h-4 rounded-full"
                    style={{
                      backgroundColor:
                        columnColors[colIndex % columnColors.length],
                    }}
                  ></div>

                  {/* Column Header */}
                  <h2
                    className={`uppercase text-gray-500 font-bold tracking-wide ml-6`}
                  >
                    {column.name} ({column.tasks.length})
                  </h2>
                </div>

                {/* Tasks */}
                <div className="flex flex-col gap-4">
                  {column.tasks.map((task, taskIndex) => (
                    <div
                      key={taskIndex}
                      className={`p-4 rounded-lg shadow border cursor-pointer ${
                        darkMode ? "bg-[#2B2C37]" : "bg-[white]"
                      }`}
                      onClick={() => setSelectedTask(task)}
                    >
                      <h3
                        className={`font-semibold ${
                          darkMode ? "text-white" : "text-[#000112]"
                        }`}
                      >
                        {task.title}
                      </h3>

                      <p className="text-xs text-gray-400 mt-2">
                        {task.subtasks.filter((s) => s.isCompleted).length} of{" "}
                        {task.subtasks.length} subtasks
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 p-6">
            No board found for {selectedOption}
          </p>
        )}
      </div>
      {selectedTask && <TaskModal />}
    </div>
  );
}
