import { VscAccount } from "react-icons/vsc";
import { RiTaskFill } from "react-icons/ri";
import { FaCalendar } from "react-icons/fa";
import { RiFocus2Fill } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { LuTimer } from "react-icons/lu";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="basis-[6%] flex flex-col gap-3 bg-gray-50 h-screen pt-10">
      <div className="flex items-center justify-center text-3xl">
        <VscAccount className="text-gray-400 cursor-pointer" />
      </div>
      <Link to="/tasks" className="flex items-center justify-center text-3xl">
        <RiTaskFill className="text-blue-500 cursor-pointer" />
      </Link>
      <div className="flex items-center justify-center text-3xl">
        <FaCalendar className="text-gray-400 cursor-pointer" />
      </div>
      <Link className="flex items-center justify-center text-3xl" to="/focus">
        <RiFocus2Fill className="text-gray-400 cursor-pointer" />
      </Link>
      <div className="flex items-center justify-center text-3xl">
        <CiSearch className="text-gray-400 cursor-pointer" />
      </div>
      <div className="flex items-center justify-center text-3xl">
        <LuTimer className="text-gray-400 cursor-pointer" />
      </div>
    </nav>
  );
};

export default NavBar;
