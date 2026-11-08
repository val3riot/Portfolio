import styles from '../Home.module.css'
import { getLavori } from "@/lib/data";
import DataSection from "@/components/layout/DataSection";

export const metadata = { title: "Esperienze" };

export default function LavoroPage() {
    const lavori = getLavori();
    return (
        <main className={styles.container}>
            <DataSection heading="h1" title="Esperienze" items={lavori} basePath="lavoro" />
        </main>
    )
}
