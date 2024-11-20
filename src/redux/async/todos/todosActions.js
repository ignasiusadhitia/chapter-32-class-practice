import axios from "axios";

export const FETCH_TODOS_REQUEST = "FETCH_TODOS_REQUEST";
export const FETCH_TODOS_SUCCESS = "FETCH_TODOS_SUCCESS";
export const FETCH_TODOS_FAILURE = "FETCH_TODOS_FAILURE";
export const PROCESS_TODOS_SUCCESS = "PROCESS_TODOS_SUCCESS";
export const SELECT_TODO = "SELECT_TODO";
export const RESET_SELECTED_TODO = "RESET_SELECTED_TODO";

const API_URL = "http://localhost:3000/todos";

// Action Creators
export const fetchTodosRequest = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_TODOS_REQUEST });
    try {
      const response = await axios.get(API_URL);
      const data = await response.data;
      dispatch({ type: FETCH_TODOS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_TODOS_FAILURE, payload: error.message });
    }
  };
};

export const addTodoRequest = (todo) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_TODOS_REQUEST });
    try {
      await axios.post(API_URL, todo);
      dispatch({ type: PROCESS_TODOS_SUCCESS });
    } catch (error) {
      dispatch({ type: FETCH_TODOS_FAILURE, payload: error.message });
    }
  };
};

export const deleteTodoRequest = (id) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_TODOS_REQUEST });
    try {
      await axios.delete(`${API_URL}/${id}`);
      dispatch({ type: PROCESS_TODOS_SUCCESS });
    } catch (error) {
      dispatch({ type: FETCH_TODOS_FAILURE, payload: error.message });
    }
  };
};

export const updateTodoRequest = (todo) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_TODOS_REQUEST });
    try {
      await axios.put(`${API_URL}/${todo.id}`, todo);
      dispatch({ type: PROCESS_TODOS_SUCCESS });
    } catch (error) {
      dispatch({ type: FETCH_TODOS_FAILURE, payload: error.message });
    }
  };
};

export const completeTodoRequest = (todo) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_TODOS_REQUEST });
    try {
      const updatedField = { completed: !todo.completed };
      await axios.patch(`${API_URL}/${todo.id}`, updatedField); // Use PATCH to update a single field
      dispatch({ type: PROCESS_TODOS_SUCCESS });
    } catch (error) {
      dispatch({ type: FETCH_TODOS_FAILURE, payload: error.message });
    }
  };
};

export const selectTodo = (todo) => ({
  type: SELECT_TODO,
  payload: todo,
});

export const resetSelectedTodo = () => ({
  type: RESET_SELECTED_TODO,
});
