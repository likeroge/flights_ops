import { createBrowserRouter } from "react-router";
import App from "./App";
import { Flight2Page } from "./pages/flights/Flight2Page";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/flights",
    Component: Flight2Page,
  },
]);
