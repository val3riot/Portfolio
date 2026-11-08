import styles from './ContentLayout.module.css';
import Footer from './footer';
import MarkdownContent from './MarkdownContent';
import SkillTags from '@/components/skills/SkillTags';

import { SKILL_CATEGORIES } from '@/constants/skills';
import type { ContentMetadata } from '@/lib/content';

interface ContentLayoutProps {
    title: string;
    date?: string;
    contentHTML: string;
    metadata?: ContentMetadata;
}

export default function ContentLayout({ title, date, contentHTML, metadata }: ContentLayoutProps) {
    return (
        <article className={styles.article}>
            <header className={styles.header}>
                <h1 className="text-3xl font-medium tracking-tight mb-2">{title}</h1>
                {date && <p className="text-sm text-muted font-mono uppercase">{date}</p>}
            </header>

            {metadata?.competenze && (
                <section className={styles.projectSkills} aria-labelledby="project-skills-title">
                    <h2 id="project-skills-title" className={styles.skillsHeading}>Tecnologie principali</h2>
                    <SkillTags skills={metadata.competenze} />
                </section>
            )}

            {metadata?.backend && (
                <section className={styles.skillsGrid} aria-label="Competenze tecniche">
                    {SKILL_CATEGORIES.map(({ key, title }) => (
                        <SkillGroup key={key} title={title} skills={metadata[key]} />
                    ))}
                </section>
            )}

            <MarkdownContent
                className={styles.markdownContent}
                contentHTML={contentHTML}
            />
            <Footer/>
        </article>
    );
}

function SkillGroup({ title, skills }: { title: string; skills?: string[] }) {
    if (!skills?.length) return null;

    return (
        <div className={styles.skillGroup}>
            <h2 className={styles.skillsHeading}>{title}</h2>
            <SkillTags skills={skills} />
        </div>
    );
}
