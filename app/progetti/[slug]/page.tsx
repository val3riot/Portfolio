import { getContentData } from "@/lib/content";
import ContentLayout from "@/components/layout/ContentLayout";

export default async function ProgettiPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const data = await getContentData('progetti', slug);

    if (!data) return <div>404 - Progetto non trovato</div>;

    return (
        <ContentLayout 
            title={data.metadata.title} 
            date={data.metadata.periodo_totale} 
            contentHTML={data.contentHTML} 
        />
    );
}