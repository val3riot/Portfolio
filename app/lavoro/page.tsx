import Link from "next/link";
import styles from '../Home.module.css'
import { getLavori } from "@/lib/data";

export default function LavoroPage() {
    const lavori = getLavori();
    return (
        <main className={styles.container}>
            <section className={styles.section} style={{ borderTop: 'none' }}>
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
        </main>
    )
}