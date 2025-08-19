"use client";
import { createContext, useState, useEffect, ReactNode } from "react";
import { Board } from "../types/types";

type GlobalContextType = {
  boards: Board[];
  setBoards: React.Dispatch<React.SetStateAction<Board[]>>;
};

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/data.json"); // must be inside /public
        const data = await res.json();
        setBoards(data.boards);
      } catch (err) {
        console.error("Error fetching data.json:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <GlobalContext.Provider value={{ boards, setBoards }}>
      {children}
    </GlobalContext.Provider>
  );
};
