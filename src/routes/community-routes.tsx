
import { RouteObject } from "react-router-dom";
import Community from "@/pages/Community";
import PostDetail from "@/components/community/PostDetail";
import Groups from "@/pages/Groups";
import Resources from "@/pages/Resources";
import GroupPage from "@/pages/GroupPage";
import ErrorBoundary from "@/components/error/ErrorBoundary";

export const communityRoutes: RouteObject[] = [
  {
    path: "/community",
    element: (
      <ErrorBoundary>
        <Community />
      </ErrorBoundary>
    ),
  },
  {
    path: "/community/post/:id",
    element: (
      <ErrorBoundary>
        <PostDetail />
      </ErrorBoundary>
    ),
  },
  {
    path: "/community/groups",
    element: (
      <ErrorBoundary>
        <Groups />
      </ErrorBoundary>
    ),
  },
  {
    path: "/community/groups/:id",
    element: (
      <ErrorBoundary>
        <GroupPage />
      </ErrorBoundary>
    ),
  },
  {
    path: "/community/resources",
    element: (
      <ErrorBoundary>
        <Resources />
      </ErrorBoundary>
    ),
  },
  {
    path: "/community/topic/:topic",
    element: (
      <ErrorBoundary>
        <Community />
      </ErrorBoundary>
    ),
  },
  {
    path: "/community/category/:category",
    element: (
      <ErrorBoundary>
        <Community />
      </ErrorBoundary>
    ),
  },
  {
    path: "/community/resource/:resource",
    element: (
      <ErrorBoundary>
        <Community />
      </ErrorBoundary>
    ),
  },
];
