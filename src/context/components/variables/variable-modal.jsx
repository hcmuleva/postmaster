import { Modal, Collapse } from "antd";
import { useContext } from "react";
import { TestRunnerContext } from "../../test-runner-context";
import VariableCreateForm from "../../form/variable-create-form";
import { PathExtracter } from "../../../utils/path-extracter";
import RequestMiniView from "../../views/request-mini-view";

const { Panel } = Collapse;

function VariableModal() {
  const { variableModalState, setVariableModalView, variableModalData } =
    useContext(TestRunnerContext);
  const { path, meta, request } = variableModalData;
  const pathString = PathExtracter(path);

  return (
    <Modal
      title={
        <p style={{ textAlign: "center", textTransform: "uppercase" }}>
          Create New Variable
        </p>
      }
      open={variableModalState}
      onCancel={() => setVariableModalView(false)}
      okButtonProps={{ style: { display: "none" } }}
    >
      <VariableCreateForm
        preData={{
          pathString,
          meta,
          scenarioId: request.scenario_id,
          requestId: request.id,
          preVariables: request.variables,
        }}
      />
      <Collapse bordered={false}>
        <Panel
          header={
            <p>
              <span style={{ color: "#B5C0D0" }}>Request Details</span>
            </p>
          }
        >
          <RequestMiniView requestData={request} />
        </Panel>
      </Collapse>
    </Modal>
  );
}

export default VariableModal;
