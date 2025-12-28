import { getProgetti } from "@/lib/data";
import Link from "next/link";
import styles from '../Home.module.css'

export default function ProgettiPage() {
    const progetti = getProgetti();

    return (
        <main className={styles.container}>
            <section className={styles.section} style={{ borderTop: 'none' }}>
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
        </main>
    )

}