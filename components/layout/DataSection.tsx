import Link from "next/link";
import styles from "../../app/Home.module.css";
import SkillTags from "@/components/skills/SkillTags";

import type { ContentItem } from '@/lib/content';

interface DataSectionProps {
    title: string;
    heading?: 'h1' | 'h2';
    items: ContentItem[];
    basePath?: string;
}

const DataSection = ({ title, heading: Heading = 'h2', items, basePath }: DataSectionProps) => {
    const ItemHeading = Heading === 'h1' ? 'h2' : 'h3';
    return (
        <section className={styles.section}>
            <Heading className={styles.sectionTitle}>{title}</Heading>
            <div className="flex flex-col gap-8">
                {items.map((item) => {
                    const id = item.fields.slug;
                    const mainTitle = item.fields.azienda || item.fields.title;

                    const content = (
                        <>
                            <div className="flex justify-between items-baseline">
                                <ItemHeading className={`${basePath ? styles["is-clickable"] : ""} font-medium`}>
                                    {mainTitle}
                                    {basePath && <span className={styles.arrowIcon}> &gt;</span>}
                                </ItemHeading>
                                <span className="text-sm text-muted tabular-nums">{item.fields.periodo}</span>
                            </div>

                            {item.fields.istituto && (
                                <p className="text-muted-foreground text-sm">{item.fields.istituto}</p>
                            )}

                            {item.fields.ruolo && (
                                <h4 className="text-muted-foreground font-normal text-sm md:text-base">
                                    {item.fields.ruolo}
                                </h4>
                            )}

                            {item.fields.competenze && (
                                <div className="mt-3">
                                    <SkillTags skills={item.fields.competenze} compact label={`Competenze ${mainTitle ?? ''}`} />
                                </div>
                            )}
                        </>
                    );

                    return (
                        <div key={id} className="group">
                            {basePath ? (
                                <Link href={`/${basePath}/${item.fields.slug}`} className="block group">
                                    {content}
                                </Link>
                            ) : (
                                content
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default DataSection;
