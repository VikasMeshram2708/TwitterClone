import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Error from "../pages/Error";
import Login from "../pages/Login";
import SignUp from "../pages/Signup";
import Tweets from "../pages/Tweets";
import { ProtectedRoute } from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "tweets",
        element: (
          <ProtectedRoute>
            <Tweets />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
