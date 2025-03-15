import React, {useEffect} from 'react';
import {Button} from "@heroui/react";
import {THEMES} from "@/config/settings.ts";
import {useTheme} from "@/providers/ThemeContext.ts";
import {ThemeIconDark, ThemeIconLight} from "@/components/Icons.tsx";
import {darkTheme, lightTheme} from "@/config/chartTheme.ts";
import Highcharts from "highcharts";

const ThemeToggle: React.FC = () => {
    const {theme, toggleTheme} = useTheme();

    useEffect(() => {
        if (theme === THEMES.DARK) {
            document.documentElement.classList.add('dark');
            Highcharts.setOptions(darkTheme);
        } else {
            document.documentElement.classList.remove('dark');
            Highcharts.setOptions(lightTheme);
        }
    }, [theme]);

    return (
        <Button
            onPress={toggleTheme}
            className="max-xs:min-w-10 max-xs:px-2 md:min-w-28 bg-primary text-white dark:bg-default"
        >
            {theme === THEMES.LIGHT ? <><ThemeIconDark/><span
                className="ml-2 md:block hidden">Dark</span></> : <><ThemeIconLight/><span
                className="ml-2 md:block hidden">Light</span></>}
        </Button>
    );
};

export default ThemeToggle;