import { BRAND, SOCIAL_LINKS } from "@/constants/globals"
import styles from './ContentLayout.module.css';
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function Footer(){

    return (
        <section className="mt-20 pt-10 border-t border-dashed border-[var(--border)]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div className="flex flex-col gap-1">
                        <span className="text-muted text-[10px] uppercase">Email</span>
                        <a href={"mailto:"+BRAND.email} className="hover:underline font-mono">
                           {BRAND.email}
                        </a>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-muted text-[10px] uppercase">Social</span>
                        <div className="flex gap-4">
                            <Link href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer"
                        className={styles.socialIcon}>
                        <FontAwesomeIcon icon={faGithub} />
                    </Link>
                    <Link href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer"
                        className={styles.socialIcon}>
                        <FontAwesomeIcon icon={faLinkedin} />
                    </Link>
                        </div>
                    </div>
                </div>
            </section>
    )
}