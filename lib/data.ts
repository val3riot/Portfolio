import FusionCollection from "fusionable/FusionCollection";

export function getProgetti() {
    return new FusionCollection()
        .loadFromDir('content/progetti')
        .orderBy('date', 'desc')
        .getItemsArray();
}

export function getLavori() {
    return new FusionCollection()
        .loadFromDir('content/lavoro')
        .orderBy('date', 'desc')
        .getItemsArray();
}

export function getSkills() {
    return new FusionCollection()
        .loadFromDir('content/about')
        .orderBy('date', 'desc')
        .getItemsArray();
}
export function getFormazione() {
    const collection = new FusionCollection()
        .loadFromDir('content/formazione')
        .orderBy('date', 'desc');
    return collection.getItemsArray();
}