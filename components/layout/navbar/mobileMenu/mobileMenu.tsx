"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/constants/globals";
import { MdMenu, MdClose } from "react-icons/md";
import { useTheme } from "@/context/ThemeContext";
import styles from "./mobileMenu.module.css";
import ThemeToggle from "../../themeToggle/themeToggle";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  const toggle = () => setIsOpen(!isOpen);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);
  return (
    <header className={`${styles.header} ${isOpen ? styles.menuOpen : ""} ${styles[theme || 'light']} ${styles.mobileOnly}`}>
      <div className={styles.topBar}>
        <ThemeToggle />
        <button className={styles.trigger} onClick={toggle}>
          {isOpen ? <MdClose size={32} /> : <MdMenu size={32} />}
        </button>
      </div>

      <div
        className={`${styles.overlay} ${isOpen ? styles.show : ""}`}
        onClick={toggle}
      >
        <nav onClick={(e) => e.stopPropagation()}>
          <ul className={styles.list}>
            {NAV_LINKS.map((el) => (
              <li key={el.name} className={styles.item}>
                <Link href={el.link} onClick={toggle}>
                  {el.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default MobileMenu;