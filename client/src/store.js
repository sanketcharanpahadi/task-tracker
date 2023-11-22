import { create } from "zustand";
import axios from "axios";

// authStore.js

const useAuthStore = create((set) => ({
  username: JSON.parse(localStorage.getItem("user"))?.username || "",
  email: JSON.parse(localStorage.getItem("user"))?.email || "",
  isMember: JSON.parse(localStorage.getItem("user"))?.isMember || false,
  token: JSON.parse(localStorage.getItem("user"))?.token || "",

  // Login function
  login: async (email, password) => {
    const response = await axios.post("http://localhost:3000/api/users/login", {
      email,
      password,
    });
    // console.log(response.data);
    set({
      username: response.data.username,
      email: response.data.email,
      isMember: true,
      token: response.data.token,
    });
    localStorage.setItem("user", JSON.stringify(response.data));
  },

  // Signup function
  signup: async (username, email, password) => {
    const response = await axios.post(
      "http://localhost:3000/api/users/register",
      {
        username,
        email,
        password,
      }
    );
    console.log(response.data);

    set({
      username: response.data.username,
      email: response.data.email,
      isMember: true,
      token: response.data.token,
    });
    localStorage.setItem("user", JSON.stringify(response.data));
  },
}));

export default useAuthStore;
