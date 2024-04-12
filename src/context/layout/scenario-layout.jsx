import { useContext } from "react";
import { AppContext } from "../index";
import ScenarioView from "../components/scenario/scenario-view";
import ScenarioHeading from "../components/scenario/scenario-heading";
function ScenarioLayout() {
  const { scenario } = useContext(AppContext);
  const { name } = scenario;
  const scenarioHeaderData = { name };
  return (
    <div>
      <ScenarioView
        children={<ScenarioHeading scenarioData={scenarioHeaderData} />}
      />
    </div>
  );
}

export default ScenarioLayout;
