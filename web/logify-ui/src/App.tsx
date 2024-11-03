import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { LogDetailsProvider } from "./context/LogDetailsContext";
import { SettingsProvider } from "./context/SettingsContext";
import { SigninProvider } from "./context/SigninContext";
import { SignupProvider } from "./context/SignupContext";
import { WebListProvider } from "./context/WebListContext";
import { CreateWebProvider } from "./context/CreateWebContext";
import { DetailsLogProvider } from "./context/DetailsLogContext";
import { CreateLogProvider } from "./context/CreateLogContext";
import LoadWeb from "./components/Loader/LoadWeb";
import ProtectedRouter from "./ProtectedRouter";
import * as pages from "./pages/export.page.config";
import { LogListAndDeleteProvider } from "./context/LogListAndDeleteContext";
import { ConectsProvider } from "./context/ConectsContext";

const App = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<LoadWeb />}>
            <ProtectedRouter>
              <WebListProvider>
                <CreateWebProvider>
                  <ConectsProvider>
                    <pages.index />
                  </ConectsProvider>
                </CreateWebProvider>
              </WebListProvider>
            </ProtectedRouter>
          </Suspense>
        ),
      },
      {
        path: "signin",
        element: (
          <Suspense fallback={<LoadWeb />}>
            <SigninProvider>
              <pages.signin />
            </SigninProvider>
          </Suspense>
        ),
      },
      {
        path: "signup",
        element: (
          <Suspense fallback={<LoadWeb />}>
            <SignupProvider>
              <pages.signup />
            </SignupProvider>
          </Suspense>
        ),
      },
      {
        path: "dashboard/:siteName",
        element: (
          <Suspense fallback={<LoadWeb />}>
            <ProtectedRouter>
              <WebListProvider>
                <CreateWebProvider>
                  <ConectsProvider>
                    <CreateLogProvider>
                      <LogListAndDeleteProvider>
                        <pages.dashboard_logs />
                      </LogListAndDeleteProvider>
                    </CreateLogProvider>
                  </ConectsProvider>
                </CreateWebProvider>
              </WebListProvider>
            </ProtectedRouter>
          </Suspense>
        ),
      },
      {
        path: "dashboard/:siteName/:logName",
        element: (
          <Suspense fallback={<LoadWeb />}>
            <ProtectedRouter>
              <WebListProvider>
                <CreateWebProvider>
                  <ConectsProvider>
                    <LogDetailsProvider>
                      <pages.dashboard_log />
                    </LogDetailsProvider>
                  </ConectsProvider>
                </CreateWebProvider>
              </WebListProvider>
            </ProtectedRouter>
          </Suspense>
        ),
      },
      {
        path: "dashboard/:siteName/:logName/log",
        element: (
          <Suspense fallback={<LoadWeb />}>
            <ProtectedRouter>
              <WebListProvider>
                <CreateWebProvider>
                  <ConectsProvider>
                    <DetailsLogProvider>
                      <pages.dashboard_details />
                    </DetailsLogProvider>
                  </ConectsProvider>
                </CreateWebProvider>
              </WebListProvider>
            </ProtectedRouter>
          </Suspense>
        ),
      },
      {
        path: "dashboard/:siteName/:logName/settings",
        element: (
          <Suspense fallback={<LoadWeb />}>
            <ProtectedRouter>
              <WebListProvider>
                <CreateWebProvider>
                  <ConectsProvider>
                    <SettingsProvider>
                      <pages.settings />
                    </SettingsProvider>
                  </ConectsProvider>
                </CreateWebProvider>
              </WebListProvider>
            </ProtectedRouter>
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<LoadWeb />}>
            <pages.not_found />
          </Suspense>
        ),
      },
    ],
  },
]);

export default App;
