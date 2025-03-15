import {Context, createContext, useContext} from "react";
import {THEMES} from "@/config/settings.ts";

export type Theme = THEMES.LIGHT | THEMES.DARK;
export type ThemeContextType = {
    theme: Theme;
    toggleTheme: (() => void) | undefined ;
};

export const ThemeContext:Context<ThemeContextType> = createContext<ThemeContextType>({
    theme: THEMES.LIGHT,
    toggleTheme: undefined
});

export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};