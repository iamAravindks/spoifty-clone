import { createContext, useReducer } from "react";
import ContextReducer from "./ContextReducer";
import { SET_CURRENT_MUSIC, SET_MUSIC, SET_NAV, SET_TAB } from "./Types";

const initialState = {
  currentMusic: null,
  NavList: [],
  currentTab: null,
  musics: [],
  queue: [],
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

  const setCurrentMusic = (_id) => {
    dispatch({
      type: SET_CURRENT_MUSIC,
      payload: _id,
    });
  };
  return (
    <Context.Provider
      value={{
        currentMusic: appState.currentMusic,
        NavList: appState.NavList,
        currentTab: appState.currentTab,
        musics: appState.musics,
        queue: appState.queue,
        setNav,
        setTab,
        getPlaylistId,
        setMusics,
        setCurrentMusic,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
