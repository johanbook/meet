import { ReactElement } from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router";

import { Card, Container } from "@mui/material";

import { LogIn } from "./pages/LogIn";
import { ResetPassword } from "./pages/ResetPassword";
import { SignUp } from "./pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Container
        disableGutters
        maxWidth="sm"
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Card sx={{ m: 8, p: 4 }}>
          <Outlet />
        </Card>
      </Container>
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
        path: "",
        element: <LogIn />,
      },
    ],
  },
]);

export function Router(): ReactElement {
  return <RouterProvider router={router} />;
}
