import React, { useState, useEffect, useRef } from 'react';
import { axiosInstance } from '../config';
import { getData, postTodo, putData, deleteData, putTodo } from '../utils/auth';
import { useParams, Link } from 'react-router-dom';

import { Todo } from '../types/Todo';

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editTodo, setEditTodo] = useState<Todo>({
    _id: -1,
    name: '',
    done: false,
    todolistId: 1,
  });
  const [newTodo, setNewTodo] = useState<string>('');

  const { id }: { id?: number } = useParams();
  // const clickedTodoList = todos?.filter((todo) => todo.id == id);

  useEffect(() => {
    const fetchtodos = async () => {
      try {
        const { data } = await getData(`/todos?todolistId=${id}`);
        setTodos(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchtodos();
  }, []);

  const addNewTodo = async () => {
    try {
      const { data } = await postTodo('/todos', { name: newTodo, done: false, todolistId: id });
      setTodos((prev) => [...prev, data]);
      setNewTodo('');
    } catch (error) {
      console.error(error);
    }
  };
  const saveTodo = async (id: number | undefined) => {
    try {
      const { data } = await putTodo(`/todos/${id}`, editTodo);
      setTodos((prev) => {
        const updatedtodos = prev.map((list) => {
          if (list._id === id) {
            return { ...list, ...data };
          } else {
            return list;
          }
        });
        return updatedtodos;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id: number | undefined) => {
    try {
      const { status } = await deleteData(`/todos/${id}`);
      if (status === 204) {
        setTodos(current => current.filter(todos => todos._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleTodo = async (id: number | undefined) => {
    const todo = todos.filter((todo) => todo._id === id);
    if (todo.length <= 0) {
      return;
    }
    try {
      const { data } = await putTodo(`/todos/${id}`, { ...todo[0], done: !todo[0].done });
      setTodos((prev) => {
        const updatedtodos = prev.map((list) => {
          if (list._id === id) {
            return { ...list, ...data };
          } else {
            return list;
          }
        });
        return updatedtodos;
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <section className="vh-100" style={{ backgroundColor: '#e2d5de' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">

              <div className="card" style={{ borderRadius: '15px' }}>
                <div className="card-body p-5">

                  <h6 className="mb-3">Awesome Todos</h6>

                  <form className="d-flex justify-content-center align-items-center mb-4">
                    <div className="form-outline flex-fill">
                      <input type="text" className="form-control form-control-lg" autoFocus value={newTodo} onChange={(e) => setNewTodo(prev => e.target.value)} placeholder='What do you need to do today?' />
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg ms-2" onClick={(e) => {
                      e.preventDefault();
                      addNewTodo();
                    }}>Add</button>
                  </form>

                  <ul className="list-group mb-0">
                    {todos.map((todo, index) => (
                      <li
                        key={index} className="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
                        <div className="d-flex align-items-center">
                          <input className="form-check-input me-2" type="checkbox" value="" checked={todo.done} onChange={() => toggleTodo(todo._id)} aria-label="..." />
                          {todo.done ? <s>{todo.name}</s> : todo.name}
                        </div>
                        <div className='todo-actions'>
                          <button className="btn btn-danger me-3" onClick={() => deleteTodo(todo._id)}>Delete</button>
                          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#todolistEditModal" onClick={() => {
                            setEditTodo(todo);
                          }} >Edit</button>
                        </div>
                      </li>
                    ))}
                  </ul>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <div className="modal fade" id="todolistEditModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Todolist</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <input type="text" value={editTodo.name} onChange={(e) => setEditTodo((prev) => {
                return { ...prev, name: e.target.value }
              })} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => {
                saveTodo(editTodo._id)
              }}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todos;
