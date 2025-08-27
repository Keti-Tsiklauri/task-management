"use client";
import { createContext, useEffect, ReactNode, useState } from "react";
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
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  openNewBoard: boolean;
  setOpenNewBoard: React.Dispatch<React.SetStateAction<boolean>>;

  activeBoardId: number;
  setActiveBoardId: React.Dispatch<React.SetStateAction<number>>;
  showAddBoardModal: boolean;
  setShowAddBoardModal: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [isOpen, setIsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openNewBoard, setOpenNewBoard] = useState(false);
  const [selectedTask, setSelectedTask] = useLocalStorage<Task | null>(
    "selectedTask",
    null
  );

  // ✅ New states
  const [activeBoardId, setActiveBoardId] = useState<number>(0);
  const [showAddBoardModal, setShowAddBoardModal] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        if (boards.length === 0) {
          const res = await fetch("./data.json");
          const data = await res.json();
          setBoards(data.boards);
        }
      } catch (err) {
        console.error("Error fetching data.json:", err);
      }
    })();
  }, [boards.length, setBoards]);

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
        isOpen,
        setIsOpen,
        openModal,
        setOpenModal,
        openNewBoard,
        setOpenNewBoard,
        activeBoardId,
        setActiveBoardId,
        showAddBoardModal,
        setShowAddBoardModal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
