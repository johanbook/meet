import { ReactElement } from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router";

import { GlobalDialogProvider } from "src/core/dialog";
import { NavigationTrackingProvider } from "src/core/tracking/NavigationTrackingProvider";
import { BlogPhotoListPage } from "src/features/blogs/pages/BlogPhotoListPage";
import { BlogPostListPage } from "src/features/blogs/pages/BlogPostListPage";
import { BlogPostPage } from "src/features/blogs/pages/BlogPostPage";
import { CreateBlogPostPage } from "src/features/blogs/pages/CreateBlogPostPage";
import { ChatListPage } from "src/features/chat/pages/ChatListPage";
import { ChatPage } from "src/features/chat/pages/ChatPage";
import { CreateChatPage } from "src/features/chat/pages/CreateChatPage";
import { AppearancePage } from "src/features/settings/pages/AppearancePage";
import { SettingsPage } from "src/features/settings/pages/SettingsPage";
import { CreateOrganizationPage } from "src/pages/CreateOrganizationPage";
import { CurrentOrganizationPage } from "src/pages/CurrentOrganizationPage";
import { CurrentProfilePage } from "src/pages/CurrentProfilePage";
import { NotFoundPage } from "src/pages/NotFoundPage";
import { OrganizationJournalPage } from "src/pages/OrganizationJournalPage";
import { OrganizationListPage } from "src/pages/OrganizationListPage";
import { ProfileGuard } from "src/pages/ProfileGuard";
import { ProfileJournalPage } from "src/pages/ProfileJournalPage";
import { ProfilePage } from "src/pages/ProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <NavigationTrackingProvider>
        <GlobalDialogProvider>
          <Outlet />
        </GlobalDialogProvider>
      </NavigationTrackingProvider>
    ),
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <BlogPostListPage />,
      },
      {
        path: "/blog/create",
        element: <CreateBlogPostPage />,
      },
      {
        path: "/blog/photos",
        element: <BlogPhotoListPage />,
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
        element: <AppearancePage />,
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
