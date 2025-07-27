import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";

import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./login.jsx";
import Signup from "./signup.jsx";
import Input from "./components/input.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App contains Navbar and <Outlet />
    children: [
      {
        path: "",
        element: <Input />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
