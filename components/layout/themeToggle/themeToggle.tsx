"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

export default function ThemeToggle() {
    function toggleTheme() {
        const dark = document.documentElement.classList.toggle('dark');
        try {
            localStorage.setItem('theme', dark ? 'dark' : 'light');
        } catch {
            // Changing theme remains available when storage is blocked.
        }
    }

    return (
        <button type="button" onClick={toggleTheme} className="theme-toggle p-2 opacity-60 hover:opacity-100 transition-opacity duration-200" aria-label="Cambia tema">
            <FontAwesomeIcon icon={faMoon} className="theme-light-icon text-lg" />
            <FontAwesomeIcon icon={faSun} className="theme-dark-icon text-lg" />
        </button>
    );
}
