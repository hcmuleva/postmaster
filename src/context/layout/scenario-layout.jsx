import { useContext } from "react";
import { AppContext } from "..";

function ScenarioLayout() {
  const { scenario } = useContext(AppContext);
  return JSON.stringify(scenario);
}

export default ScenarioLayout;
