import { createBrowserRouter } from "react-router-dom";

import * as pages from "./pages/export.page.config";

const App = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "",
        element: <pages.index />,
      },
      {
        path: "signin",
        element: <pages.signin />,
      },
      {
        path: "signup",
        element: <pages.signup />,
      },
      {
        path: "dashboard",
        element: <pages.dashboard />
      }
    ],
  },
]);

export default App;
