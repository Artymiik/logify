import { lazy } from "react";
const dashboard_log = lazy(() => import("./dashboard_log"));
const dashboard_logs = lazy(() => import("./dashboard_logs"));
const signin = lazy(() => import("./signin"));
const signup = lazy(() => import("./signup"));
const index = lazy(() => import("./index"));
const dashboard_details = lazy(() => import("./dashboard_details"));
const settings = lazy(() => import("./settings"));
const not_found = lazy(() => import("./not_found"));

export {
  not_found,
  dashboard_details,
  dashboard_log,
  dashboard_logs,
  settings,
  signin,
  signup,
  index,
};
