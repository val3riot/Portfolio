import Link from "next/link";
import styles from "../../app/Home.module.css";

interface DataItem {
    fields: {
        slug?: string;
        azienda?: string;
        title?: string;
        ruolo?: string;
        periodo: string;
        competenze?: string[];
        istituto?: string;
    };
}

interface DataSectionProps {
    title: string;
    items: DataItem[];
    basePath?: string; 
}

const DataSection = ({ title, items, basePath }: DataSectionProps) => {
    return (
        <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{title}</h2>
            <div className="flex flex-col gap-8">
                {items.map((item) => {
                    const id = item.fields.slug || item.fields.title;
                    const mainTitle = item.fields.azienda || item.fields.title || item.fields.istituto;
                    const Wrapper = basePath ? Link : "div";
                    const wrapperProps = basePath ? { href: `/${basePath}/${item.fields.slug}`, className: "block group" } : { className: "group" };

                    return (
                        <div key={id} className="group">
                            <Wrapper {...wrapperProps as any}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className={`${basePath ? styles["is-clickable"] : ""} font-medium`}>
                                        {mainTitle}
                                        {basePath && <span className={styles.arrowIcon}> &gt;</span>}
                                    </h3>
                                    <span className="text-sm text-muted tabular-nums">{item.fields.periodo}</span>
                                </div>
                                
                                {item.fields.ruolo && (
                                    <h4 className="text-muted-foreground font-normal text-sm md:text-base">
                                        {item.fields.ruolo}
                                    </h4>
                                )}

                                {item.fields.competenze && (
                                    <div className="flex gap-2 mt-2">
                                        {item.fields.competenze.map((tech) => (
                                            <span key={tech} className="text-[10px] uppercase tracking-widest text-muted">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </Wrapper>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default DataSection;