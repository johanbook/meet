import React from "react";
import { RouterProvider, createHashRouter } from "react-router-dom";

import Nav from "src/components/ui/Nav";

import { LandingPage } from "./pages/LandingPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";

const router = createHashRouter([
  {
    path: "/",
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
  return (
    <Nav>
      <RouterProvider router={router} />{" "}
    </Nav>
  );
}
