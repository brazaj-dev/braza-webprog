import "./assets/styles/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./layouts/Layout.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";
import HomePage from "./pages/LandingPages/HomePage.jsx";
import AboutPage from "./pages/LandingPages/AboutPage.jsx";
import ArticleListPage from "./pages/LandingPages/ArticleListPage.jsx";
import ArticlePage from "./pages/LandingPages/ArticlePage.jsx";
import SignInPage from "./pages/AuthPages/SignInPage.jsx";
import AdminSignInPage from "./pages/AuthPages/AdminSignInPage.jsx";
import SignUpPage from "./pages/AuthPages/SignUpPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import DashLayout from "./layouts/DashLayout.jsx";
import DashboardPage from "./pages/DashboardPages/DashboardPage.jsx";
import ReportsPage from "./pages/DashboardPages/ReportsPage.jsx";
import DashArticleListPage from "./pages/DashboardPages/DashArticleListPage.jsx";
import UsersPage from "./pages/DashboardPages/UsersPage.jsx";
import RequireAuth from "./components/RequireAuth.jsx";

const routes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "articles",
        element: <ArticleListPage />,
      },
      {
        path: "articles/:name",
        element: <ArticlePage />,
      },
    ],
  },
  {
    path: "/auth/*",
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "signin",
        element: <SignInPage />,
      },
      {
        path: "admin-signin",
        element: <AdminSignInPage />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
    ],
  },
  {
    path: "/dashboard/*",
    element: (
      <RequireAuth>
        <DashLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "reports", element: <ReportsPage /> },
      { path: "users", element: <UsersPage /> },
      { path: "articles", element: <DashArticleListPage /> },
    ],
  },
];

const router = createBrowserRouter(routes);

export default function App() {
  return <RouterProvider router={router} />;
}
