import React, { useState, useEffect, useContext } from "react";
import ScenarioPage from "./ScenarioPage";
import StepPage from "./StepPage";
import { TestContext } from "../context";

const CenterPanel = () => {
  const [componentToRender, setComponentToRender] = useState(null);
  const { contextType, currentScenario } = useContext(TestContext);

  useEffect(() => {
    switch (contextType) {
      case "STEP":
        setComponentToRender(<StepPage />);
        break;
      case "SCENARIO":
        setComponentToRender(<ScenarioPage selectedData={currentScenario} />);
        break;
      default:
        setComponentToRender(null); // Handle unknown contextType
    }
  }, [contextType]);

  return <div>{componentToRender}</div>;
};

export default CenterPanel;
