'use client'; 
import { useState } from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/constants/globals";
import { MdClose, MdMenu } from "react-icons/md";
import syles from "./mobileMenu.module.css";
const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <header className={syles["mobile-menu"]}>
      <div className={syles["mobile-menu-toggle"]} onClick={toggle}>
        <MdMenu size={30} />
      </div>
      {isOpen && (
        <div className={syles["mobile-menu-content"]} onClick={toggle}>
          <ul>
            <li>
              <div className={syles["mobile-menu-toggle-close"]}>
                <MdClose size={30} />
              </div>
            </li>
            {
                NAV_LINKS.map((el)=>(
                     <li key={el.name}>
                        <Link href={el.link}>{el.name}</Link>
                    </li>
                ))
            }
          </ul>
        </div>
      )}
    </header>
  );
};

export default MobileMenu;