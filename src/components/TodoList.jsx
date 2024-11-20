import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  // completeTodo,
  // deleteTodo,
  selectTodo,
} from "../redux/todos/todosActions";
import {
  completeTodoRequest,
  deleteTodoRequest,
  fetchTodosRequest,
} from "../redux/async/todos/todosActions";

const TodoList = () => {
  const { todos, loading, error, isSuccess } = useSelector(
    (state) => state.todos
  );
  const lang = useSelector((state) => state.lang.lang);
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodosRequest());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(fetchTodosRequest());
    }
  }, [isSuccess, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (todos.length === 0) {
    return <div>No todos found.</div>;
  }

  return (
    <ul className="list-group">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`list-group-item d-flex justify-content-between align-items-center ${
            todo.completed ? "list-group-item-success" : ""
          } ${theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"}`}
        >
          <span
            style={{
              cursor: "pointer",
              textDecoration: todo.completed ? "line-through" : "none",
            }}
            onClick={() => dispatch(completeTodoRequest(todo))}
          >
            {todo.text}
          </span>
          <div className="d-flex gap-2">
            <button
              className="btn btn-danger btn-sm"
              onClick={() => dispatch(deleteTodoRequest(todo.id))}
            >
              {lang === "en" ? "Delete" : "Hapus"}
            </button>
            <button
              className="btn btn-warning btn-sm"
              onClick={() => dispatch(selectTodo(todo))}
            >
              {lang === "en" ? "Edit" : "Perbarui"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
