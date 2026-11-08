import { getProgetti } from "@/lib/data";
import styles from "../Home.module.css";
import DataSection from "@/components/layout/DataSection";

export const metadata = { title: "Progetti" };

export default function ProgettiPage() {
  const progetti = getProgetti();

  return (
    <main className={styles.container}>
      <DataSection heading="h1" title="Progetti" items={progetti} basePath="progetti" />
    </main>
  );
}
