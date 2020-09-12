import React from "react";
// Home
import HomeIndex from "./Pages/Home/Index";

// Anime
import AnimeIndex from "./Pages/Anime/AnimeIndex";

export interface Route {
    path: string,
    name: string,
    icon: string,
    desc: string,
    component: any,
    layout: string,
    isSidemenu: boolean,
}

const routes: Route[] = [
    {
        path: "/home",
        name: "Home",
        icon: "fas fa-home",
        desc: "Go to main page",
        layout: "/admin",
        isSidemenu: true,
        component: HomeIndex
    },
    {
        path: "/blog",
        name: "Blog",
        icon: "fas fa-pen",
        desc: "Make new article for your blog",
        layout: "/admin",
        isSidemenu: true,
        component: HomeIndex
    },
    {
        path: "/anime",
        name: "Anime",
        icon: "fas fa-fire",
        desc: "Update your anime download links",
        layout: "/admin",
        isSidemenu: true,
        component: AnimeIndex
    },
    {
        path: "/schedule",
        name: "Schedule",
        icon: "fas fa-calendar",
        desc: "Set releases date for animes or articles",
        layout: "/admin",
        isSidemenu: true,
        component: HomeIndex
    },
    {
        path: "/songs",
        name: "Songs",
        icon: "fas fa-music",
        desc: "Set download links for albums or songs",
        layout: "/admin",
        isSidemenu: true,
        component: HomeIndex
    },
    
    {
        path: "/about",
        name: "About",
        icon: "fas fa-question-circle",
        desc: "Set FAQ and Teams of your site",
        layout: "/admin",
        isSidemenu: true,
        component: HomeIndex
    }
]

export default routes;