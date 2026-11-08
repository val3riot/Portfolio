import { getContentItems } from '@/lib/content';
import ContentPage, { getContentMetadata, type ContentPageProps } from '@/components/layout/ContentPage';

export const dynamicParams = false;

export function generateStaticParams() {
    return getContentItems('about').map((item) => ({ slug: item.fields.slug }));
}

export function generateMetadata(props: ContentPageProps) {
    return getContentMetadata('about', props);
}

export default function Page({ params }: ContentPageProps) {
    return <ContentPage type="about" params={params} />;
}
