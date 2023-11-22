import Header from "../assets/header.png";
const Home = () => {
  return (
    <div className="home">
      <nav className="flex flex-row justify-between items-center mb-20">
        <h1>Tick Tick</h1>
        <button>Sign Up</button>
      </nav>
      <main>
        <div className="flex items-center justify-between">
          <div className="sec-left basis-1/2">
            <h1 className="font-semibold text-6xl mb-5">Stay Organized</h1>
            <h1 className="font-semibold text-6xl mb-10">Stay Creative</h1>
            <p className="text-xl mb-5">
              Join millions of people to capture ideas, organize life, and do
              something creative everyday.
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 font-semibold rounded-sm">
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
