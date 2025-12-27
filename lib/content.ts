// lib/content.ts
import path from 'path';
import FusionCollection from "fusionable/FusionCollection";
import showdown from 'showdown';

const converter = new showdown.Converter({
    headerLevelStart: 2,
    noHeaderId: true,
});

export async function getContentData(type: 'lavoro' | 'blog' | 'progetti' | 'about', slug: string) {
    const folderPath = path.join(process.cwd(), 'content', type);
    const collection = new FusionCollection().loadFromDir(folderPath);
    const item = collection.getOneBySlug(slug);

    if (!item) return null;

    const data = item.getItem();
    return {
        metadata: data.fields,
        contentHTML: converter.makeHtml(data.content)
    };
}