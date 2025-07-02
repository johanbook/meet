import { ReactElement } from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router";

import { Nav } from "./components/nav";
import { LogIn } from "./pages/LogIn";
import { LogOut } from "./pages/LogOut";
import { NotFound } from "./pages/NotFound";
import { ResetPassword } from "./pages/ResetPassword";
import { SignUp } from "./pages/SignUp";
import { VerifyEmail } from "./pages/VerifyEmail";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Nav>
        <Outlet />
      </Nav>
    ),
    errorElement: (
      <Nav>
        <NotFound />
      </Nav>
    ),
    children: [
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "verify-email",
        element: <VerifyEmail />,
      },
      {
        path: "",
        element: <LogIn />,
      },
    ],
  },
  {
    path: "/logout",
    element: <LogOut />,
  },
]);

export function Router(): ReactElement {
  return <RouterProvider router={router} />;
}
