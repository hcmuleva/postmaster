import { createContext, useState } from "react";

export const TestContext = createContext();

export const TestProvider = (props) => {
  const [allScenarios, setAllScenarios] = useState([]);
  const [currentScenario, setCurrentScenario] = useState(null);
  const [currentStep, setCurrentStep] = useState(null);
  const [contextType, setContextType] = useState("SCENARIO");
  const [refetchResources, setRefetchResources] = useState(false);

  return (
    <TestContext.Provider
      value={{
        refetchResources,
        setRefetchResources,
        allScenarios,
        setAllScenarios,
        currentScenario,
        setCurrentScenario,
        currentStep,
        setCurrentStep,
        contextType,
        setContextType,
      }}
    >
      {props.children}
    </TestContext.Provider>
  );
};
