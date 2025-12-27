
import Link from "next/link";
import {BRAND, SOCIAL_LINKS } from "@/constants/globals";
import styles from './Home.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import FusionCollection from "fusionable/FusionCollection";
function getProgetti() {
    const collection = new FusionCollection()
        .loadFromDir('content/progetti')
        .orderBy('date', 'desc');
    console.log(collection);
    return collection.getItemsArray();
}
function getLavori() {
    const collection = new FusionCollection()
        .loadFromDir('content/lavoro')
        .orderBy('date', 'desc');
    console.log(collection);
    return collection.getItemsArray();
}
function getSkills() {
    const collection = new FusionCollection()
        .loadFromDir('content/about')
        .orderBy('date', 'desc');
    console.log(collection);
    return collection.getItemsArray();
}
function getFormazione() {
    const collection = new FusionCollection()
        .loadFromDir('content/formazione')
        .orderBy('date', 'desc');
    return collection.getItemsArray();
}
export default function Home() {
    const progetti = getProgetti();
    const lavori = getLavori();
    const skills = getSkills();
    const formazione = getFormazione();
    console.log('lavori: ', lavori);
    return (
        <main className={styles.container}>
            <header>
                <h1 className="text-2xl font-medium tracking-tight">{BRAND.name}</h1>
                <p className="text-muted-foreground mt-2">{BRAND.description}</p>
                <div className={styles.socialWrapper}>
                    <Link href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer"
                        className={styles.socialIcon}>
                        <FontAwesomeIcon icon={faGithub} />
                    </Link>
                    <Link href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer"
                        className={styles.socialIcon}>
                        <FontAwesomeIcon icon={faLinkedin} />
                    </Link>
                </div>
            </header>
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Esperienze</h2>
                <div className="flex flex-col gap-8">
                    {lavori.map((job) => (
                        <div key={job.fields.slug} className="group">
                            <Link href={`/lavoro/${job.fields.slug}`} className="block">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-medium group-hover:underline underline-offset-4">
                                        {job.fields.ruolo} @ {job.fields.azienda}
                                    </h3>
                                    <span className="text-sm text-muted tabular-nums">{job.fields.periodo}</span>
                                </div>
                                <div className="flex gap-2 mt-2">
                                    {job.fields.competenze?.map((tech: string) => (
                                        <span key={tech} className="text-[10px] uppercase tracking-widest text-muted">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Progetti</h2>
                <div className="flex flex-col gap-8">
                    {progetti.map((progetto) => (
                        <div key={progetto.fields.slug} className="group">
                            <Link href={`/progetti/${progetto.fields.slug}`} className="block">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-medium group-hover:underline underline-offset-4">
                                        {progetto.fields.title}
                                    </h3>
                                    <span className="text-sm text-muted tabular-nums">{progetto.fields.periodo}</span>
                                </div>
                                <div className="flex gap-2 mt-2">
                                    {progetto.fields.competenze?.map((tech: string) => (
                                        <span key={tech} className="text-[10px] uppercase tracking-widest text-muted">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            <section className={`${styles.section} group`}>
                <h2 className={styles.sectionTitle}>
                    <Link href={`/about/skills`} className="block">
                        <span className="group-hover:underline underline-offset-4">Technical Skills</span>
                    </Link>
                </h2>
                {skills[0] && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm mt-4">
                        <div>
                            <h4 className="font-medium mb-1 uppercase text-[10px] tracking-wider">Backend</h4>
                            <p className="text-muted leading-relaxed">{skills[0].fields.backend?.join(', ')}</p>
                        </div>
                        <div>
                            <h4 className="font-medium mb-1 uppercase text-[10px] tracking-wider">Networking & Lab</h4>
                            <p className="text-muted leading-relaxed">{skills[0].fields.networking?.join(', ')}</p>
                        </div>
                        <div className="md:mt-4">
                            <h4 className="font-medium mb-1 uppercase text-[10px] tracking-wider">Frontend</h4>
                            <p className="text-muted leading-relaxed">{skills[0].fields.frontend?.join(', ')}</p>
                        </div>
                    </div>
                )}
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Formazione</h2>
                <div className="flex flex-col gap-8">
                    {formazione.map((studio) => (
                        <div key={studio.fields.slug} className="group">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-medium">
                                        {studio.fields.istituto}
                                    </h3>
                                    <span className="text-sm text-muted tabular-nums">
                                        {studio.fields.periodo}
                                    </span>
                                </div>
                                <p className="text-sm text-muted mt-1">
                                    {studio.fields.title}
                                </p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}