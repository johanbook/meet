import { FC } from "react";
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

const Router: FC = () => {
  return (
    <Nav>
      <RouterProvider router={router} />
    </Nav>
  );
};

export default Router;
