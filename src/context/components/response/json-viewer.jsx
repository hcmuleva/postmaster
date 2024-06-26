import { useContext, useState } from "react";
import { defaultStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import JSONTree from "react-json-view";
import { AppContext } from "../../../context/index";
import VariableModal from "../variables/variable-modal";
import VariableView from "../variables/variable-view";
import { TestRunnerContext } from "../../test-runner-context";

export default function JsonViewerComponent({ response, type, subType }) {
  const { request } = useContext(AppContext);
  const { setVariableModalView, variableModalState, setVariableModalData } =
    useContext(TestRunnerContext);
  if (!response) {
    return <div></div>;
  }

  const handleClick = (path) => {
    setVariableModalData({
      path,
      request,
      meta: { type, subType },
    });
    setVariableModalView(true);
  };
  return (
    <>
      <JSONTree
        src={response}
        style={{ ...defaultStyles, maxWidth: "100vw" }}
        onSelect={handleClick}
        collapseStringsAfterLength={50}
      />
      {variableModalState && <VariableView children={<VariableModal />} />}
    </>
  );
}
