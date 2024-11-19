import { SET_LANG } from "./langActions";

const initialState = {
  lang: "en",
};

const langReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_LANG:
      return {
        ...state,
        lang: action.payload,
      };
    default:
      return state;
  }
};

export default langReducers;
