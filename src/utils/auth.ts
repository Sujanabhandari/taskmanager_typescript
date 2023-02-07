import { axiosInstance } from '../config';

import { TodoList, Todo, BaseTodo } from '../types/Todo';

const getData = async (url: string) => {
  const response = await axiosInstance.get(`${url}`);
  return response;
};

const postData = async (
  url: string,
  todoData: BaseTodo,
) => {
  const response = await axiosInstance.post(`${url}`, todoData);
  return response;
};


const getSingleData = async (
  url: string,
  id: number,
) => {
  const response = await axiosInstance.get(`${url}/${id}`);
  return response;
};

const putData = async (
  url: string,
  todoData: TodoList
) => {
  const response = await axiosInstance.put(`${url}`, todoData);
  return response;
};

const deleteData = async (
  url: string
) => {
  const response = await axiosInstance.delete(`${url}`);
  return response;
};

const postTodo = async (
  url: string,
  todoData: Todo
) => {
  const response = await axiosInstance.post(`${url}`, todoData);
  return response;
};

const putTodo = async (
  url: string,
  todoData: Todo
) => {
  const response = await axiosInstance.put(`${url}`, todoData);
  return response;
};

export { getData, postData, putData, deleteData, getSingleData, postTodo, putTodo };