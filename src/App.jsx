import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
// import { setLang } from "./redux/lang/langActions";
// import { setTheme } from "./redux/theme/themeActions";
import { setLang } from "./redux/redux-toolkit/langSlice";
import { setTheme } from "./redux/redux-toolkit/themeSlice";

const App = () => {
  const lang = useSelector((state) => state.lang.lang);
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.className =
      theme === "dark" ? "bg-dark text-white" : "bg-light text-dark";
  }, [theme]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div
              className={`card-body ${
                theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"
              } rounded`}
            >
              <div className="d-flex justify-content-end gap-2 mb-5">
                <button
                  className={`btn btn-sm ${
                    theme === "dark" ? "btn-light" : "btn-dark"
                  }`}
                  onClick={() => dispatch(setLang(lang === "en" ? "id" : "en"))}
                >
                  {lang === "en" ? "ID" : "EN"}
                </button>

                <button
                  className={`btn btn-sm ${
                    theme === "dark" ? "btn-light" : "btn-dark"
                  }`}
                  onClick={() =>
                    dispatch(setTheme(theme === "dark" ? "light" : "dark"))
                  }
                >
                  {theme === "dark" ? "🌞" : "🌙"}
                </button>
              </div>
              <h1 className="card-title text-center mb-4">
                {lang === "en" ? "To-Do List" : "Daftar To-Do"}
              </h1>
              <TodoInput />
              <TodoList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
