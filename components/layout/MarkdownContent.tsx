'use client';

import { useRef } from 'react';
import { useImageLightbox } from '@/hooks/useImageLightbox';
import ImageLightbox from './ImageLightbox';

interface MarkdownContentProps {
    className: string;
    contentHTML: string;
}

export default function MarkdownContent({ className, contentHTML }: MarkdownContentProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const lightbox = useImageLightbox(containerRef);

    return (
        <>
            <div
                ref={containerRef}
                className={className}
                dangerouslySetInnerHTML={{ __html: contentHTML }}
            />
            {lightbox.image && (
                <ImageLightbox
                    src={lightbox.image.src}
                    alt={lightbox.image.alt}
                    zoom={lightbox.zoom}
                    minZoom={lightbox.minZoom}
                    maxZoom={lightbox.maxZoom}
                    onClose={lightbox.close}
                    onZoomIn={lightbox.zoomIn}
                    onZoomOut={lightbox.zoomOut}
                    onResetZoom={lightbox.resetZoom}
                />
            )}
        </>
    );
}
