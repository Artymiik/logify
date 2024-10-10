import { LogDetails } from "../components/logs/LogDetails";
import Navigation from "../components/Navigation";
import Panel_dashboard from "../components/Panel_dashboard";

const DashboardLog = () => {
  return (
    <>
      <Navigation />
      <Panel_dashboard children={<LogDetails />} />
    </>
  );
};

export default DashboardLog;
