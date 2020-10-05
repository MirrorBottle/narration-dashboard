import { ValueType, OptionsType } from "react-select/src/types";

export type SelectType = ValueType<{
    label: string;
    value: string;
}>;
export interface ShortAnime {
    id: number;
    name: string;
    knownAs: string;
    slug: string;
    cover: string;
    lastUpdated: string;
    description: string;
    rate: string;
}

export interface ShortStory {
    id: number;
    title: string;
    plot: string | null;
    lastUpdated: string;
    tags: string[];
    tagIds: number[];
    serieId: number;
    serie: string | null;
    status: number;
}

export interface FullStory extends ShortStory {
    cover: string | null;
    content: string;
    slug: string;
    useSerieCover: boolean;
}

export const EmptyFullStory: FullStory = {
    id: 0,
    title: "",
    plot: "",
    lastUpdated: "",
    tags: [""],
    tagIds: [0],
    serie: null,
    serieId: 0,
    cover: null,
    content: "",
    slug: "",
    status: 0,
    useSerieCover: false
}
export interface StorySeriesForm {
    name: string;
    description: string;
    series_cover: string;
    status: number;
}
export interface StoryTagForm {
    name: string;
    description: string;
}
export interface StoryForm {
    title: string,
    content: string,
    plot: string | null,
    tags: number[],
    serie: number,
    status: number,
    cover: string,
    useSerieCover: boolean,
    [key:string] : any,
}
export const StoryStatus = [
    {
        label: "Finish",
        value: 1
    },
    {
        label: "Ongoing",
        value: 2
    },
    {
        label: "Draft",
        value: 3
    },
    {
        label: "Drop",
        value: 4
    }
]
const colors = ["purple", "yellow", "gray", "red"];
export const StoryStatusWithColor = StoryStatus.map((status) => ({...status, color: colors[status.value - 1]}))