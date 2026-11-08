import path from 'node:path';
import { cache } from 'react';
import FusionCollection from 'fusionable/FusionCollection';
import showdown from 'showdown';
import { SKILL_CATEGORIES, type SkillMetadata } from '@/constants/skills';

export type ContentType = 'lavoro' | 'progetti' | 'about' | 'formazione';
export type DetailContentType = Exclude<ContentType, 'formazione'>;

export interface ContentMetadata extends SkillMetadata {
    title: string;
    slug: string;
    date: string;
    periodo?: string;
    periodo_totale?: string;
    descrizione?: string;
    azienda?: string;
    ruolo?: string;
    istituto?: string;
    competenze?: string[];
}

export interface ContentItem {
    fields: ContentMetadata;
    content: string;
}

function parseMetadata(fields: Record<string, unknown>, type: ContentType): ContentMetadata {
    function requiredString(key: string): string {
        const value = fields[key];
        if (typeof value !== 'string' || !value.trim()) {
            throw new Error(`Contenuto ${type}: campo ${key} mancante o non valido`);
        }
        return value;
    }

    const metadata: ContentMetadata = {
        title: requiredString('title'),
        slug: requiredString('slug'),
        date: requiredString('date'),
    };
    for (const key of ['periodo', 'periodo_totale', 'descrizione', 'azienda', 'ruolo', 'istituto'] as const) {
        const value = fields[key];
        if (value === undefined) continue;
        if (typeof value !== 'string') throw new Error(`Contenuto ${type}: campo ${key} non valido`);
        metadata[key] = value;
    }
    for (const key of ['competenze', ...SKILL_CATEGORIES.map(({ key }) => key)] as const) {
        const value = fields[key];
        if (value === undefined) continue;
        if (!Array.isArray(value) || !value.every((item: unknown) => typeof item === 'string')) {
            throw new Error(`Contenuto ${type}: elenco ${key} non valido`);
        }
        metadata[key] = value;
    }
    if (type !== 'about') requiredString('periodo');
    return metadata;
}

// Reuse the same parsed collection across lists, metadata and detail rendering.
export const getContentItems = cache((type: ContentType): ContentItem[] => {
    const collection = new FusionCollection()
        .loadFromDir(path.join(process.cwd(), 'content', type))
        .orderBy('date', 'desc');
    const slugs = new Set<string>();
    return collection.getItems().map((item) => {
        const fields = parseMetadata(item.getFields(), type);
        if (slugs.has(fields.slug)) throw new Error(`Contenuto ${type}: slug duplicato ${fields.slug}`);
        slugs.add(fields.slug);
        return { fields, content: item.getContent() };
    });
});

const converter = new showdown.Converter({ headerLevelStart: 2, noHeaderId: true });

export const getContentData = cache((type: DetailContentType, slug: string) => {
    const item = getContentItems(type).find((item) => item.fields.slug === slug);
    if (!item) return null;
    return { metadata: item.fields, contentHTML: converter.makeHtml(item.content) };
});
