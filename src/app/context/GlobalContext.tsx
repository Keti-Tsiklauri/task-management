"use client";
import { createContext, useState, useEffect, ReactNode } from "react";
import { Board } from "../types/types";

type GlobalContextType = {
  boards: Board[];
  setBoards: React.Dispatch<React.SetStateAction<Board[]>>;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  hide: boolean;
  setHide: React.Dispatch<React.SetStateAction<boolean>>;
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
};

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [hide, setHide] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Platform Launch");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`./data.json`);
        const data = await res.json();
        setBoards(data.boards);
      } catch (err) {
        console.error("Error fetching data.json:", err);
      }
    };

    fetchData();
  }, []);

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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
