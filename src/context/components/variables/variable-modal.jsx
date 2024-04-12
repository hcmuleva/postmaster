import { Modal } from "antd";
import { useContext, useEffect } from "react";
import { TestRunnerContext } from "../../test-runner-context";
import VariableCreateForm from "../../form/variable-create-form";
import { PathExtracter } from "../../../utils/path-extracter";
function VariableModal() {
  const { variableModalState, setVariableModalView, variableModalData } =
    useContext(TestRunnerContext);

  const { path, meta } = variableModalData;

  const pathString = PathExtracter(path);

  return (
    <Modal
      title={
        <p style={{ textAlign: "center", textTransform: "uppercase" }}>
          Create New Variable
        </p>
      }
      children={<VariableCreateForm preData={{ pathString, meta }} />}
      open={variableModalState}
      onCancel={() => setVariableModalView(false)}
    />
  );
}

export default VariableModal;
