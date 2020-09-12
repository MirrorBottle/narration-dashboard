export interface Anime {
    name: string;
    rate: string;
    desc: string;
    watchHour: number;
}

const anime:Anime[] = [
    {
        name: "Eureka Seven AO",
        rate: "8",
        desc: "Something",
        watchHour: 12
    }
]

for(let i = 0; i < 101; i++) {
    anime.push({
        name: `Anime ${i}`,
        rate: Math.floor(Math.random() * 10).toString(),
        desc: `Description for Anime ${i}`,
        watchHour: i
    })
}

export default anime