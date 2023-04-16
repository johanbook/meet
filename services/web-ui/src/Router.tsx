import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Nav from "src/components/ui/Nav";
import ChatPage from "src/pages/ChatPage";
import ProfilePage from "src/pages/ProfilePage";
import SwipingPage from "src/pages/SwipingPage";

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
