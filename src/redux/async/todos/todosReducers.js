import {
  FETCH_TODOS_FAILURE,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_REQUEST,
  PROCESS_TODOS_SUCCESS,
  RESET_SELECTED_TODO,
  SELECT_TODO,
} from "./todosActions";

const initialState = {
  todos: [],
  loading: true,
  error: null,
  isSuccess: false,
  selectedTodo: null,
};

// REDUCERS
const todosReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODOS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_TODOS_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: action.payload,
        isSuccess: false,
      };

    case FETCH_TODOS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case PROCESS_TODOS_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
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

    default:
      return state;
  }
};

export default todosReducers;
