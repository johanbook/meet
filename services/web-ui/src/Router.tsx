import ChatPage from "pages/ChatPage";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Nav from "./components/ui/Nav";
import ProfilePage from "./pages/ProfilePage";
import SwipingPage from "./pages/SwipingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Nav />,
    children: [
      {
        path: "/",
        element: <SwipingPage />,
      },
      {
        path: "/chat",
        element: <ChatPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

export default function App(): React.ReactElement {
  return <RouterProvider router={router} />;
}
