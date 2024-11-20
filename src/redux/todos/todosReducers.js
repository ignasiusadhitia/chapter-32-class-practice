import {
  ADD_TODO,
  COMPLETE_TODO,
  DELETE_TODO,
  RESET_SELECTED_TODO,
  SELECT_TODO,
  UPDATE_TODO,
} from "./todosActions";

const initialState = {
  todos: [],
  selectedTodo: null,
};

// REDUCERS
const todosReducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload), // Filter out the todo with the specified ID
      };

    case SELECT_TODO:
      return {
        ...state,
        selectedTodo: action.payload,
      };

    case RESET_SELECTED_TODO:
      return {
        ...state,
        selectedTodo: null,
      };

    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo
        ),
      };

    case COMPLETE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    default:
      return state;
  }
};

export default todosReducers;
