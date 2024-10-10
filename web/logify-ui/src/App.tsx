import { LogDetailsProvider } from "./context/LogDetailsContext";
import { SettingsProvider } from "./context/SettingsContext";
import { SigninProvider } from "./context/SigninContext";
import { SignupProvider } from "./context/SignupContext";
import { WebListProvider } from "./context/WebListContext";
import * as pages from "./pages/export.page.config";
import { createBrowserRouter } from "react-router-dom";

const App = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "",
        element: (
          <WebListProvider>
            <pages.index />
          </WebListProvider>
        ),
      },
      {
        path: "signin",
        element: (
          <SigninProvider>
            <pages.signin />
          </SigninProvider>
        ),
      },
      {
        path: "signup",
        element: (
          <SignupProvider>
            <pages.signup />
          </SignupProvider>
        ),
      },
      {
        path: "dashboard/:siteName",
        element: (
          <WebListProvider>
            <pages.dashboard_logs />
          </WebListProvider>
        ),
      },
      {
        path: "dashboard/:siteName/:logName",
        element: (
          <WebListProvider>
            <LogDetailsProvider>
              <pages.dashboard_log />
            </LogDetailsProvider>
          </WebListProvider>
        ),
      },
      {
        path: "dashboard/:siteName/:logName/settings",
        element: (
          <WebListProvider>
            <SettingsProvider>
              <pages.settings />
            </SettingsProvider>
          </WebListProvider>
        ),
      },
    ],
  },
]);

export default App;
