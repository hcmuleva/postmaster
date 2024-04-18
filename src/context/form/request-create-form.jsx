import { Form, Input, Button } from "antd";
import CreateProvider from "../../strapi-actions/create-provider";
import RequestMethodSelect from "../../utils/method-select";
import { useState } from "react";
const { Item } = Form;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};
function RequestCreateForm({ scenarioId }) {
  const { createProviderFunc } = CreateProvider();
  const [form] = Form.useForm();
  const [method, setMethodChange] = useState("GET");
  function onFinish(values) {
    createProviderFunc({
      resource: "steps",
      values: { ...values, scenario: scenarioId, requesttype: method },
    });
  }
  return (
    <Form
      colon={false}
      form={form}
      {...layout}
      labelAlign="left"
      name="request-create-form"
      onFinish={onFinish}
    >
      <Item
        label="Name"
        name={"name"}
        rules={[
          {
            required: true,
            message: "Please input request name!",
          },
        ]}
      >
        <Input />
      </Item>
      <Item
        label="URL"
        name={"url"}
        rules={[
          {
            required: true,
            message: "Please input request url",
          },
        ]}
      >
        <Input />
      </Item>
      <Item label="REQUEST TYPE" name={"requesttype"}>
        <RequestMethodSelect handleMethodChange={setMethodChange} />
      </Item>
      <Item>
        <Button htmlType="submit">Create Request</Button>
      </Item>
    </Form>
  );
}

export default RequestCreateForm;
