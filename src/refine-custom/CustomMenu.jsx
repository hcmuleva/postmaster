import { Menu } from "antd";
import { useContext } from "react";
import { AppContext } from "../context";
export default function CustomMenu({ menuData }) {
  const { setScenarioRequest } = useContext(AppContext);
  const handleClick = (e) => {
    setScenarioRequest(e.item.props["data-custom-value"], "INIT_UPDATE");
  };
  return (
    <Menu
      items={menuData}
      mode="inline"
      style={{ width: "274px", height: "100vh" }}
      onClick={handleClick}
    />
  );
}

function getMenuItem(label, key, icon, children, type, data) {
  return {
    key,
    icon,
    children,
    label,
    type,
    "data-custom-value": data,
  };
}

export { getMenuItem };
