import React from "react";

// Auth
import Login from "./Pages/Auth/Login";
// Home
import HomeIndex from "./Pages/Home/Index";

// Anime
import AnimeIndex from "./Pages/Anime/AnimeIndex";

// Story
import StoryIndex from "./Pages/Story/StoryIndex";
import StoryAdd from "./Pages/Story/StoryAdd";
import StoryEdit from "./Pages/Story/StoryEdit";
import Story from "./Pages/Story/Story";

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
        path: "/story",
        name: "Story",
        icon: "fas fa-pen",
        desc: "Make your stories!",
        layout: "/admin",
        isSidemenu: true,
        component: StoryIndex
    },
    {
        path: "/story/add",
        name: "Create Story",
        icon: "fas fa-pen",
        desc: "Make your stories!",
        layout: "/admin",
        isSidemenu: false,
        component: StoryAdd
    },
    {
        path: "/story/:id",
        name: "Story Detail",
        icon: "fas fa-pen",
        desc: "Make your stories!",
        layout: "/admin",
        isSidemenu: false,
        component: Story
    },
    {
        path: "/story/edit/:id",
        name: "Story Edit",
        icon: "fas fa-pen",
        desc: "Make your stories!",
        layout: "/admin",
        isSidemenu: false,
        component: StoryEdit
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
    },

    {
        path: "/login",
        name: "Login",
        icon: "-",
        desc: "-",
        layout: "/auth",
        isSidemenu: false,
        component: Login
    },
]

export default routes;