import { Modal } from "antd";
import ScenarioForm from "../../form/scenario-form";

function ScenarioActionModal({ scenarioModalState, changeScenarioModalState }) {
  return (
    <Modal
      open={scenarioModalState}
      onCancel={() => changeScenarioModalState(false)}
      okButtonProps={{ style: { display: "none" } }}
    >
      <ScenarioForm changeScenarioModalState={changeScenarioModalState} />
    </Modal>
  );
}

export default ScenarioActionModal;
