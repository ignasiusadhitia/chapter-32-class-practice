// src/components/TodoInput.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  resetSelectedTodo,
  updateTodo,
} from "../redux/todos/todosActions";

const TodoInput = () => {
  const lang = useSelector((state) => state.lang.lang);
  const theme = useSelector((state) => state.theme.theme);
  const selectedTodo = useSelector((state) => state.todos.selectedTodo);
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedTodo) {
      dispatch(
        updateTodo({
          id: selectedTodo.id,
          text,
        })
      );
      dispatch(resetSelectedTodo());
    } else {
      dispatch(
        addTodo({
          id: Date.now(),
          text,
          completed: false,
        })
      );
    }
    setText("");
  };

  useEffect(() => {
    if (selectedTodo) {
      setText(selectedTodo.text);
    }
  }, [selectedTodo]);

  return (
    <div className="mb-3">
      <form className="input-group" onSubmit={handleSubmit}>
        <input
          type="text"
          className={`form-control ${
            theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"
          }`}
          placeholder={
            lang === "en" ? "Add a new task..." : "Tambahkan tugas baru..."
          }
          name="text"
          required
          value={text || ""}
          onChange={handleChange}
        />
        {selectedTodo ? (
          <button className="btn btn-primary" type="submit">
            {lang === "en" ? "Update" : "Perbarui"}
          </button>
        ) : (
          <button className="btn btn-primary" type="submit">
            {lang === "en" ? "Add" : "Tambah"}
          </button>
        )}
      </form>
    </div>
  );
};

export default TodoInput;