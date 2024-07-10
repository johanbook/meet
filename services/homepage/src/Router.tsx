import React from "react";
import { RouterProvider, createHashRouter } from "react-router-dom";

import Nav from "src/components/ui/Nav";

import { LandingPage } from "./pages/LandingPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage/PrivacyPolicyPage";

const router = createHashRouter([
  {
    path: "/",
    element: <Nav />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "/privacy",
        element: <PrivacyPolicyPage />,
      },
    ],
  },
]);

export default function App(): React.ReactElement {
  return <RouterProvider router={router} />;
}
