"use client";
import { createContext, useEffect, ReactNode } from "react";
import { Board, Task } from "../types/types";
import { useLocalStorage } from "../components/hooks/useLocalStorage";

type GlobalContextType = {
  boards: Board[];
  setBoards: React.Dispatch<React.SetStateAction<Board[]>>;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  hide: boolean;
  setHide: React.Dispatch<React.SetStateAction<boolean>>;
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  selectedTask: Task | null;
  setSelectedTask: React.Dispatch<React.SetStateAction<Task | null>>;
};

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [boards, setBoards] = useLocalStorage<Board[]>("boards", []);
  const [darkMode, setDarkMode] = useLocalStorage<boolean>("darkMode", false);
  const [hide, setHide] = useLocalStorage<boolean>("hide", false);
  const [selectedOption, setSelectedOption] = useLocalStorage<string>(
    "selectedOption",
    "Platform Launch"
  );
  const [selectedTask, setSelectedTask] = useLocalStorage<Task | null>(
    "selectedTask",
    null
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (boards.length === 0) {
          // prevent overwriting existing boards
          const res = await fetch("/data.json");
          const data = await res.json();
          setBoards(data.boards);
        }
      } catch (err) {
        console.error("Error fetching data.json:", err);
      }
    };

    fetchData();
  }, []); // ✅ only run once

  console.log("swhbhjbhjbjhbhjb", boards);
  return (
    <GlobalContext.Provider
      value={{
        boards,
        setBoards,
        darkMode,
        setDarkMode,
        hide,
        setHide,
        selectedOption,
        setSelectedOption,
        selectedTask,
        setSelectedTask,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
