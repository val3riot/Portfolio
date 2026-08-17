import styles from './ContentLayout.module.css';
import Footer from './footer';
import MarkdownContent from './MarkdownContent';

interface ContentMetadata {
    backend?: string[];
    networking?: string[];
    frontend?: string[];
    database?: string[];
    tools?: string[];
}

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

            {metadata?.backend && (
                <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted mb-3">Backend Stack</h4>
                        <p className="text-sm leading-relaxed">{metadata.backend.join(', ')}</p>
                    </div>
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted mb-3">Infrastructure & Networking</h4>
                        <p className="text-sm leading-relaxed">{metadata.networking?.join(', ')}</p>
                    </div>
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted mb-3">Frontend</h4>
                        <p className="text-sm leading-relaxed">{metadata.frontend?.join(', ')}</p>
                    </div>
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted mb-3">Databases & Tools</h4>
                        <p className="text-sm leading-relaxed">{[...(metadata.database || []), ...(metadata.tools || [])].join(', ')}</p>
                    </div>
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
