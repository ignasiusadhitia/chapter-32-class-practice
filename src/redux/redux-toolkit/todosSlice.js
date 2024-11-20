import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/todos";

// Thunks for async operations
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (todo) => {
  const response = await axios.post(API_URL, todo);
  return response.data;
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (updatedTodo) => {
    await axios.put(`${API_URL}/${updatedTodo.id}`, updatedTodo);
  }
);

export const completeTodo = createAsyncThunk(
  "todos/completeTodo",
  async (todo) => {
    await axios.patch(`${API_URL}/${todo.id}`, { completed: !todo.completed });
  }
);

// Slice
const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    loading: false,
    error: null,
    isSuccess: false,
    selectedTodo: null,
  },
  reducers: {
    selectTodo: (state, action) => {
      state.selectedTodo = action.payload; // Set selected todo
    },
    clearSelectedTodo: (state) => {
      state.selectedTodo = null; // Reset selected todo
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch todos
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
        state.isSuccess = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isSuccess = false;
      })
      // Add todo
      .addCase(addTodo.fulfilled, (state) => {
        state.isSuccess = true;
      })
      // Delete todo
      .addCase(deleteTodo.fulfilled, (state) => {
        state.isSuccess = true;
      })
      // Update todo
      .addCase(updateTodo.fulfilled, (state) => {
        state.isSuccess = true;
      })
      // Complete todo
      .addCase(completeTodo.fulfilled, (state) => {
        state.isSuccess = true;
      });
  },
});
export const { selectTodo, clearSelectedTodo } = todosSlice.actions;
export default todosSlice.reducer;
