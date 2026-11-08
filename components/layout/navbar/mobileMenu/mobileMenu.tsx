"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/constants/globals";
import { MdMenu, MdClose } from "react-icons/md";
import styles from "./mobileMenu.module.css";
import ThemeToggle from "../../themeToggle/themeToggle";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const toggle = () => setIsOpen((open) => !open);
  useEffect(() => {
    if (!isOpen) return;

    const menu = menuRef.current;
    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    menu?.querySelector<HTMLAnchorElement>('nav a')?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsOpen(false);
      }
      if (event.key !== 'Tab' || !menu) return;
      const controls = Array.from(menu.querySelectorAll<HTMLElement>('button, a[href]'));
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    const desktop = window.matchMedia('(min-width: 769px)');
    const closeOnDesktop = () => {
      if (desktop.matches) setIsOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    desktop.addEventListener('change', closeOnDesktop);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      desktop.removeEventListener('change', closeOnDesktop);
      trigger?.focus();
    };
  }, [isOpen]);
  return (
    <div ref={menuRef} role={isOpen ? "dialog" : undefined} aria-modal={isOpen || undefined} aria-label="Menu di navigazione" className={`${styles.header} ${isOpen ? styles.menuOpen : ""}`}>
      <div className={styles.topBar}>
        <ThemeToggle />
        <button ref={triggerRef} type="button" className={styles.trigger} onClick={toggle} aria-label={isOpen ? "Chiudi menu" : "Apri menu"} aria-expanded={isOpen} aria-controls="mobile-navigation">
          {isOpen ? <MdClose size={32} /> : <MdMenu size={32} />}
        </button>
      </div>

      <div
        className={`${styles.overlay} ${isOpen ? styles.show : ""}`}
        onClick={toggle}
      >
        <nav id="mobile-navigation" inert={!isOpen} onClick={(e) => e.stopPropagation()}>
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
    </div>
  );
};

export default MobileMenu;