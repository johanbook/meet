import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Nav from "src/components/ui/Nav";
import { ChatPage } from "src/pages/ChatPage";

import { NavigationTrackingProvider } from "./core/tracking/NavigationTrackingProvider";
import { JournalPage } from "./pages/JournalPage";
import { MatchesPage } from "./pages/MatchesPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProfileGuard } from "./pages/ProfileGuard";
import { ProfilePage } from "./pages/ProfilePage";
import { SettingsPage } from "./pages/SettingsPage";
import { SwipingPage } from "./pages/SwipingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <NavigationTrackingProvider>
        <Nav />
      </NavigationTrackingProvider>
    ),
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <SwipingPage />,
      },
      {
        path: "/chat",
        element: <MatchesPage />,
      },
      {
        path: "/chat/:id",
        element: <ChatPage />,
      },
      {
        path: "/journal",
        element: <JournalPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/settings",
        element: <SettingsPage />,
      },
    ],
  },
]);

export function Router(): React.ReactElement {
  return (
    <ProfileGuard>
      <RouterProvider router={router} />
    </ProfileGuard>
  );
}
