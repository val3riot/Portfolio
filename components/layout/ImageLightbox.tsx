'use client';

import { MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import styles from './ImageLightbox.module.css';

interface ImageLightboxProps {
    src: string;
    alt: string;
    zoom: number;
    minZoom: number;
    maxZoom: number;
    onClose: () => void;
    onZoomIn: () => void;
    onZoomOut: () => void;
    onResetZoom: () => void;
}

export default function ImageLightbox({
    src,
    alt,
    zoom,
    minZoom,
    maxZoom,
    onClose,
    onZoomIn,
    onZoomOut,
    onResetZoom,
}: ImageLightboxProps) {
    const closeFromBackdrop = (event: MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) onClose();
    };

    return createPortal(
        <div className={styles.backdrop} role="dialog" aria-modal="true" aria-label={alt || 'Immagine ingrandita'}>
            <div className={styles.toolbar}>
                <button className={styles.button} type="button" onClick={onZoomOut} disabled={zoom <= minZoom} aria-label="Riduci zoom">−</button>
                <span className={styles.zoomValue}>{Math.round(zoom * 100)}%</span>
                <button className={styles.button} type="button" onClick={onZoomIn} disabled={zoom >= maxZoom} aria-label="Aumenta zoom">+</button>
                <button className={styles.button} type="button" onClick={onResetZoom} aria-label="Ripristina zoom">↺</button>
                <button autoFocus className={`${styles.button} ${styles.closeButton}`} type="button" onClick={onClose} aria-label="Chiudi immagine">×</button>
            </div>
            <div className={styles.viewport} onClick={closeFromBackdrop}>
                <div className={styles.imageWrapper} onClick={closeFromBackdrop}>
                    {/* The source and intrinsic dimensions come from rendered Markdown. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className={styles.image} src={src} alt={alt} style={{ width: `${zoom * 100}%` }} />
                </div>
            </div>
        </div>,
        document.body,
    );
}
