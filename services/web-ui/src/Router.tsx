import React, { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Nav from "src/components/ui/Nav";
import { ChatPage } from "src/pages/ChatPage";

import { NavigationTrackingProvider } from "./core/tracking/NavigationTrackingProvider";
import { BlogPostPage } from "./pages/BlogPostPage";
import { ConnectionsPage } from "./pages/ConnectionsPage";
import { CurrentOrganizationPage } from "./pages/CurrentOrganizationPage";
import { CurrentProfilePage } from "./pages/CurrentProfilePage";
import { JournalPage } from "./pages/JournalPage";
import { LoadingPage } from "./pages/LoadingPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { OrganizationListPage } from "./pages/OrganizationListPage";
import { ProfileGuard } from "./pages/ProfileGuard";
import { ProfilePage } from "./pages/ProfilePage";
import { SettingsPage } from "./pages/SettingsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <NavigationTrackingProvider>
          <Nav />
        </NavigationTrackingProvider>
      </Suspense>
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
        element: <CurrentOrganizationPage />,
      },
      {
        path: "/group/list",
        element: <OrganizationListPage />,
      },
      {
        path: "/journal",
        element: <JournalPage />,
      },
      {
        path: "/profile",
        element: <CurrentProfilePage />,
      },
      {
        path: "/profile/:id",
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
