import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { HomePage } from "./pages/HomePage/HomePage.tsx";
import { Tutorials } from "./pages/Tutorials/Tutorials.tsx";
import { Tutorial } from "./pages/Tutorials/components/Tutorial.tsx";
import { FallBack } from "./pages/HomePage/components/FallBack.tsx";

const router = createBrowserRouter([
  { path: "/", element: <HomePage />, errorElement: <FallBack /> },
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
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
