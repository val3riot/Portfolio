export const SKILL_CATEGORIES = [
    { key: 'backend', title: 'Backend & Integration' },
    { key: 'frontend', title: 'Frontend' },
    { key: 'database', title: 'Database & Persistence' },
    { key: 'tools', title: 'Development & Tooling' },
    { key: 'networking', title: 'Linux, Infrastructure & Networking' },
] as const;

export type SkillCategory = typeof SKILL_CATEGORIES[number]['key'];
export type SkillMetadata = Partial<Record<SkillCategory, string[]>>;
