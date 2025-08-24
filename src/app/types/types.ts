export type Subtask = {
  title: string;
  isCompleted: boolean;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
};

export type Column = {
  name: string;
  tasks: Task[];
};

export type Board = {
  name: string;
  columns: Column[];
  title: string;
  description: string;
  id: number;
};
