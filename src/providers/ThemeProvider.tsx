import React, { ReactNode, useState} from "react";
import {THEMES} from "@/config/settings.ts";
import {Theme, ThemeContext, ThemeContextType} from "@/providers/ThemeContext.ts";

type ThemeProviderProps = {
    children: ReactNode
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(THEMES.LIGHT);

    const toggleTheme = () => {
        setTheme(theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT);
    };

    const contextValue: ThemeContextType = {
        theme,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;