import { createContext, useReducer } from "react";
import ContextReducer from "./ContextReducer";
import { SET_MUSIC, SET_NAV, SET_TAB } from "./Types";

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

  const getPlaylistId = (tab) => {
    switch (tab) {
      case "For You":
        return 1;
      case "Top Tracks":
        return 2;
      case "Favourites":
        return 3;
      case "Recently Played":
        return 4;
      default:
        return 1;
    }
  };

  const setMusics = (musics) => {
    dispatch({
      type: SET_MUSIC,
      payload: musics,
    });
  };
  return (
    <Context.Provider
      value={{
        currentMusic: appState.currentMusic,
        NavList: appState.NavList,
        currentTab: appState.currentTab,
        musics: appState.musics,
        setNav,
        setTab,
        getPlaylistId,
        setMusics,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
