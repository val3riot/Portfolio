'use client';

import { RefObject, useCallback, useEffect, useState } from 'react';

interface LightboxImage {
    src: string;
    alt: string;
}

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.25;

export function useImageLightbox(containerRef: RefObject<HTMLElement | null>) {
    const [image, setImage] = useState<LightboxImage | null>(null);
    const [zoom, setZoom] = useState(1);

    const close = useCallback(() => {
        setImage(null);
        setZoom(1);
    }, []);

    const zoomIn = useCallback(() => {
        setZoom((current) => Math.min(MAX_ZOOM, current + ZOOM_STEP));
    }, []);

    const zoomOut = useCallback(() => {
        setZoom((current) => Math.max(MIN_ZOOM, current - ZOOM_STEP));
    }, []);

    const resetZoom = useCallback(() => setZoom(1), []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const images = Array.from(container.querySelectorAll('img'));
        const openImage = (target: HTMLImageElement) => {
            setImage({ src: target.currentSrc || target.src, alt: target.alt });
            setZoom(1);
        };

        const handleClick = (event: MouseEvent) => {
            if (event.target instanceof HTMLImageElement) openImage(event.target);
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.target instanceof HTMLImageElement && (event.key === 'Enter' || event.key === ' ')) {
                event.preventDefault();
                openImage(event.target);
            }
        };

        images.forEach((item) => {
            item.tabIndex = 0;
            item.setAttribute('role', 'button');
            item.setAttribute('title', 'Ingrandisci immagine');
            item.style.cursor = 'zoom-in';
        });

        container.addEventListener('click', handleClick);
        container.addEventListener('keydown', handleKeyDown);

        return () => {
            container.removeEventListener('click', handleClick);
            container.removeEventListener('keydown', handleKeyDown);
        };
    }, [containerRef]);

    useEffect(() => {
        if (!image) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') close();
            if (event.key === '+' || event.key === '=') zoomIn();
            if (event.key === '-') zoomOut();
            if (event.key === '0') resetZoom();
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [close, image, resetZoom, zoomIn, zoomOut]);

    return { image, zoom, close, zoomIn, zoomOut, resetZoom, minZoom: MIN_ZOOM, maxZoom: MAX_ZOOM };
}
