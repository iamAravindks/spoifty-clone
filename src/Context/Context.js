import { createContext, useReducer } from "react";
import ContextReducer from "./ContextReducer";
import { SET_NAV, SET_TAB } from "./Types";

const initialState = {
  currentMusic: null,
  NavList: [],
  currentTab: null,
  musics: [],
};

export const Context = createContext(initialState);

const Provider = ({ children }) => {
  const [appState, dispatch] = useReducer(ContextReducer, initialState);

  const setNav = (list) => {
    dispatch({
      type: SET_NAV,
      payload: list,
    });
  };

  const setTab = (tab) => {
    dispatch({
      type: SET_TAB,
      payload: tab,
    });
  };
  return (
    <Context.Provider
      value={{
        currentMusic: appState.currentMusic,
        NavList: appState.NavList,
        currentTab: appState.currentTab,
        setNav,
        setTab,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
