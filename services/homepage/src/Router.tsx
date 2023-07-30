import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Nav from "src/components/ui/Nav";

import { LandingPage } from "./pages/LandingPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Nav />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
    ],
  },
]);

export default function App(): React.ReactElement {
  return <RouterProvider router={router} />;
}
