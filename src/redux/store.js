import { composeWithDevTools } from "@redux-devtools/extension";
import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
// import todosReducers from "./todos/todosReducers";
import langReducers from "./lang/langReducers";
import themeReducers from "./theme/themeReducers";
import todosReducers from "./async/todos/todosReducers";
import { thunk } from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";

const encryptor = encryptTransform({
  secretKey: import.meta.env.VITE_SECRET_KEY, // Replace with your secret key and keep it on environment variable
  onError: (error) => {
    console.error("Error while encrypting", error);
  },
});

const rootReducer = combineReducers({
  todos: todosReducers,
  lang: langReducers,
  theme: themeReducers,
});

// Redux Persist Config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["todos", "lang", "theme"], // Which reducers you want to persist
  transforms: [encryptor],
};

// Middleware
const logMiddleware = (store) => (next) => (action) => {
  console.log("Current State", store.getState());
  console.log("Action", action);
  next(action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store
const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk, logMiddleware))
);

const persistor = persistStore(store);

export { store, persistor };
