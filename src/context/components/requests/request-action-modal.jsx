import { Modal } from "antd";
import RequestCreateForm from "../../form/request-create-form";

function RequestActionModal({
  requestModalState,
  changeRequestModalState,
  scenarioId,
}) {
  return (
    <Modal
      open={requestModalState}
      okButtonProps={{ style: { display: "none" } }}
      onCancel={() => changeRequestModalState(false)}
    >
      <RequestCreateForm
        changeScenarioModalState={changeRequestModalState}
        scenarioId={scenarioId}
      />
    </Modal>
  );
}

export default RequestActionModal;
