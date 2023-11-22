import { CiUser } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineMailOutline } from "react-icons/md";
import { useState } from "react";
import useAuthStore from "../store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Register = () => {
  const [isMember, setisMember] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, signup, token } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/tasks", { replace: true });
    }
  }, [token, navigate]);

  const toggleMember = () => {
    setisMember(!isMember);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log(username, email, password);
    if (isMember && email && password) {
      await login(email, password);
      navigate("/tasks");
    } else if (!isMember && username && email && password) {
      await signup(username, email, password);
      navigate("/tasks");
    } else {
      console.log("Inavlid credintials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <form
        className="py-10 px-10 border-2 border-gray-100 flex flex-col gap-6 "
        onSubmit={onSubmit}
      >
        {!isMember && (
          <div className="flex justify-between gap-6 items-center">
            <label htmlFor="username">
              <CiUser />
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="username"
              className="border-2 border-gray-100 px-4 py-2 rounded"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
        )}
        <div className="flex justify-between gap-6 items-center">
          <label htmlFor="email">
            <MdOutlineMailOutline />
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            className="border-2 border-gray-100 px-4 py-2 rounded"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="flex justify-between gap-6 items-center">
          <label htmlFor="password">
            <RiLockPasswordLine />
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            className="border-2 border-gray-100 px-4 py-2 rounded"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white py-2">
          {isMember ? "Sign in" : "Sign up"}
        </button>
        <p>
          {isMember ? "Need an account?" : "Already have an account?"}{" "}
          <span className="text-blue-500 cursor-pointer" onClick={toggleMember}>
            {isMember ? "Sign up" : "Sign in"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
