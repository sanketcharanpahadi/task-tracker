import { VscAccount } from "react-icons/vsc";
import { RiTaskFill } from "react-icons/ri";
import { FaCalendar } from "react-icons/fa";
import { RiFocus2Fill } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { LuTimer } from "react-icons/lu";
import { MdOutlineManageSearch } from "react-icons/md";
import { useState } from "react";
import useTodoStore from "../todoStore";
import useAuthStore from "../store";
import { useEffect } from "react";
const Tasks = () => {
  const [task, setTask] = useState("");
  const [id, setId] = useState("");
  const { addTasks, initialiseTasks, tasks, updateTask } = useTodoStore();

  const { token } = useAuthStore();

  useEffect(() => {
    initialiseTasks(token);
  }, [initialiseTasks, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("mera", token);
      await addTasks(task, false, token);
      setTask("");
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateTasksHandler = async (e) => {
    e.preventDefault();
    console.log(id, { title: task }, token);
    await updateTask(id, { title: task }, token);
  };

  const todaysTasks = tasks.filter((task) => {
    const taskDate = new Date(task.dueDate);
    const today = new Date();
    return taskDate.getDate() === today.getDate() && !task.completed;
  });

  const overdueTasks = tasks.filter((task) => {
    const taskDate = new Date(task.dueDate);
    const today = new Date();
    return taskDate.getDate() < today.getDate() && !task.completed;
  });

  return (
    <div className="flex">
      <nav className="basis-[6%] flex flex-col gap-3 bg-gray-50 h-screen pt-10">
        <div className="text-3xl flex items-center justify-center">
          <VscAccount className="text-gray-400 cursor-pointer" />
        </div>
        <div className="text-3xl flex items-center justify-center">
          <RiTaskFill className="text-blue-500 cursor-pointer" />
        </div>
        <div className="text-3xl flex items-center justify-center">
          <FaCalendar className="text-gray-400 cursor-pointer" />
        </div>
        <div className="text-3xl flex items-center justify-center">
          <RiFocus2Fill className="text-gray-400 cursor-pointer" />
        </div>
        <div className="text-3xl flex items-center justify-center">
          <CiSearch className="text-gray-400 cursor-pointer" />
        </div>
        <div className="text-3xl flex items-center justify-center">
          <LuTimer className="text-gray-400 cursor-pointer" />
        </div>
      </nav>

      <section className="tasks basis-4/6 px-6 py-4">
        <h2 className="text-black font-semibold text-3xl mb-6">Create Task</h2>
        <form className="max-w-md mb-10" onSubmit={handleSubmit}>
          <input
            type="text"
            name="task"
            id="task"
            placeholder='+ Add task to "Inbox", press Enter to save.'
            className="block w-full py-2 px-2 bg-gray-50"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </form>

        <h2 className="text-xl mb-3">Overdue</h2>
        <form
          className="max-w-md mb-10 flex gap-3 flex-col"
          onSubmit={updateTasksHandler}
        >
          {overdueTasks.map((overduetask) => {
            return (
              <div className="flex gap-4" key={`overdue-${overduetask._id}`}>
                <input
                  type="checkbox"
                  name={`overdue-checkbox-${overduetask._id}`}
                  id={`overdue-checkbox-${overduetask._id}`}
                  onChange={(e) => {
                    if (e.target.checked) {
                      updateTask(overduetask._id, { completed: true }, token);
                    }
                  }}
                />
                <input
                  type="text"
                  name={`overdue-task-${overduetask._id}`}
                  id={`overdue-task-${overduetask._id}`}
                  value={
                    task.length != 0 && id === overduetask._id.toString()
                      ? task
                      : overduetask.title
                  }
                  className="hover:bg-gray-50  w-full py-2 px-2"
                  onChange={(e) => {
                    setTask(e.target.value);
                  }}
                  onFocus={(e) => {
                    setTask(e.target.value);
                    setId(overduetask._id.toString());
                  }}
                  onBlur={(e) => {
                    setTask("");
                    setId("");
                  }}
                />
              </div>
            );
          })}
          <button type="submit"></button>
        </form>

        <h2 className="text-xl mb-3">Today</h2>
        <form
          className="max-w-md mb-10 flex gap-3 flex-col"
          onSubmit={updateTasksHandler}
        >
          {todaysTasks.map((today_task) => {
            return (
              <div className="flex" key={`today-${today_task._id}`}>
                <input
                  type="checkbox"
                  name={`task-${today_task._id}`}
                  id={`task-${today_task._id}`}
                  onChange={(e) => {
                    if (e.target.checked) {
                      updateTask(today_task._id, { completed: true }, token);
                    }
                  }}
                />
                <input
                  type="text"
                  name={`today-task-${today_task._id}`}
                  id={`today-task-${today_task._id}`}
                  value={
                    task.length != 0 && id === today_task._id.toString()
                      ? task
                      : today_task.title
                  }
                  className="hover:bg-gray-50  w-full py-2 px-2"
                  onChange={(e) => {
                    setTask(e.target.value);
                  }}
                  onFocus={(e) => {
                    setTask(e.target.value);
                    setId(today_task._id.toString());
                  }}
                  onBlur={(e) => {
                    setTask("");
                    setId("");
                  }}
                />
              </div>
            );
          })}
          <button type="submit"></button>
        </form>
      </section>

      <section className="description basis-2/6 h-screen flex justify-center flex-col items-center border-[1px] border-gray-100">
        <div className="text-6xl">
          <MdOutlineManageSearch />
        </div>
        <p>Click Task Title to view the detail</p>
      </section>
    </div>
  );
};

export default Tasks;
