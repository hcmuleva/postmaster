import { Form, Input } from "antd";
import { Button } from "antd";
import CreateProvider from "../../strapi-refine-actions/create-provider";
const { Item } = Form;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};

function ScenarioForm({ changeScenarioModalState }) {
  const { createProviderFunc } = CreateProvider();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    createProviderFunc({ resource: "scenarios", values });
    changeScenarioModalState(false);
  };
  return (
    <Form
      form={form}
      layout={layout}
      name="scenario-create-form"
      onFinish={onFinish}
    >
      <Item label={"Name"} name={"name"}>
        <Input></Input>
      </Item>
      <Item label={"Description"} name={"description"}>
        <Input></Input>
      </Item>
      <Item>
        <Button htmlType="submit">Create Scenario</Button>
      </Item>
    </Form>
  );
}

export default ScenarioForm;
