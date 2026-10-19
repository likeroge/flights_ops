import { createBrowserRouter } from "react-router";
import App from "./App";
import { Flights } from "./pages/flights/Flights";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/flights",
    Component: Flights,
  },
]);
