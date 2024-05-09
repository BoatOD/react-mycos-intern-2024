import axios from "axios";
import { ITodo } from "../components/MyTodoList/ITodo";

const base_url = "https://localhost:7026/Todo";
export const todoApi = {
  getTodos: () => axios.get<ITodo[]>(base_url),
  addTodo: (todo: ITodo) => axios.post(base_url, todo),
  updateTodo: (id: string, todo: ITodo) => axios.put(base_url + `/${id}`, todo),
  updateStatus: (id: string, todo: ITodo) => axios.put(base_url + `/${id}`, todo),
  deleteTodos: (id: string) => axios.delete(base_url + `/${id}`),
  // getTodo: (id: string) => axios.get<ITodo>(base_url + `/${id}`),
};
