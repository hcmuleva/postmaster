import { Menu } from "antd";
export default function CustomMenu({ menuData, setCurrentContext }) {
  const handleClick = (e) => {
    console.log("hello");
    console.log(e);
    setCurrentContext(e.item.props["data-custom-value"]);
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
