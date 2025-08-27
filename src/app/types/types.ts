export type Subtask = {
  id: number;
  title: string;
  isCompleted: boolean;
};

export type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
};

export type Column = {
  id: number;
  name: string;
  tasks: Task[];
};

export type Board = {
  id: number; // number now
  name: string;
  columns: Column[];
};
export type DeleteBoardModalProps = {
  boardId: number | null; // if sometimes null
  onClose: () => void;
};

export type EditBoardModalProps = {
  boardId: number | null; // if sometimes null
  onClose: () => void;
};
