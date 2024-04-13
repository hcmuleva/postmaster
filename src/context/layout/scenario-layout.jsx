import { useContext } from "react";
import { AppContext } from "../index";
import ScenarioView from "../components/scenario/scenario-view";
import ScenarioHeading from "../components/scenario/scenario-heading";
import ScenarioRequests from "../components/scenario/scenario-requests";
import ScenarioVariables from "../components/scenario/scenario-variables";
function ScenarioLayout() {
  const { scenario } = useContext(AppContext);
  const { name, description, steps, variables } = scenario;
  const scenarioHeaderData = { name, description };
  return (
    <div>
      <ScenarioView
        children={<ScenarioHeading scenarioData={scenarioHeaderData} />}
      />
      <ScenarioView children={<ScenarioVariables variables={variables} />} />
      <ScenarioView children={<ScenarioRequests requests={steps} />} />
    </div>
  );
}

export default ScenarioLayout;
