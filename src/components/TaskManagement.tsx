import React, { useState } from "react";
import { RootState } from "./store";
import { addTask, deleteTask, doneTask } from "./taskSlice";
import { useDispatch, useSelector } from "react-redux";

export const TaskManagement: React.FC = () => {
  const [taskInput, setTaskInput] = useState<string>("");
  const [subjectInput, setSubjectInput] = useState<string>("");
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const handleAddTask = () => {
    if (taskInput.trim() === "" || subjectInput.trim() === "") return;
    dispatch(addTask({ task: taskInput, subject: subjectInput }));
    setTaskInput("");
    setSubjectInput("");
  };

  const handleDeleteTask = (id: number) => {
    dispatch(deleteTask(id));
  };

  const handleDoneTask = (id: number) => {
    dispatch(doneTask(id));
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-8 w-full max-w-md">
      <input
        type="text"
        placeholder="ENTER A TASK"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        className="w-80 px-4 py-2 rounded-md bg-gray-300 text-black  placeholder-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900"
      />
      <div className="flex w-80 space-x-2">
        <input
          type="text"
          placeholder="SUBJECT"
          value={subjectInput}
          onChange={(e) => setSubjectInput(e.target.value)}
          className="flex-1 px-4 py-2 rounded-md bg-gray-300 text-black  placeholder-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900"
        />
        <button
          onClick={handleAddTask}
          className="bg-white text-gray-800 px-4 py-2 rounded-md font-semibold hover:bg-gray-200"
        >
          Add Task
        </button>
      </div>

      {tasks.length > 0 && (
        <div className="w-80 mt-4">
          <h3 className=" text-lg font-semibold mb-2">Tasks</h3>
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center p-2 bg-gray-300 rounded-md "
              >
                <div className="flex items-center space-x-2 text-black">
                
                  <p
                    className={`text-sm ${
                      task.isDone ? "text-gray-900" : ""
                    }`}
                  >
                    {task.subject}
                  </p>
                  {task.isDone && (
                    <span className="text-green-500 font-bold">✔</span>
                  )}
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleDoneTask(task.id)}
                    className="text-green-400 hover:text-green-500"
                  >
                    Done
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-red-400 hover:text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
