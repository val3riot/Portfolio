import Link from "next/link";
import { BRAND } from "@/constants/globals";
import styles from "./Home.module.css";
import SocialLinks from "@/components/layout/SocialLinks";
import { getLavori, getProgetti, getSkills, getFormazione } from "@/lib/data";
import Footer from "@/components/layout/footer";
import DataSection from "@/components/layout/DataSection";
import SkillTags from "@/components/skills/SkillTags";
import { SKILL_CATEGORIES } from "@/constants/skills";
export default function Home() {
  const progetti = getProgetti();
  const lavori = getLavori();
  const skills = getSkills().find((item) => item.fields.slug === "skills")?.fields;
  const formazione = getFormazione();
  return (
    <main className={styles.container}>
      <header>
        <h1 className="text-2xl font-medium tracking-tight">{BRAND.name}</h1>
        <p className="text-muted-foreground mt-2">{BRAND.description}</p>
        <div className={styles.socialWrapper}>
          <SocialLinks className={styles.socialIcon} />
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
        {skills && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-4">
            {SKILL_CATEGORIES.filter(({ key }) => ['backend', 'frontend', 'database'].includes(key)).map(({ key, title }) => (
              <div key={key} className={key === 'database' ? 'md:col-span-2' : undefined}>
                <h3 className="font-medium mb-2 uppercase text-[10px] tracking-wider">{title}</h3>
                <SkillTags skills={skills[key] ?? []} compact label={title} />
              </div>
            ))}
          </div>
        )}
      </section>

      <DataSection title="Formazione" items={formazione} />

      <Footer />
    </main>
  );
}
