import styles from './SkillTags.module.css';

interface SkillTagsProps {
    skills: string[];
    compact?: boolean;
    label?: string;
}

export default function SkillTags({ skills, compact = false, label = 'Competenze' }: SkillTagsProps) {
    if (skills.length === 0) return null;

    return (
        <ul className={`${styles.list} ${compact ? styles.compact : ''}`} aria-label={label}>
            {skills.map((skill) => (
                <li key={skill} className={styles.tag}>{skill}</li>
            ))}
        </ul>
    );
}
