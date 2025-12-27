'use client';

import {useTheme} from "@/context/ThemeContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSun, faMoon} from "@fortawesome/free-solid-svg-icons";

export default function ThemeToggle() {
    const {theme, toggleTheme} = useTheme();
    if (!theme) return <div className="w-8 h-8"/>;
    return (
        <button
            onClick={toggleTheme}
            className="p-2 opacity-60 hover:opacity-100 transition-opacity duration-200"
            aria-label="Cambia tema"
        >
            {theme === 'light' ? (
                <FontAwesomeIcon icon={faMoon} className="text-lg"/>
            ) : (
                <FontAwesomeIcon icon={faSun} className="text-lg"/>
            )}
        </button>
    );
}