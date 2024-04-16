import { Form, Input } from "antd";
import { Button } from "antd";
import CreateProvider from "../../strapi-actions/create-provider";
import { useContext } from "react";
import { AppContext } from "..";
const { Item } = Form;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};

function ScenarioForm({ changeScenarioModalState }) {
  const { createProviderFunc } = CreateProvider();
  const { updateRefetchStatus } = useContext(AppContext);
  const [form] = Form.useForm();
  const onFinish = (values) => {
    createProviderFunc({ resource: "scenarios", values });
    updateRefetchStatus(true);
    changeScenarioModalState(false);
  };
  return (
    <Form
      style={{ padding: "1rem" }}
      form={form}
      {...layout}
      colon={false}
      labelAlign="left"
      name="scenario-create-form"
      onFinish={onFinish}
    >
      <Item
        label={"Name"}
        name={"name"}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input></Input>
      </Item>
      <Item
        label={"Description"}
        name={"description"}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input></Input>
      </Item>
      <Item
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Button htmlType="submit">Create Scenario</Button>
      </Item>
    </Form>
  );
}

export default ScenarioForm;
