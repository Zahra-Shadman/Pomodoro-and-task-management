import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: number;
  task: string;
  subject: string;
  isDone: boolean;
}

interface TaskState {
  tasks: Task[];
}

const loadTasksFromLocalStorage = (): Task[] => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
};

const initialState: TaskState = {
  tasks: loadTasksFromLocalStorage(),
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<{ task: string; subject: string }>
    ) => {
      state.tasks.push({
        id: Date.now(),
        task: action.payload.task,
        subject: action.payload.subject,
        isDone: false,
      });
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    doneTask: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.isDone = true;
      }
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
  },
});

export const { addTask, deleteTask, doneTask } = taskSlice.actions;
export default taskSlice.reducer;
