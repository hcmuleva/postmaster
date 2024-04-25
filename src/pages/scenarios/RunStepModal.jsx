import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import { DeleteButton } from '@refinedev/antd';
import axios from "axios";
import { useUpdate } from '@refinedev/core';
import { getJsonValueByPath,replaceVariables } from './GetJsonValueFromResponse';

const API_URL = process.env.REACT_APP_API_SERVER

const updateJsonVariablesWithActualValue = (scenario) => {
    scenario?.variables?.map((variable) => {
        console.log("variable",variable)
        const stepnum = variable.step
        const elementWithId = scenario?.steps.find(element => element.id === stepnum);
        const jsonvalue=getJsonValueByPath(elementWithId?.response, variable.value)
        variable[variable.name]=jsonvalue    
      })
      console.log("scenario",scenario)
}

const RunStepModal = ({ visible, setVisible, variabledata, stepData, setStepData, scenario }) => {
    updateJsonVariablesWithActualValue(scenario)
    const { mutate } = useUpdate();
    const [form] = Form.useForm();
    const [variables, setVariables] = useState([]);
    const [headers, setHeaders] = useState(stepData?.header?? []);
   
    
    const handleAddVariable = () => {
        setVariables([...variables, { name: '', value: '' }]);
    };

    const handleRemoveVariable = (index) => {
        const updatedVariables = [...variables];
        updatedVariables.splice(index, 1);
        setVariables(updatedVariables);
    };

    const handleAddHeader = () => {
        setHeaders([...headers, { name: '', value: '' }]);
    };

    const handleRemoveHeader = (index) => {
        const updatedHeader = [...headers];
        updatedHeader.splice(index, 1);
        setHeaders(updatedHeader);
    };
   
    // Example POST request with JSON data
async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
    "Content-Type": "application/json",
    // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin
    body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
    }
    const onFinish = async (values) => {
        // console.log("OnFinishvalues", values,headers)
        const updatedHeaders= {"Content-Type":"application/json"}
        headers.map(header=>{
            const data =replaceVariables(header,scenario?.variables)
            updatedHeaders[data.name]=data.value
            return data;
        });
        const { payload, url, requesttype } = values
        const updatedUrl=replaceVariables(url,scenario?.variables);
        const newHeader=replaceVariables(headers,scenario?.variables)
        console.log("newHeader",newHeader)
        const modifiedpaload=replaceVariables(payload,scenario?.variables)
        let axiosRequest;
        switch (requesttype.toUpperCase()) {
            case 'GET':
                axiosRequest = axios.get(updatedUrl, { headers:updatedHeaders });
                break;
            case 'POST':
                console.log("modifiedpaload");
                axiosRequest = axios.post(updatedUrl,modifiedpaload, { headers:updatedHeaders });
                break;
            case 'PUT':
                axiosRequest = axios.put(updatedUrl,modifiedpaload, { headers:updatedHeaders});
                break;
            case 'DELETE':
                axiosRequest = axios.delete(updatedUrl, { headers:updatedHeaders });
                break;
            default:
                throw new Error('Unsupported request type');
        }

        // Send the request and handle the response
        axiosRequest.then((response) => {
            console.log('Response:', response.data);
            mutate(
                {
                    resource: "steps",
                    id: stepData?.id,
                    values: {
                        response: response.data
                    }
                },

            );
        }).catch(error => {
            console.error('Error:', error.response ? error.response.data : error.message);
        });
        form.resetFields();
        setStepData()
        setVariables([]);
        setHeaders([])
        setVisible(false);
    };

    const handleEdit = () => {
        const values = form.getFieldsValue()
        mutate(
            {
                resource: "steps",
                id: stepData?.id,
                values: { ...values, header: headers }
            },
            {
                onError: (error, variables, context) => {
                  // An error occurred!
                },
                onSuccess: (data, variables, context) => {
                  // Let's celebrate!
                  form.resetFields();
                  setStepData()
                  setVariables([]);
                  setHeaders([])
                  setVisible(false);
                  window.location.reload()
                },
              },
        ) 
    }
    useEffect(() => {
        // console.log(stepData);
        form.setFieldsValue({
            name: stepData?.name,
            requesttype: stepData?.requesttype,
            url: stepData?.url,
            payload: stepData?.payload
        })
        setHeaders(stepData?.header ?? [])
        updateJsonVariablesWithActualValue(scenario)
    }, [stepData])

    return (
        <Modal
            open={visible}
            title="Run Steps"
            okText="Run Step"
            cancelText="Cancel"
            onCancel={() => { setVisible(false) }}
            
            // Add an additional button along with Ok and Cancel
            footer={[
                <Button type="primary" key="additionalButton" onClick={handleEdit}>
                    Edit
                </Button>,
                <Button key="cancel" onClick={() => setVisible(false)}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={() => {
                 
                    form
                        .validateFields()
                        .then(values => {
                            // console.log("OnOKvalues", values)
                            onFinish(values);
                        })
                        .catch(info => {
                            console.log('Validate Failed:', info);
                        });
                }}>
                    Ok
                </Button>
            ]}
        >
            <Form form={form} layout="vertical" name="create_request_form">

                <Form.Item
                    label="Step Name"
                    name="name"
                    style={{ marginBottom: 0, width: '70%' }}
                    rules={[{ required: true, message: 'Please enter URL' }]}
                >
                    <Input style={{ width: '100%' }} />
                </Form.Item>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Form.Item
                        label="Request Type"
                        name="requesttype"
                        style={{ marginBottom: 0, width: '30%', marginRight: '10px' }}
                        rules={[{ required: true, message: 'Please select request type' }]}
                    >
                        <Select style={{ width: '100%' }}>
                            <Option value="GET">GET</Option>
                            <Option value="POST">POST</Option>
                            <Option value="PUT">PUT</Option>
                            <Option value="DELETE">DELETE</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="URL"
                        name="url"
                        style={{ marginBottom: 0, width: '70%' }}
                        rules={[{ required: true, message: 'Please enter URL' }]}
                    >
                        <Input style={{ width: '100%' }} />
                    </Form.Item>
                </div>
                <Form.Item label="Header">
                    {headers?.map((header, index) => (
                        <div key={index} style={{ marginBottom: 8 }}>
                            <Input
                                placeholder="Header Name"
                                value={header.name}
                                onChange={e => {
                                    
                                    const updatedHeaders = [...headers];
                                    updatedHeaders[index].name = e.target.value;
                                    setHeaders(updatedHeaders);
                                }}
                                style={{ width: 'calc(30% - 16px)', marginRight: 8 }}
                            />
                            <Input
                                placeholder="Header Value"
                                value={header.value}
                                onChange={e => {
                                    const updatedHeaders = [...headers];
                                    updatedHeaders[index].value = e.target.value;
                                    setHeaders(updatedHeaders);
                                }}
                                style={{ width: 'calc(55% - 16px)', marginRight: 8 }}
                            />
                            <Button type="dashed" danger onClick={() => handleRemoveHeader(index)}>
                                X
                            </Button>
                        </div>
                    ))}
                    <Button type="dashed" onClick={handleAddHeader} style={{ width: '100%' }}>
                        Add Header
                    </Button>
                </Form.Item>
                <Form.Item
                    label="Payload"
                    name="payload"
                    placeholder="Enter json payload"
                    style={{ marginBottom: 0 }}
                >
                    <Input.TextArea style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item label="Variable">
                    {variables.map((variable, index) => (
                        <div key={index} style={{ marginBottom: 8 }}>
                            <Form.Item
                                name="step_variable"
                                label
                                style={{ display: 'inline-block', width: 'calc(30% - 16px)', marginRight: 8 }}
                            >
                                <Input placeholder="variable name"/>
                            </Form.Item>
                            <Form.Item
                                name={['variables', index, 'value']}
                                style={{ display: 'inline-block', width: 'calc(55% - 16px)', marginRight: 8 }}
                            >
                                <Input placeholder="Variable Value" />
                            </Form.Item>
                            <Button type="dashed" danger onClick={() => handleRemoveVariable(index)}>
                                X
                            </Button>
                        </div>
                    ))}
                    <Button type="dashed" onClick={handleAddVariable} style={{ width: '100%' }}>
                        Add Variable
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default RunStepModal;
