import { Select, Input, Button } from "antd";
import MethodText from "../../utils/method-text";
export default function RequestForm() {
  return (
    <div>
      <form style={{ display: "flex", gap: "1rem" }}>
        <Input prefix={<RequestMethod />} />
        <Button type="primary">Send</Button>
      </form>
    </div>
  );
}

function RequestMethod() {
  return (
    <div style={{ width: "500px" }}>
      <Select defaultActiveFirstOption={true}>
        <Select.Option>
          <MethodText text={"POST"} />
        </Select.Option>
      </Select>
    </div>
  );
}
