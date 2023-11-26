import { useEffect } from "react";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdMenu } from "react-icons/io";
import { GiTomato } from "react-icons/gi";
import useTodoStore from "../todoStore";
import NavBar from "../components/NavBar";

const Timer = () => {
  const [time, setTime] = useState(10800);
  const [initialtime, setInitialTime] = useState(10800);
  const [isActive, setIsActive] = useState(false);
  const { tasks } = useTodoStore();

  console.log(tasks);

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  const incompletedTasks = tasks.filter((task) => !task.completed);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const endTimer = () => {
    setIsActive(false);
    setTime(initialtime);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    console.log(minutes);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };
  return (
    <div className="flex h-screen timer">
      <NavBar />
      <div className="px-4 border-2 border-gray-100 time basis-3/5">
        <header className="flex justify-between mb-10">
          <h1>Focus</h1>
          <p>Pomo</p>
          <div className="icons">
            <AiOutlinePlus />
            <IoMdMenu />
          </div>
        </header>

        <select
          name="select-task"
          id="select-task"
          className="block mx-auto mb-10"
        >
          {incompletedTasks.map((task) => (
            <option value={task.title} key={task.id}>
              {task.title}
            </option>
          ))}
        </select>

        <div className="w-64 h-64 mx-auto clock rounded-[50%] flex justify-center items-center border-4 border-gray-300 mb-10">
          <span className="text-3xl font-semibold">{formatTime(time)}</span>
        </div>

        <button
          className="block py-2 mx-auto mb-4 text-white bg-blue-500 px-14 rounded-3xl"
          onClick={toggleTimer}
        >
          {isActive ? "Pause" : "Start"}
        </button>

        {!isActive && initialtime !== time && (
          <button
            className="block py-2 mx-auto text-black border-2 border-blue-500 px-14 rounded-3xl"
            onClick={endTimer}
          >
            End
          </button>
        )}
      </div>
      <div className="px-4 py-4 timeline basis-2/5">
        <h1 className="mb-4">Overview</h1>
        <div className="flex flex-wrap gap-2 progress">
          <p className="flex flex-col px-3 py-2 bg-gray-50 today-pomo basis-[49%]">
            <span className="text-xs text-gray-400">{"Today's"} Pomo</span>
            <span className="text-2xl font-semibold">0</span>
          </p>
          <p className="flex flex-col px-3 py-2 bg-gray-50 today-pomo basis-[49%]">
            <span className="text-xs text-gray-400">{"Today's"} Focus</span>
            <span className="text-2xl font-semibold">
              0<span className="text-sm">m</span>
            </span>
          </p>
          <p className="flex flex-col px-3 py-2 bg-gray-50 today-pomo basis-[49%]">
            <span className="text-xs text-gray-400">Total Pomo</span>
            <span className="text-2xl font-semibold">66</span>
          </p>
          <p className="flex flex-col px-3 py-2 bg-gray-50 today-pomo basis-[49%]">
            <span className="text-xs text-gray-400">Total Focus Duration</span>
            <span className="text-2xl font-semibold">
              75<span className="text-xs">h</span>25
              <span className="text-xs">m</span>
            </span>
          </p>
        </div>

        <div className="mt-12 focus-record">
          <h1 className="mb-10">Focus Record</h1>
          <div className="records">
            <div className="record">
              <p className="mb-4">Jul 9</p>
              <div className="relative after:w-[2px] after:h-8 after:bg-blue-200 after:block after:absolute after:left-[7px] after:top-5 before:w-[10px] before:h-[10px] before:bg-white before:block before:rounded-full before:absolute before:top-6 before:left-[3px] before:z-10 before:border-[2px] border-blue-500 flex items-start gap-4">
                <GiTomato className="text-blue-400" />
                <div>
                  <p className="text-xs text-gray-400">11:16 - 11:54</p>
                  <p className="text-sm text-gray-800">
                    Inbound Marketing Course Completion
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
