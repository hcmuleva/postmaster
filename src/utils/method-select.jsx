import { Select } from "antd";
import MethodText, { getAllMethods } from "./method-text";
const { Option } = Select;

const RequestMethodSelect = ({ unsavedRequest, handleMethodChange }) => (
  <Select
    defaultValue={unsavedRequest?.requesttype}
    onChange={handleMethodChange}
  >
    {getAllMethods().map((method, index) => (
      <Option value={method} key={index}>
        <div>
          <MethodText size={"14px"} text={method} />
        </div>
      </Option>
    ))}
  </Select>
);

export default RequestMethodSelect;
