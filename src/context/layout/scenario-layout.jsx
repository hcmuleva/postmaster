import { useContext } from "react";
import { AppContext } from "../index";
function ScenarioLayout() {
  const { scenario } = useContext(AppContext);
  console.log(scenario);
  return <div>{JSON.stringify(scenario)}</div>;
}

export default ScenarioLayout;
