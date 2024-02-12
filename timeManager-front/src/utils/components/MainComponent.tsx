import { PropsWithChildren } from "react";
import { useThemeState } from "../../context/themeContext";

export default function MainComponent({children}:PropsWithChildren){
    const {theme} = useThemeState();
    
    return(
        <main className={`${theme} text-foreground bg-background`}>
            {children}
        </main>
    )
}