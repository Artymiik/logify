import { LogDetailsProvider } from "./context/LogDetailsContext";
import { SettingsProvider } from "./context/SettingsContext";
import { SigninProvider } from "./context/SigninContext";
import { SignupProvider } from "./context/SignupContext";
import { WebListProvider } from "./context/WebListContext";
import * as pages from "./pages/export.page.config";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRouter from "./ProtectedRouter";
import { CreateWebProvider } from "./context/CreateWebContext";

const App = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "",
        element: (
          <ProtectedRouter>
            <WebListProvider>
              <CreateWebProvider>
                <pages.index />
              </CreateWebProvider>
            </WebListProvider>
          </ProtectedRouter>
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
          <ProtectedRouter>
            <WebListProvider>
              <CreateWebProvider>
                <pages.dashboard_logs />
              </CreateWebProvider>
            </WebListProvider>
          </ProtectedRouter>
        ),
      },
      {
        path: "dashboard/:siteName/:logName",
        element: (
          <ProtectedRouter>
            <WebListProvider>
              <CreateWebProvider>
                <LogDetailsProvider>
                  <pages.dashboard_log />
                </LogDetailsProvider>
              </CreateWebProvider>
            </WebListProvider>
          </ProtectedRouter>
        ),
      },
      {
        path: "dashboard/:siteName/:logName/settings",
        element: (
          <ProtectedRouter>
            <WebListProvider>
              <CreateWebProvider>
                <SettingsProvider>
                  <pages.settings />
                </SettingsProvider>
              </CreateWebProvider>
            </WebListProvider>
          </ProtectedRouter>
        ),
      },
    ],
  },
]);

export default App;
