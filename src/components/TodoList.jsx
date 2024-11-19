import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  completeTodo,
  deleteTodo,
  selectTodo,
} from "../redux/todos/todosActions";

const TodoList = () => {
  const todos = useSelector((state) => state.todos.todos);
  const lang = useSelector((state) => state.lang.lang);
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

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
            onClick={() => dispatch(completeTodo(todo.id))}
          >
            {todo.text}
          </span>
          <div className="d-flex gap-2">
            <button
              className="btn btn-danger btn-sm"
              onClick={() => dispatch(deleteTodo(todo.id))}
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
