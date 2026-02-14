import type {Movie} from "@/app/api/type.ts";

export const getRandomSubset = (arr: Movie[], count: number) => {
    const copy = [...arr];
    const selected = [];
    while (selected.length < count && copy.length > 0) {
        const index = Math.floor(Math.random() * copy.length);
        selected.push(copy.splice(index, 1)[0]);
    }
    return selected;
};