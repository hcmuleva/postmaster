import { Form, Input, Select, Button } from "antd";
import {
  communicationDataTypeKeys,
  getCommunicationDataSubType,
} from "../../utils/communication-data-utils";
const { Item } = Form;
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};

function VariableCreateForm({ preData }) {
  const { pathString, meta } = preData;
  const { type, subType } = meta;

  if (!pathString || !meta) {
    return <div></div>;
  }

  const [form] = Form.useForm();

  pathString && form.setFieldValue("path", pathString);
  type && form.setFieldValue("type", type);
  subType && form.setFieldValue("subtype", subType);
  form.setFieldValue("name", "{{}}");

  const onFinish = (values) => {
    console.log("variable values", values);
    console.log(meta);
  };

  const VariableExtracterType = () => {
    return (
      <Select defaultValue={type}>
        {communicationDataTypeKeys.map((communicationDataType, index) => (
          <Option value={communicationDataType} key={index}>
            {communicationDataType}
          </Option>
        ))}
      </Select>
    );
  };

  const VariableExtracterSubType = () => {
    return (
      <Select defaultValue={subType}>
        {getCommunicationDataSubType(type).map((dataSubType, index) => {
          return (
            <Option value={dataSubType} key={index}>
              {dataSubType}
            </Option>
          );
        })}
      </Select>
    );
  };

  return (
    <Form
      {...layout}
      form={form}
      name="variable-create-form"
      onFinish={onFinish}
      colon={false}
    >
      <Item label={"Name"} name={"name"}>
        <Input autoFocus={true} />
      </Item>
      <Item label={"Path"} name={"path"}>
        <Input />
      </Item>
      <Item label={"Type"} name={"type"}>
        <VariableExtracterType />
      </Item>
      <Item label={"SubType"} name={"subtype"}>
        <VariableExtracterSubType />
      </Item>
      <Item>
        <Button htmlType="submit">Create Variable</Button>
      </Item>
    </Form>
  );
}

export default VariableCreateForm;
