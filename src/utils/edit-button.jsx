import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
function EditButton({ children }) {
  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      {children}
      <Button type="text">
        <EditOutlined style={{ width: "24px", height: "24px" }} />
      </Button>
    </div>
  );
}

export default EditButton;
