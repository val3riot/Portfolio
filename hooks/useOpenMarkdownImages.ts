'use client';

import { RefObject, useEffect } from 'react';

export function useOpenMarkdownImages(containerRef: RefObject<HTMLElement | null>) {
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const images = Array.from(container.querySelectorAll('img'));

        const openImage = (image: HTMLImageElement) => {
            window.open(image.currentSrc || image.src, '_blank', 'noopener,noreferrer');
        };

        const handleClick = (event: MouseEvent) => {
            const target = event.target;
            if (target instanceof HTMLImageElement) openImage(target);
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            const target = event.target;
            if (target instanceof HTMLImageElement && (event.key === 'Enter' || event.key === ' ')) {
                event.preventDefault();
                openImage(target);
            }
        };

        images.forEach((image) => {
            image.tabIndex = 0;
            image.setAttribute('role', 'button');
            image.setAttribute('title', 'Apri immagine');
            image.style.cursor = 'zoom-in';
        });

        container.addEventListener('click', handleClick);
        container.addEventListener('keydown', handleKeyDown);

        return () => {
            container.removeEventListener('click', handleClick);
            container.removeEventListener('keydown', handleKeyDown);
        };
    }, [containerRef]);
}
