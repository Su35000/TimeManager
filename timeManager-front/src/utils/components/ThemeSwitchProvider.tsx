import { NextUIProvider } from "@nextui-org/react";
import { PropsWithChildren } from "react";
import { ThemeProvider } from "../../context/themeContext";
import MainComponent from "./MainComponent";

export default function ThemeSwitchProvider({children}:PropsWithChildren){
    return(
      <NextUIProvider>
          <ThemeProvider>
            <MainComponent>
              {children}
            </MainComponent>
          </ThemeProvider>
      </NextUIProvider>
    )
}