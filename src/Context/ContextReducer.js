import { SET_CURRENT_MUSIC, SET_MUSIC, SET_NAV, SET_TAB } from "./Types";

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
    case SET_MUSIC:
      return {
        ...state,
        musics: action.payload,
      };

    case SET_CURRENT_MUSIC:
      return {
        ...state,
        currentMusic: action.payload,
        queue: state.musics,
      };
    default:
      return state;
  }
};

export default ContextReducer;
