// todoStore.js
import axios from "axios";
import { create } from "zustand";

const useTodoStore = create((set) => ({
  tasks: [],

  addTodo: async (title, completed, token) => {
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

  // updateTodo: (todoId, updatedTodo) => {
  //   set((state) => ({
  //     todos: state.todos.map((todo) =>
  //       todo.id === todoId ? { ...todo, ...updatedTodo } : todo
  //     ),
  //   }));
  // },

  // removeTodo: (todoId) => {
  //   set((state) => ({
  //     todos: state.todos.filter((todo) => todo.id !== todoId),
  //   }));
  // },
}));

export default useTodoStore;
