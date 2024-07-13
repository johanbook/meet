import { ReactElement, Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Nav } from "src/components/nav";
import { GlobalDialogProvider } from "src/core/dialog";
import { NavigationTrackingProvider } from "src/core/tracking/NavigationTrackingProvider";
import { BlogPostListPage } from "src/features/blogs/pages/BlogPostListPage";
import { BlogPostPage } from "src/features/blogs/pages/BlogPostPage";
import { ChatListPage } from "src/features/chat/pages/ChatListPage";
import { ChatPage } from "src/features/chat/pages/ChatPage";
import { CreateChatPage } from "src/features/chat/pages/CreateChatPage";
import { CreateOrganizationPage } from "src/pages/CreateOrganizationPage";
import { CurrentOrganizationPage } from "src/pages/CurrentOrganizationPage";
import { CurrentProfilePage } from "src/pages/CurrentProfilePage";
import { NotFoundPage } from "src/pages/NotFoundPage";
import { OrganizationJournalPage } from "src/pages/OrganizationJournalPage";
import { OrganizationListPage } from "src/pages/OrganizationListPage";
import { ProfileGuard } from "src/pages/ProfileGuard";
import { ProfileJournalPage } from "src/pages/ProfileJournalPage";
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
        element: <BlogPostListPage />,
      },
      {
        path: "/blog/:id",
        element: <BlogPostPage />,
      },
      {
        path: "/chat",
        element: <ChatListPage />,
      },
      {
        path: "/chat/create",
        element: <CreateChatPage />,
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
        path: "/group/create",
        element: <CreateOrganizationPage />,
      },
      {
        path: "/group/journal",
        element: <OrganizationJournalPage />,
      },
      {
        path: "/group/list",
        element: <OrganizationListPage />,
      },
      {
        path: "/profile",
        element: <CurrentProfilePage />,
      },
      {
        path: "/profile/appearence",
        element: <SettingsPage />,
      },
      {
        path: "/profile/journal",
        element: <ProfileJournalPage />,
      },
      {
        path: "/profile/settings",
        element: <SettingsPage />,
      },
      {
        path: "/profile/:id",
        element: <ProfilePage />,
      },
    ],
  },
]);

export function Router(): ReactElement {
  return (
    <ProfileGuard>
      <RouterProvider router={router} />
    </ProfileGuard>
  );
}
