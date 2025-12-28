import Link from "next/link";
import styles from '../Home.module.css'
import { getLavori } from "@/lib/data";
import DataSection from "@/components/layout/DataSection";

export default function LavoroPage() {
    const lavori = getLavori();
    return (
        <main className={styles.container}>
            <DataSection title="Esperienze" items={lavori} basePath="lavoro" />
        </main>
    )
}