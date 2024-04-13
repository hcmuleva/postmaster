import { useContext } from "react";
import { AppContext } from "../index";
import ScenarioView from "../components/scenario/scenario-view";
import ScenarioHeading from "../components/scenario/scenario-heading";
import ScenarioRequests from "../components/scenario/scenario-requests";
function ScenarioLayout() {
  const { scenario } = useContext(AppContext);
  const { name, endpoints } = scenario;
  const scenarioHeaderData = { name };
  return (
    <div>
      <ScenarioView
        children={<ScenarioHeading scenarioData={scenarioHeaderData} />}
      />
      <ScenarioView children={<ScenarioRequests requests={endpoints} />} />
    </div>
  );
}

export default ScenarioLayout;
