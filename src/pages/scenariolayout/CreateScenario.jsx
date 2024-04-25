import { useCreate } from '@refinedev/core';
import { Modal, Form, Input } from 'antd';
import React from 'react';

const CreateScenario = ({setIsModalOpen,isModalOpen,addScenario}) => {
    const [form] = Form.useForm();
    const { mutate } = useCreate();
    const handleOnOk = () => {
        form.validateFields()
            .then(values => {
                console.log(values);
                mutate({
                    resource: "scenarios",
                    values: values,
                  },{
                    onError: (error, variables, context) => {
                      // An error occurred!
                      console.log("error", error)
                    },
                    onSuccess: (data, variables, context) => {
                      // Let's celebrate!
                        addScenario(data);
                        console.log("data", data)
                    },
                  },);
                form.resetFields();
                setIsModalOpen(false);
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    }
    return (
        <Modal title="Add Scenario" open={isModalOpen} onCancel={()=>{setIsModalOpen(false)}} onOk={handleOnOk}>
        {/* Your form or other content goes here */}
        <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{ modifier: 'public' }}
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Please input the name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: 'Please input the description!' }]}
                >
                    <Input.TextArea />
                </Form.Item>
            </Form>
    </Modal>
    );
};

export default CreateScenario;