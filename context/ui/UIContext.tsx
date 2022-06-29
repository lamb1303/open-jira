import { createContext } from "react";

interface ContectProps {
  sideMenuOpen: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
  isAddingEntry: boolean;
  isDragging: boolean;
  setIsAddingEntry: (entry: boolean)=> void;
  startDragging: ()=> void;
  endDragging: ()=> void;
}

export const UIContext = createContext({} as ContectProps);
