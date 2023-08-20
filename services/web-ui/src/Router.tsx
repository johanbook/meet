import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Nav from "src/components/ui/Nav";
import { ChatPage } from "src/pages/ChatPage";

import { NavigationTrackingProvider } from "./core/tracking/NavigationTrackingProvider";
import { BlogPostPage } from "./pages/BlogPostPage";
import { ConnectionsPage } from "./pages/ConnectionsPage";
import { JournalPage } from "./pages/JournalPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { OrganizationPage } from "./pages/OrganizationPage";
import { ProfileGuard } from "./pages/ProfileGuard";
import { ProfilePage } from "./pages/ProfilePage";
import { SettingsPage } from "./pages/SettingsPage";

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
        element: <BlogPostPage />,
      },
      {
        path: "/chat",
        element: <ConnectionsPage />,
      },
      {
        path: "/chat/:id",
        element: <ChatPage />,
      },
      {
        path: "/group",
        element: <OrganizationPage />,
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
