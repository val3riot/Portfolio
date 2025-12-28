import { getContentData } from "@/lib/content";
import ContentLayout from "@/components/layout/ContentLayout";
import { getProgetti } from "@/lib/data"; 

export async function generateStaticParams() {
    const progetti = getProgetti();
    
    return progetti.map((progetto) => ({
        slug: progetto.fields.slug,
    }));
}
export default async function ProgettiPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const data = await getContentData('progetti', slug);

    if (!data) return <div>404 - Pagina non trovata</div>;

    return (
        <ContentLayout 
            title={data.metadata.title} 
            date={data.metadata.periodo_totale} 
            contentHTML={data.contentHTML} 
        />
    );
}