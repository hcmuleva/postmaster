import { useContext, useState } from "react";
import { AppContext } from "..";
import { Form, Input, Button } from "antd";
import CreateProvider from "../../strapi-actions/create-provider";
import RequestMethodSelect from "../../utils/method-select";
const { Item } = Form;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};
function RequestUpdateForm({ requestUpdateModeData }) {


  
  const [form] = Form.useForm();
  const [method, setMethodChange] = useState("GET");
  console.log(requestUpdateModeData);
  const { name, url, requesttype } = requestUpdateModeData;
  form.setFieldValue("name", name);
  form.setFieldValue("url", url);
  form.setFieldValue("requesttype", requesttype);
  console.log(requesttype);

  function onFinish(values) {
    console.log(values);
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
      <Item
        label="REQUEST TYPE"
        name={"requesttype"}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <RequestMethodSelect handleMethodChange={setMethodChange} />
      </Item>
      <Item>
        <Button htmlType="submit">Create Request</Button>
      </Item>
    </Form>
  );
}

export default RequestUpdateForm;
