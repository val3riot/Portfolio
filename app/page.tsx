import Link from "next/link";
import { BRAND, SOCIAL_LINKS } from "@/constants/globals";
import styles from "./Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { getLavori, getProgetti, getSkills, getFormazione } from "@/lib/data";
import Footer from "@/components/layout/footer";
import DataSection from "@/components/layout/DataSection";
export default function Home() {
  const progetti = getProgetti();
  const lavori = getLavori();
  const skills = getSkills();
  const formazione = getFormazione();
  return (
    <main className={styles.container}>
      <header>
        <h1 className="text-2xl font-medium tracking-tight">{BRAND.name}</h1>
        <p className="text-muted-foreground mt-2">{BRAND.description}</p>
        <div className={styles.socialWrapper}>
          <Link
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
          >
            <FontAwesomeIcon icon={faGithub} />
          </Link>
          <Link
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialIcon}
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </Link>
        </div>
      </header>
      <DataSection title="Esperienze" items={lavori} basePath="lavoro" />

      <DataSection title="Progetti" items={progetti} basePath="progetti" />

      <section className={`${styles.section} group`}>
        <h2 className={styles.sectionTitle}>
          <Link href={`/about/skills`} className="block">
            <span className={`${styles["is-clickable"]} font-medium`}>
              Technical Skills <span className={styles.arrowIcon}> &gt;</span>{" "}
            </span>
          </Link>
        </h2>
        {skills[0] && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm mt-4">
            <div>
              <h4 className="font-medium mb-1 uppercase text-[10px] tracking-wider">
                Backend
              </h4>
              <p className="text-muted leading-relaxed">
                {skills[0].fields.backend?.join(", ")}
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-1 uppercase text-[10px] tracking-wider">
                Networking & Lab
              </h4>
              <p className="text-muted leading-relaxed">
                {skills[0].fields.networking?.join(", ")}
              </p>
            </div>
            <div className="md:mt-4">
              <h4 className="font-medium mb-1 uppercase text-[10px] tracking-wider">
                Frontend
              </h4>
              <p className="text-muted leading-relaxed">
                {skills[0].fields.frontend?.join(", ")}
              </p>
            </div>
          </div>
        )}
      </section>

      <DataSection title="Formazione" items={formazione} />

      <Footer />
    </main>
  );
}
