import { Form, InputNumber, Modal, Checkbox, Row, Col, Card } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { replaceVariables } from './GetJsonValueFromResponse';
const { Meta } = Card;

const ORCHESTRATOR_URI = process.env.REACT_APP_API_SERVER;

const getUpdatedStepData = (stepData, un, duration) => {
    const updatedHeaders = {}
    headers.map(header => {
        const data = replaceVariables(header, scenario?.variables)
        console.log("modifield data", data)
        updatedHeaders[data.name] = data.value
        return data;
    });
    const { payload, url, requesttype } = values
    const updatedUrl = replaceVariables(url, scenario?.variables);
    const modifiedpaload = replaceVariables(payload, scenario?.variables)
}
const RunScenarioModel = ({ runModalOpen, setRunModalOpen, scenarioid, scenario }) => {
    console.log("scenario", scenario)
    const [form] = Form.useForm();
    const [stepCounts, setStepCounts] = useState({});
    const [threadCounts, setThreadCounts] = useState({});
    const [users,setUsers] = useState();
    const [duration,setDuration] = useState();


    const stepList = scenario?.steps ?? [];
    const stepUpdatedList = []
    const [selectedSteps, setSelectedSteps] = useState([]);

    const handleCheckboxChange = (stepId) => {
        const index = selectedSteps.indexOf(stepId);
        if (index === -1) {
            setSelectedSteps([...selectedSteps, stepId]);
        } else {
            setSelectedSteps(selectedSteps.filter(id => id !== stepId));
        }
    };
    const handleCountChange = (stepId, value) => {
        setStepCounts(prevStepCounts => ({
            ...prevStepCounts,
            [stepId]: value
        }));

    };


    const onFinish = (values) => {
        const stepUpdatedList=[]
        stepList.map(step=>{
            console.log("STEP DATA ",step)
            const updatedHeaders= {}
            step?.header.map(header=>{
                const data =replaceVariables(header,scenario?.variables)
                updatedHeaders[data.name]=data.value
                return data;
            });
            const { payload, url, requesttype } = step
            const updatedUrl=replaceVariables(url,scenario?.variables);
            const modifiedpaload=replaceVariables(payload,scenario?.variables)
            stepUpdatedList.push({id:step.id,header:updatedHeaders,payload:modifiedpaload,url:updatedUrl,requesttype:step.requesttype})

        })
        console.log("Step uploaded", stepUpdatedList)
        const filteredSteps = stepUpdatedList.filter(step => selectedSteps.includes(step.id));
        const modifiedSteps = filteredSteps.map(elm => ({ ...elm, threadcount: threadCounts[elm.id] }));
        console.log("modifiedSteps",modifiedSteps)
        const payload={vu:users,duration:duration,steps:modifiedSteps}
        
        // const axiosRequest = axios.post("http://localhost:5000/scenario",payload, { headers:{"Accept":"Application/json", "Content-Type":"Application/json"} });
        // console.log("axiosRequest",axiosRequest)
        // Make an Axios POST request with the specified headers
        axios.post(`http://localhost:5000/scenario`, {
            data:payload
        })
        .then(response => {
            
            // Handle response if needed
        })
        .catch(error => {
            
            // Handle error if needed
        });

        // // Reset the form and close the modal
        form.resetFields();
        setRunModalOpen(false);
    };
    const handleThreadCountChange = (stepId, value) => {
        setThreadCounts(prevThreadCounts => ({
            ...prevThreadCounts,
            [stepId]: value
        }));
    };


    return (
        <div>
            <Modal
                // Center the title text

                visible={runModalOpen}
                onCancel={() => { setRunModalOpen(false) }}
                onOk={() => {
                    form
                        .validateFields()
                        .then(values => {
                            onFinish(values);
                        })
                        .catch(info => {
                            
                        });
                }}
            >
                <Card title={<div style={{ textAlign: 'center' }}>{scenario.name}</div>}
                    bordered={false} >

                    <Form form={form} layout="vertical">
                        <Form.Item
                            label="Load(Threads)"
                            name="un"
                            value={users}
                            style={{ marginBottom: 0, width: '70%' }}
                            rules={[{ required: false, message: 'Please enter user number' }]}
                            onChange={(event)=>{setUsers(event.target.value)}}
                        >
                            <InputNumber min={1} style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            label="Duration (seconds)"
                            name="duration"
                            value={duration}
                            onChange={(event)=>{setDuration(event.target.value)}}
                            style={{ marginBottom: 0, width: '70%' }}
                            rules={[{ required: false, message: 'Please enter duration in seconds' }]}
                        >
                            <InputNumber min={1} step={1} style={{ width: '100%' }} />
                        </Form.Item>

                        {scenario?.steps.map(step => (
                            <div key={step.id}>
                                <Row>

                                    <Col span={18}>
                                        <Checkbox key={step.id}
                                            onChange={() => handleCheckboxChange(step.id)}
                                            checked={selectedSteps.includes(step.id)}
                                        >
                                            {`ID: ${step.id}, Name: ${step.name}, Request Type: ${step.requesttype}`}
                                        </Checkbox>
                                    </Col>
                                    <Col span={4}>
                                        <Form.Item
                                            label="Wtg"
                                            name={`totalThread_${step.id}`}
                                            style={{ marginBottom: 0, width: '70%' }}
                                            rules={[
                                                { required: false, message: 'Please enter total thread count' },
                                                { type: 'number', min: 1, message: 'Thread count must be at least 1' }
                                            ]}
                                            initialValue={1} // Set default value to 1
                                        >
                                            <InputNumber
                                                min={1}
                                                style={{ width: '100%' }}
                                                onChange={(value) => handleThreadCountChange(step.id, value)}
                                            />
                                        </Form.Item>
                                    </Col>

                                </Row>

                            </div>

                        ))}

                    </Form>
                </Card>
            </Modal>
        </div>
    );
};

export default RunScenarioModel;
