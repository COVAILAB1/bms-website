import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "../pages/Main/Main.jsx";
import Calculations from "../pages/Calculations/Calculations.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Main />
      },
      {
        path:"/calculations",
        element: <Calculations />
      }
    ]
  },
])
ReactDOM.createRoot(document.getElementById("root")).render(<RouterProvider router={appRouter} />);
