import { Modal } from "antd";
import RequestCreateForm from "../../form/request-create-form";
import { useContext } from "react";
import { AppContext } from "../..";
import RequestUpdateForm from "../../form/request-update-form";

function RequestActionModal({
  requestModalState,
  changeRequestModalState,
  scenarioId,
}) {
  const { requestUpdateModeData } = useContext(AppContext);
  return (
    <Modal
      open={requestModalState}
      okButtonProps={{ style: { display: "none" } }}
      onCancel={() => changeRequestModalState(false)}
    >
      {!requestUpdateModeData && (
        <RequestCreateForm
          changeScenarioModalState={changeRequestModalState}
          scenarioId={scenarioId}
        />
      )}
      {requestUpdateModeData && (
        <RequestUpdateForm
          requestModal
          requestUpdateModeData={requestUpdateModeData}
        />
      )}
    </Modal>
  );
}

export default RequestActionModal;
