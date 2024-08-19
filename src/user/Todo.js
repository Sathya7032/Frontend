import React, { useEffect, useState } from "react";
import useAxios from "../utils/useAxios";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import { Typography } from "@mui/material";
import { Delete, Done } from "@mui/icons-material";
import Base1 from "./Base1";

const Todo = () => {
  const baseUrl = "https://acadamicfolios.pythonanywhere.com/app";
  const api = useAxios();

  const token = localStorage.getItem("authTokens");
  const decoded = jwtDecode(token);
  const user_id = decoded.user_id;

  const [todo, setTodo] = useState([]);
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    await api.get(baseUrl + "/todo/" + user_id + "/").then((res) => {
      console.log(res.data);
      setTodo(res.data);
    });
  };

  const [createTodo, setCreateTodo] = useState({ title: "", completed: "" });
  const handleNewTodoTitle = (event) => {
    setCreateTodo({
      ...createTodo,
      [event.target.name]: event.target.value,
    });
  };

  const formSubmit = () => {
    const formdata = new FormData();

    formdata.append("user", user_id);
    formdata.append("title", createTodo.title);
    formdata.append("completed", false);
    try {
      api.post(baseUrl + "/todo/" + user_id + "/", formdata).then((res) => {
        console.log(res.data);
        Swal.fire({
          title: "Your Task is Added.....",
          width: 400,
          timer: 2000,
          toast: true,
          timerProgressBar: true,
          padding: "3em",
          color: "#716add",
        });
        fetchTodos();
        createTodo.title = "";
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (todo_id) => {
    await api.delete(baseUrl + "/todo-detail/" + user_id + "/" + todo_id + "/");
    Swal.fire({
      title: "Your Task is deleted......",
      width: 400,
      timer: 2000,
      toast: true,
      timerProgressBar: true,
      padding: "3em",
      color: "#716add",
    });
    fetchTodos();
  };

  const markTodoAsComplete = async (todo_id) => {
    await api.patch(
      baseUrl + "/todo-mark-as-completed/" + user_id + "/" + todo_id + "/"
    );
    Swal.fire({
      title: "Your Task is completed.....",
      width: 400,
      timer: 2000,
      toast: true,
      timerProgressBar: true,
      padding: "3em",
      color: "#716add",
    });
    fetchTodos();
  };

  return (
    <div>
      <Base1>
        <div className="todo-container">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-10">
                <div className="card" style={{ backgroundColor: "primary" }}>
                  <Typography
                    variant="h3"
                    color="primary"
                    style={{
                      fontWeight: "bold",
                      textAlign: "center",
                      border: "none",
                      padding: "15px",
                    }}
                  >
                    Todo List
                  </Typography>
                  <div className="card-body">
                    <form id="todo-form">
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          className="form-control"
                          onChange={handleNewTodoTitle}
                          value={createTodo.title}
                          name="title"
                          id="todo-input"
                          placeholder="Add new task"
                          required
                        />
                        <div className="input-group-append">
                          <button
                            className="btn btn-primary"
                            type="button"
                            onClick={formSubmit}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </form>

                    {todo.map((todo) => (
                      <div className="col col-12 p-2 todo-item" key={todo.id}>
                        <div className="input-group">
                          {todo.completed ? (
                            <p className="form-control">
                              <strike>{todo.title}</strike>
                            </p>
                          ) : (
                            <p className="form-control">{todo.title}</p>
                          )}
                          <div className="input-group-append">
                            <button
                              className="btn bg-success text-white ml-2"
                              type="button"
                              onClick={() => markTodoAsComplete(todo.id)}
                            >
                              <Done />
                            </button>
                            <button
                              className="btn bg-danger text-white ml-2"
                              type="button"
                              onClick={() => deleteTodo(todo.id)}
                            >
                              <Delete />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Base1>
    </div>
  );
};

export default Todo;