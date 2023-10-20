import React, { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Nav from "src/components/ui/Nav";
import { GlobalDialogProvider } from "src/core/dialog";
import { NavigationTrackingProvider } from "src/core/tracking/NavigationTrackingProvider";
import { BlogPostPage } from "src/pages/BlogPostPage";
import { ChatPage } from "src/pages/ChatPage";
import { ConnectionsPage } from "src/pages/ConnectionsPage";
import { CurrentOrganizationPage } from "src/pages/CurrentOrganizationPage";
import { CurrentProfilePage } from "src/pages/CurrentProfilePage";
import { JournalPage } from "src/pages/JournalPage";
import { NotFoundPage } from "src/pages/NotFoundPage";
import { OrganizationListPage } from "src/pages/OrganizationListPage";
import { ProfileGuard } from "src/pages/ProfileGuard";
import { ProfilePage } from "src/pages/ProfilePage";
import { SettingsPage } from "src/pages/SettingsPage";
import { LoadingView } from "src/views/LoadingView";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingView />}>
        <NavigationTrackingProvider>
          <GlobalDialogProvider>
            <Nav />
          </GlobalDialogProvider>
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
