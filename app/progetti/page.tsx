import { getProgetti } from "@/lib/data";
import Link from "next/link";
import styles from "../Home.module.css";
import DataSection from "@/components/layout/DataSection";

export default function ProgettiPage() {
  const progetti = getProgetti();

  return (
    <main className={styles.container}>
      <DataSection title="Progetti" items={progetti} basePath="progetti" />
    </main>
  );
}
