export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const SELECT_TODO = "SELECT_TODO";
export const RESET_SELECTED_TODO = "RESET_SELECTED_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const COMPLETE_TODO = "COMPLETE_TODO";

// Action Creators
export const addTodo = (todo) => ({
  type: ADD_TODO,
  payload: todo,
});

export const updateTodo = (todo) => ({
  type: UPDATE_TODO,
  payload: todo,
});

export const selectTodo = (todo) => ({
  type: SELECT_TODO,
  payload: todo,
});

export const resetSelectedTodo = () => ({
  type: RESET_SELECTED_TODO,
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: id,
});

export const completeTodo = (id) => ({
  type: COMPLETE_TODO,
  payload: id,
});
