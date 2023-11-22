import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";

function App() {
  return (
    <>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
