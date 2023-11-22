// todoStore.js
import axios from "axios";
import { create } from "zustand";

const useTodoStore = create((set) => ({
  tasks: [],

  addTasks: async (title, completed, token) => {
    console.log(title, completed, token);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/tasks",
        {
          title,
          completed,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      set((state) => ({
        tasks: [...state.tasks, response.data],
      }));
    } catch (error) {
      console.log(error.message);
    }
  },
  initialiseTasks: async (token) => {
    try {
      const response = await axios.get("http://localhost:3000/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      set((state) => ({
        tasks: response.data,
      }));
    } catch (error) {
      console.log(error.message);
    }
  },

  updateTask: async (todoId, updatedTodo, token) => {
    const response = await axios.put(
      `http://localhost:3000/api/tasks/${todoId}`,
      {
        ...updatedTodo,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    set((state) => ({
      tasks: state.tasks.map((todo) => {
        return todo._id.toString() === todoId.toString() ? response.data : todo;
      }),
    }));
  },

  // removeTodo: (todoId) => {
  //   set((state) => ({
  //     todos: state.todos.filter((todo) => todo.id !== todoId),
  //   }));
  // },
}));

export default useTodoStore;
