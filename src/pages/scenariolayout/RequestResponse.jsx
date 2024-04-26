import React, { useContext, useEffect, useState } from "react";
import JSONTree from "react-json-view";
import { Form, Input, Select, Modal, Alert } from "antd";
import { useUpdate } from "@refinedev/core";
import { TestContext } from "../context";

const { Item } = Form;
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};

const RequestResponse = ({ stepdata }) => {
  const { allScenarios } = useContext(TestContext);

  const selectedscenario = allScenarios.find(
    (item) => item.id === stepdata.scenarioid
  );
  const variables = selectedscenario?.variables ?? [];
  const { mutate } = useUpdate();
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [variableData, setvariableData] = useState({});
  function PathExtracter(name, namespace) {
    const updatedNamespace = namespace.map((part) => {
      if (!isNaN(Number(part))) {
        return `[${part}]`;
      } else {
        return part;
      }
    });
    updatedNamespace.push(name);
    return updatedNamespace.join(".");
  }
  const [form] = Form.useForm();

  const handleTypeChange = (value) => {
    setSelectedType(value);
  };
  const handleOk = () => {
    let matchingIndex = variables
      ? variables.findIndex(
          (variable) => variable.name === form.getFieldValue("name")
        )
      : -1;
    variableData["name"] = form.getFieldValue("name").toUpperCase();
    variableData["type"] = "RESPONSE";
    variableData["step"] = stepdata.id;
    /** if (matchingIndex == -1) {
            // Overwrite the matching element with variableData
            //Antd alert to notify user that variable already exists
            Modal.confirm({
                title: 'Variable already exists',
                content: 'Do you want to overwrite it?',
                okText: 'Yes',
                cancelText: 'No',
                onOk: () => {
                    variables[matchingIndex] = variableData;
                                        setOpen(false);
                }, onCancel: () => {
                    setOpen(false);
                }
            });
            
        } else {
            // Add the variableData to variables
            //variables.push(variableData);
        }*/
    const myvariables = [...variables, variableData];
    mutate(
      {
        values: { variables: myvariables },
        id: stepdata.scenarioid,
        resource: "scenarios",
      },
      {
        onError: (error, variables, context) => {
          // An error occurred!
        },
        onSuccess: (data, variables, context) => {
          // Let's celebrate!
        },
      }
    );
    form.resetFields();
    setOpen(false);
  };
  const handleSelect = (path) => {
    const elmentpath = PathExtracter(path.name, path.namespace);
    setvariableData({ path: elmentpath, value: path.value, type: path.type });
    form.setFieldValue("path", elmentpath);
    form.setFieldValue("datatype", path.type);
    setOpen(true);
  };

  return (
    <div>
      <Modal
        title={
          <p style={{ textAlign: "center", textTransform: "uppercase" }}>
            Create New Variable
          </p>
        }
        onOk={handleOk}
        open={open} // Ensure the modal is open
        onCancel={() => {
          setOpen(false);
        }} // Close the modal
      >
        <Form {...layout} form={form} name="variable-create-form" colon={false}>
          <Item label={"Name"} name={"name"}>
            <Input autoFocus={true} />
          </Item>
          <Item label={"Datatype"} name={"datatype"}>
            <Input autoFocus={true} />
          </Item>
          <Item label={"Path"} name={"path"}>
            <Input />
          </Item>
        </Form>
      </Modal>

      <JSONTree
        src={stepdata["response"]}
        theme="monokai"
        invertTheme={false}
        onSelect={handleSelect}
      />
    </div>
  );
};

export default RequestResponse;
