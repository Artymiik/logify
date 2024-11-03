// import Blocked from "../components/Blocked";
import DetailsLogData from "../components/logs/DetailsLogData";
import Navigation from "../components/Navigation";
import Panel_dashboard from "../components/Panel_dashboard";

const DetailsLog = () => {
  return (
    <>
      <Navigation />
      <Panel_dashboard children={<DetailsLogData />} />
    </>
  );
};

export default DetailsLog;
