import { Link } from "react-router-dom";
import Header from "../assets/header.png";
const Home = () => {
  return (
    <div className="mx-auto my-6 max-w-7xl home">
      <nav className="flex flex-row items-center justify-between mb-20">
        <h1>Tick Tick</h1>
        <Link to="/register">Sign Up</Link>
      </nav>
      <main>
        <div className="flex items-center justify-between">
          <div className="sec-left basis-1/2">
            <h1 className="mb-5 text-6xl font-semibold">Stay Organized</h1>
            <h1 className="mb-10 text-6xl font-semibold">Stay Creative</h1>
            <p className="mb-5 text-xl">
              Join millions of people to capture ideas, organize life, and do
              something creative everyday.
            </p>
            <button className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-sm">
              Get Started
            </button>
          </div>
          <div className="sec-right basis-1/2">
            <img src={Header} alt="header-img" className="w-full" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
