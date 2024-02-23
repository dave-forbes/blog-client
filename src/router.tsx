import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./components/Error";
import Register from "./components/Register";
import Login from "./components/Login";
import ReadPost from "./components/ReadPost";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <Error />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/log-in",
          element: <Login />,
        },
        {
          path: "/posts/:postId",
          element: <ReadPost />,
        },
        {
          path: "/posts/create-post",
          element: <CreatePost />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
