import { createBrowserRouter } from "react-router";
import Root from "../components/Layouts/Root";
import Home from "../Pages/Home/Home";
import Movies from "../Pages/Movies/Movies";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/movies",
        Component: Movies,
      }
    ]
  },
]);