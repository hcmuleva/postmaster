import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input,Select, Space } from 'antd';
import { useCreate } from '@refinedev/core';
const onFinish = (values) => {
  
};
const CreateStep = ({scenarioid,setIsModalOpen,selectedData}) => {
    const { mutate } = useCreate();
    console.log("CreateStep",scenarioid)
    const onFinish = (values) => {
        
        values['scenario']=scenarioid;
        mutate({
            resource: "steps",
            values: values,
          },{
            onError: (error, variables, context) => {
              // An error occurred!
              console.log("error", error)
            },
            onSuccess: (data, variables, context) => {
              // Let's celebrate!
                console.log("data", data)
                const newSteps=data.data.data
                console.log("newSteps",newSteps)
                selectedData.steps.push({id:newSteps.id, ...newSteps.attributes});
                
                setIsModalOpen(false);
            },
          },);

      };
      const prefixSelector = (
        <Form.Item name="requesttype" noStyle>
          <Select style={{ width: 90 }}>
            <Option value="POST">POST</Option>
            <Option value="GET">GET</Option>
            <Option value="PUT">PUT</Option>
            <Option value="DELETE">DELETE</Option>

          </Select>
        </Form.Item>
      );
    return (
        <div>
             <Form
    name="dynamic_form_nest_item"
    onFinish={onFinish}
    style={{
      maxWidth: 600,
    }}
    autoComplete="off"
  >
    <Form.Item  name="name" label="Name" rules={[{ required: true, message: 'Missing name' }]} >
        <Input />
    </Form.Item>

    <Form.Item
        name="url"
        label="URL"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
      </Form.Item>
    <Form.List name="header">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space
              key={key}
              style={{
                display: 'flex',
                marginBottom: 8,
              }}
              align="baseline"
            >
              <Form.Item
                {...restField}
                name={[name, 'key']}
                rules={[
                  {
                    required: true,
                    message: 'Missing key',
                  },
                ]}
              >
                <Input placeholder="Key" />
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, 'value']}
                rules={[
                  {
                    required: true,
                    message: 'Missing value',
                  },
                ]}
              >
                <Input placeholder="Value" />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          <Form.Item>
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
              Add Header
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
    <Form.Item
        name="payload"
        label="Payload"
        
      >
        <Input.TextArea style={{ width: '100%', height:'200px' }} />
      </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  
        </div>
    );
};

export default CreateStep;
