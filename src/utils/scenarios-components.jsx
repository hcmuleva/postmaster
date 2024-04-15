import { Button } from "antd";
import { useContext } from "react";
import { AppContext } from "../context";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import RequestActionModal from "../context/components/requests/request-action-modal";

function ScenariosMenuHeading({ item }) {
  const { requestModalState, setAppScenario, changeRequestModalState } =
    useContext(AppContext);
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Button type="text" onClick={() => setAppScenario(item)}>
        {item.name}
      </Button>
      <Tooltip placement="bottom" title={"Create Step"}>
        <Button type="text" onClick={() => changeRequestModalState(true)}>
          <PlusSquareOutlined />
        </Button>
      </Tooltip>
      <RequestActionModal
        requestModalState={requestModalState}
        changeRequestModalState={changeRequestModalState}
        scenarioId={item.id}
      />
    </div>
  );
}

export { ScenariosMenuHeading };
