import { getContentItems } from '@/lib/content';
import ContentPage, { getContentMetadata, type ContentPageProps } from '@/components/layout/ContentPage';

export const dynamicParams = false;

export function generateStaticParams() {
    return getContentItems('progetti').map((item) => ({ slug: item.fields.slug }));
}

export function generateMetadata(props: ContentPageProps) {
    return getContentMetadata('progetti', props);
}

export default function Page({ params }: ContentPageProps) {
    return <ContentPage type="progetti" params={params} />;
}
