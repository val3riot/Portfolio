import styles from "./navbar.module.css";
import Link from "next/link";
import {BRAND, NAV_LINKS} from "@/constants/globals";
import MobileMenu from "./mobileMenu/mobileMenu";
import ThemeToggle from "../themeToggle/themeToggle";

const Navbar = () => {
    return (
        <header>
            <nav className={styles.navbar}>
                <div className={styles.logo}>
                    <Link href={'/'}><h1>{BRAND.logo}</h1></Link>

                </div>
                {<MobileMenu/>}
                <ul className={styles["nav-list"]}>
                    {
                        NAV_LINKS.map((el) => (
                            <li key={el.name}>
                                <Link href={el.link}>{el.name}</Link>
                            </li>
                        ))
                    }
                    <li key="theme-toggle">
                        <ThemeToggle />
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;