import { SET_NAV, SET_TAB } from "./Types";

const ContextReducer = (state, action) => {
  switch (action.type) {
    case SET_NAV:
      return {
        ...state,
        NavList: action.payload,
      };
    case SET_TAB:
      return {
        ...state,
        currentTab: action.payload,
      };
    default:
      return state;
  }
};

export default ContextReducer;