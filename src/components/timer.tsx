import React, { useEffect, useState } from "react";
import { formatDate } from "./dateFetcher";
import { TaskManagement } from "./TaskManagement";

const CountdownTimer: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(1500);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (isRunning && seconds > 0) {
      const interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setMessage("your time is over!");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning, seconds]);

  useEffect(() => {
    if (message) {
      document.title = "your time is over";
    } else {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      document.title = `${minutes
        .toString()
        .padStart(2, "0")}:${remainingSeconds
        .toString()
        .padStart(2, "0")} left`;
    }
  }, [seconds, message]);

  const handleToggle = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setSeconds(1500);
    setIsRunning(false);
    setMessage("");
  };

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('/Free Vector _ Gradient minimalist background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-9xl text-white font-bold tracking-wider">
        {minutes.toString().padStart(2, "0")}:
        {remainingSeconds.toString().padStart(2, "0")}
      </h1>

      {message && <p className="text-2xl text-white mt-4">{message}</p>}

      <div className="flex space-x-4 mt-4">
        <button
          onClick={handleToggle}
          className={`text-gray-300 px-8 py-3 mt-3 rounded-md ${
            isRunning
              ? "bg-red-600 hover:bg-red-600"
              : "bg-green-800 hover:bg-green-800"
          }`}
        >
          {isRunning ? "stop" : "start"}
        </button>
        <button
          onClick={resetTimer}
          className="bg-blue-500 text-white px-8 py-3 mt-3 rounded-md  hover:bg-blue-600"
        >
          repeat
        </button>
      </div>

      <div>
        <p className="text-white/80 text-lg mt-4">{formatDate()}</p>
      </div>
      <TaskManagement />
    </div>
  );
};

export default CountdownTimer;
