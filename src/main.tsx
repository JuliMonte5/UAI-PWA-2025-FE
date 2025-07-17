import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { HomePage } from "./pages/HomePage/HomePage.tsx";
import { Tutorials } from "./pages/Tutorials/Tutorials.tsx";
import { Tutorial } from "./pages/Tutorials/components/Tutorial.tsx";
import { FallBack } from "./pages/HomePage/components/FallBack.tsx";
import { ContactForm } from "./pages/ContactForm/ContactForm.tsx";
import PrivateRoute from "./components/privateRoute/PrivateRoute.tsx";
import { Login } from "./components/auth/login/Login.tsx";
import { Register } from "./components/auth/register/Register.tsx";
import { AuthProvider } from "./contexts/authContext/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute component={HomePage} />,
    errorElement: <FallBack />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/tutorials",
    element: <Tutorials />,
    children: [
      {
        path: "tutorial/:tutorialId",
        element: <Tutorial />,
      },
    ],
  },
  { path: "/contact", element: <ContactForm /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
