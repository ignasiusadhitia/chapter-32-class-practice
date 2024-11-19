import { composeWithDevTools } from "@redux-devtools/extension";
import { combineReducers, legacy_createStore as createStore } from "redux";
import todosReducers from "./todos/todosReducers";
import langReducers from "./lang/langReducers";
import themeReducers from "./theme/themeReducers";

const rootReducer = combineReducers({
  todos: todosReducers,
  lang: langReducers,
  theme: themeReducers,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
