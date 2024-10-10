import Navigation from "../components/Navigation";
import Panel_dashboard from "../components/Panel_dashboard";
import SettingsList from "../components/settings/SettingsList";

const Settings = () => {
  return (
    <>
      <Navigation />
      <Panel_dashboard children={<SettingsList />} />
    </>
  );
};

export default Settings;
