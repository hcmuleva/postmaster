import { Button } from "antd";
import { useContext } from "react";
import { AppContext } from "../context";
function ScenariosMenuHeading({ item }) {
  const { setAppScenario } = useContext(AppContext);
  return (
    <div>
      <Button type="text" onClick={() => setAppScenario(item)}>
        {item.name}
      </Button>
    </div>
  );
}

export { ScenariosMenuHeading };
