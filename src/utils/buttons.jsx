import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
function EditButton({ children, handleClick }) {
  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      {children}
      <Button type="text" onClick={handleClick}>
        <EditOutlined style={{ width: "24px", height: "24px" }} />
      </Button>
    </div>
  );
}

function DeleteButton({ children }) {}

export { EditButton };
