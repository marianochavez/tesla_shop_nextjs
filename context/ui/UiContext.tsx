import {createContext} from "react";

interface ContextProps {
  isMenuOpen: boolean;

  // Actions
  toggleSideMenu: () => void;
}

export const UiContext = createContext({} as ContextProps);
