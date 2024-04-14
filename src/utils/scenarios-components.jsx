import { Button } from "antd";
import { useContext } from "react";
import { AppContext } from "../context";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
function ScenariosMenuHeading({ item }) {
  const { setAppScenario } = useContext(AppContext);
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Button type="text" onClick={() => setAppScenario(item)}>
        {item.name}
      </Button>
      <Tooltip placement="bottom" title={"Create Step"}>
        <Button type="text">
          <PlusSquareOutlined />
        </Button>
      </Tooltip>
    </div>
  );
}

export { ScenariosMenuHeading };
