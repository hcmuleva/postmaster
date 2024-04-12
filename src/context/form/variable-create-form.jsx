import { Form, Input } from "antd";

const { Item } = Form;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};

function VariableCreateForm({ preData }) {
  const { pathString, meta } = preData;
  const [form] = Form.useForm();
  pathString && form.setFieldValue("path", pathString);

  if (!pathString) {
    return <div></div>;
  }

  const onFinish = (values) => {
    console.log("variable values", values);
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
        <Input />
      </Item>
      <Item label={"Path"} name={"path"}>
        <Input />
      </Item>
      <Item label={"Type"} name={"type"}>
        <Input />
      </Item>
      <Item label={"SubType"} name={"subtype"}>
        <Input />
      </Item>
    </Form>
  );
}

export default VariableCreateForm;
