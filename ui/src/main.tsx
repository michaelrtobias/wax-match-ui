import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/index";
import { Dashboard, Home, Collection, Matcher, DiscogsAuth } from "./views";
import ErrorPage from "./error-page";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "collection",
        element: <Collection />,
      },
      {
        path: "matcher",
        element: <Matcher />,
      },
      {
        path: "discogs",
        children: [
          {
            path: "auth",
            element: <DiscogsAuth />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
