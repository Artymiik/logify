import LogsList from "../components/logs/LogsList";
import Navigation from "../components/Navigation";
import Panel_dashboard from "../components/Panel_dashboard";

const Dashboard = () => {
  return (
    <>
      <Navigation />
      <Panel_dashboard children={<LogsList />} />
    </>
  );
};

export default Dashboard;
