import { ReactElement } from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router";

import { Nav } from "./components/nav";
import { AuthGuard } from "./guards";
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
      <AuthGuard>
        <Nav>
          <Outlet />
        </Nav>
      </AuthGuard>
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
    path: "/login/logout",
    element: <LogOut />,
  },
]);

export function Router(): ReactElement {
  return <RouterProvider router={router} />;
}
