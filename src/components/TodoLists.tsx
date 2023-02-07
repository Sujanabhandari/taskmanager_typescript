import React, { useState, useEffect, useRef } from 'react';
import { axiosInstance } from '../config';
import { getData, postData, putData, deleteData } from '../utils/auth';
import { Link } from 'react-router-dom';

import { TodoList } from '../types/Todo';

const TodoLists = () => {
  const [todoLists, setTodoLists] = useState<TodoList[]>([]);
  const [editTodoList, setEditTodoList] = useState<TodoList>({
    _id: -1,
    name: ''
  });
  const [newTodoList, setNewTodoList] = useState<string>('');
  const [modalShow, setModalShow] = useState<boolean>(true);

  useEffect(() => {
    const fetchTodoLists = async () => {
      try {
        const { data } = await getData('/todolists');
        setTodoLists(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTodoLists();
  }, []);

  const saveTodoList = async (id: number) => {
    try {
      const {data} = await putData(`/todolists/${id}`, editTodoList);
      setTodoLists((prev) => {
        const updatedTodoLists = prev.map((list) => {
          if (list._id === id) {
            return {...list, ...data};
          } else{
            return list;
          }
        });
        return updatedTodoLists;
    });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodoList = async (id: number) => {
    try {
      const result = await deleteData(`/todolists/${id}`);
      setTodoLists(current => current.filter(todoLists => todoLists._id !== id));
    } catch (error) {
      console.error(error);
    }
  };
  const addNewTodoList = async () => {
    try {
      const {data} = await postData('/todolists', {name:newTodoList});
      setTodoLists((prev) => [...prev, data]);
      setNewTodoList('');
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

                  <h6 className="mb-3">Awesome Todo Lists</h6>

                  <form className="d-flex justify-content-center align-items-center mb-4">
                    <div className="form-outline flex-fill">
                      <input type="text" name="todolist" className="form-control form-control-lg" autoFocus onChange={(e) => setNewTodoList(prev => e.target.value)} placeholder='What do you need to do today?' />
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg ms-2" onClick={(e) => {
                      e.preventDefault();
                      addNewTodoList();
                    }}>Add</button>
                  </form>

                  <ul className="list-group mb-0">
                    {todoLists.map((todoList, index) => (
                      <Link key={index} to={`/todos/${todoList._id}`}>
                        <li
                          className="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
                          <div className="d-flex align-items-center">
                            {todoList.name}
                          </div>
                          <div className='todo-actions'>
                            <button className="btn btn-danger me-3" onClick={(e) => {
                              e.preventDefault();
                              deleteTodoList(todoList._id)
                            }}>Delete</button>
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#todolistEditModal" onClick={(e) => {
                              e.preventDefault();
                              setEditTodoList(todoList);
                            }} >Edit</button>
                          </div>
                        </li>
                      </Link>
                    ))}
                  </ul>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
      {modalShow ? (
        <div className="modal fade" id="todolistEditModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Todolist</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <input type="text" value={editTodoList.name} onChange={(e) => setEditTodoList((prev)=> {
                  return {...prev, name:e.target.value}
                  })}/>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => {
                  saveTodoList(editTodoList._id)
                }}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      ) : ''}
    </div>
  );
};

export default TodoLists;
