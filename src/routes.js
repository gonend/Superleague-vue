import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage")
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage")
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage")
  },
  {
    path: "/favoriteGames",
    name: "favoriteGames",
    component: () => import("./pages/FavoriteGamesPage")
  },
  {
    path: "/currentRound",
    name: "currentRound",
    component: () => import("./pages/CurrentRoundPage")
  },
  {
    path: "/manage",
    name: "manage",
    component: () => import("./pages/ManagePage")
  },
  {
    path: "/team",
    name: "team",
    component: () => import("./pages/TeamPage"),
    props: route => ({ teamId: route.query.teamId })
  },
  {
    path: "/player",
    name: "player",
    component: () => import("./pages/PlayerPage"),
    props: route => ({ playerId: route.query.playerId })
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound
  }
];

export default routes;
