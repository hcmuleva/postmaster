import { useContext } from "react";
import { AppContext } from "../context";
import ScenarioActionModal from "../context/components/scenario/scenario-action-modal";

export default function WelcomePage() {
  const { scenarioModalState, changeScenarioModalState } =
    useContext(AppContext);
  return (
    <>
      <h1
        style={{
          textTransform: "uppercase",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Welcome To Perf Testing
      </h1>
      {scenarioModalState && (
        <ScenarioActionModal
          scenarioModalState={scenarioModalState}
          changeScenarioModalState={changeScenarioModalState}
        />
      )}
    </>
  );
}
