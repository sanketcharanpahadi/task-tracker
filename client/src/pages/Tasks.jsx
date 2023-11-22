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
const Tasks = () => {
  const [task, setTask] = useState("");
  const { addTodo } = useTodoStore();

  const { token } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("mera", token);
      await addTodo(task, false, token);
      setTask("");
    } catch (error) {
      console.log(error.message);
    }
  };

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
        <form className="max-w-md mb-10 flex gap-3">
          <input type="checkbox" name="overdue" id="overdue" />
          <input
            type="text"
            name="overdue-task"
            id="overdue-task"
            value="Inbound Marketing Course Completion"
            className="hover:bg-gray-50  w-full py-2 px-2"
          />
        </form>

        <h2 className="text-xl mb-3">Today</h2>
        <form className="max-w-md mb-10 flex gap-3">
          <input type="checkbox" name="today" id="today" />
          <input
            type="text"
            name="today-task"
            id="today-task"
            value="Inbound Marketing Course Completion"
            className="hover:bg-gray-50  w-full py-2 px-2"
          />
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
