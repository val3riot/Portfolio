'use client';

import { useRef } from 'react';
import { useOpenMarkdownImages } from '@/hooks/useOpenMarkdownImages';

interface MarkdownContentProps {
    className: string;
    contentHTML: string;
}

export default function MarkdownContent({ className, contentHTML }: MarkdownContentProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    useOpenMarkdownImages(containerRef);

    return (
        <div
            ref={containerRef}
            className={className}
            dangerouslySetInnerHTML={{ __html: contentHTML }}
        />
    );
}
