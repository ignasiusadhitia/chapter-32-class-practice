// import { composeWithDevTools } from "@redux-devtools/extension";
import {
  // applyMiddleware,
  combineReducers,
  // legacy_createStore as createStore,
} from "redux";
// import todosReducers from "./todos/todosReducers";
// import langReducers from "./lang/langReducers";
// import themeReducers from "./theme/themeReducers";
// import todosReducers from "./async/todos/todosReducers";
// import { thunk } from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";
import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./redux-toolkit/todosSlice";
import langReducer from "./redux-toolkit/langSlice";
import themeReducer from "./redux-toolkit/themeSlice";

const encryptor = encryptTransform({
  secretKey: import.meta.env.VITE_SECRET_KEY, // Replace with your secret key and keep it on environment variable
  onError: (error) => {
    console.error("Error while encrypting", error);
  },
});

const rootReducer = combineReducers({
  // todos: todosReducers,
  todos: todosReducer,
  // lang: langReducers,
  lang: langReducer,
  // theme: themeReducers,
  theme: themeReducer,
});

// Redux Persist Config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["todos", "lang", "theme"], // Which reducers you want to persist
  transforms: [encryptor],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Custom Middleware
const logMiddleware = (store) => (next) => (action) => {
  console.log("Current State", store.getState());
  console.log("Action", action);
  next(action);
};

// Store
// const store = createStore(
//   persistedReducer,
//   composeWithDevTools(applyMiddleware(thunk, logMiddleware))
// );

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // To avoid redux-persist serialize error
    }).concat(logMiddleware),
});

const persistor = persistStore(store);

export { store, persistor };
