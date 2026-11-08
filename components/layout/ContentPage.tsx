import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getContentData, type DetailContentType } from '@/lib/content';
import ContentLayout from './ContentLayout';

export interface ContentPageProps {
    params: Promise<{ slug: string }>;
}

function requireContent(type: DetailContentType, slug: string) {
    const data = getContentData(type, slug);
    if (!data) notFound();
    return data;
}

export async function getContentMetadata(type: DetailContentType, { params }: ContentPageProps): Promise<Metadata> {
    const { slug } = await params;
    const { metadata } = requireContent(type, slug);
    return { title: metadata.title, description: metadata.descrizione };
}

export default async function ContentPage({ type, params }: ContentPageProps & { type: DetailContentType }) {
    const { slug } = await params;
    const { metadata, contentHTML } = requireContent(type, slug);
    return (
        <ContentLayout
            title={metadata.title}
            date={metadata.periodo_totale}
            contentHTML={contentHTML}
            metadata={metadata}
        />
    );
}
