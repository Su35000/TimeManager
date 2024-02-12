export const initialThemeState = {
    theme: localStorage.getItem("theme") || "light"
};
  
export interface IThemeState{
  theme: string;
}
  
export interface IThemeAction{
  type:string,
  payload:string,
}
  
export const ThemeReducer = (
  state: IThemeState,
  action: IThemeAction
) => {
  const {type, payload} = action;
  switch (type) {
    case "SWITCH_THEME":
      localStorage.setItem("theme",payload)
      return {
        theme:payload
      };
    default:
      return state;
  }
};
  