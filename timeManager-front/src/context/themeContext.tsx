import { createContext, useReducer, useContext, Dispatch } from "react";
import {IThemeState,ThemeReducer, initialThemeState} from "../reducers/ThemeReducer";

const ThemeStateContext = createContext<IThemeState>(initialThemeState);
const themeDispatchContext = createContext<Dispatch<any> | null>(null);

export const ThemeProvider = ({ children }: React.PropsWithChildren) => {
  const [theme, themeDispatch] = useReducer(ThemeReducer, initialThemeState)
  
  return (
    <ThemeStateContext.Provider value={theme}>
      <themeDispatchContext.Provider value={themeDispatch}>
        {children}
      </themeDispatchContext.Provider>
    </ThemeStateContext.Provider>
  );
};

export function useThemeState() {
  const context = useContext(ThemeStateContext)
  if (!context) {
    throw new Error("useThemeState must be used within a ThemeProvider")
  }
  return context;
}

export function useThemeDispatch() {
  const context = useContext(themeDispatchContext)
  if (!context) {
    throw new Error("useThemeDispatch must be used within a ThemeProvider")
  }
  return context;
}
