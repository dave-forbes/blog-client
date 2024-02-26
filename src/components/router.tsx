import App from "../App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./Error";
import Register from "./Register";
import Login from "./Login";
import ReadPost from "./ReadPost";
import Home from "./Home";
import CreatePost from "./CreatePost";
import PostManager from "./PostManager";

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
        {
          path: "/posts/post-manager",
          element: <PostManager />,
        },
        {
          path: "/posts/create-post/:postId",
          element: <CreatePost />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
