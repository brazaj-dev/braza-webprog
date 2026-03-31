import { createBrowserRouter, RouterProvider } from "react-router-dom";

// HomePage Structure
import Layout from "./components/Layout";
import ArticlePage from "./pages/ArticlePage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "articles",
        element: <ArticlePage />,
      },
      {
        path: "*",
        element: (
          <div className="px-4 py-10 text-center text-zinc-900">
            <h1 className="text-2xl font-bold">Page not found</h1>
            <p className="mt-2">This route does not exist.</p>
          </div>
        ),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
