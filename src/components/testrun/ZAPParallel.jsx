
import { Modal, Form, Col, Input, Row, Typography, Upload, Divider } from 'antd';
import axios from 'axios';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Select, Space } from 'antd';

import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";

const API_URL = process.env.REACT_APP_API_SERVER;
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;
import React, { useState } from 'react';
import { setInitialFilters } from '@refinedev/core';
const conffiles = Array.from([
    {
        key: "configuration-do-not-mix-code-and-unvalidated-data.conf",
        title: "Do not mix code and unvalidated data",
        description: "configuration-do-not-mix-code-and-unvalidated-data"
    },
    {
        key: "configuration-perform-input-validation.conf",
        title: "Perform Input Validation",
        description: "configuration-perform-input-validation"
    },

    {
        key: "configuration-prevent-cross-site-request-forgery.conf",
        title: "Prevent cross-site request forgery",
        description: "configuration-prevent-cross-site-request-forgery"
    },

    {
        key: "configuration-prevent-cross-site-scripting.conf",
        title: "Prevent cross-site scripting",
        description: "configuration-prevent-cross-site-scripting"
    },

    {
        key: "configuration-prevent-os-command-injection.conf",
        title: "Prevent OS command Injection",
        description: "configuration-prevent-os-command-injection"
    },

    {
        key: "configuration-secure-headers-or-http-security-headers.conf",
        title: "Secure Headers or HTTP Security Headers",
        description: "configuration-secure-headers-or-http-security-headers"
    },

    {
        key: "configuration-session-management.conf",
        title: "Session Management Policy",
        description: "configuration-session-management"
    },

    {
        key: "configuration-prevent-http-splitting-and-smuggling.conf",
        title: "Prevent HTTP splitting and smuggling",
        description: "configuration-prevent-http-splitting-and-smuggling"
    },

    {
        key: "configuration-secure-file-upload.conf",
        title: "Secure File Upload",
        description: "configuration-secure-file-upload"
    },

    {
        key: "configuration-prevent-clickjacking.conf",
        title: "Prevent Clickjacking",
        description: "configuration-prevent-clickjacking.conf"
    },

    {
        key: "configuration-prevent-path-traversal.conf",
        title: "Prevent Path Transversal",
        description: "configuration-prevent-path-traversal"
    }

]);
const ZAPParallel = ({ open, setOpen, item }) => {
    const options = [];
    const openAPIOptions=[]
    const [authToken, setAuthToken]=useState("")
    const [namespace,setNamespace]=useState("")
    item?.openapifiles?.forEach((elm) => { // Use forEach instead of map
        openAPIOptions.push({ label: elm.name, value: elm.url }); // Push objects to the array
    });    
    conffiles.map((elm) => { options.push({ label: elm.title, value: elm.key }) })
    const [controls, setControls] = useState([])
    const [openAPIfile, setOpenAPIfile] = useState([])
    const [apipath,setApipath]=useState(item?.apipath??"")
    const handleChange = (value) => {
        console.log(`selected ${value}`)
        setControls(value)
    };
    const handleOpenAPIChange = (value) => {
        console.log(`selected ${value}`)
        setOpenAPIfile(value)
    };
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [mountpath,setMountpath]=useState(item.mountpath)
    const intdata = {
        host: item.host,
        testplatformurl: item?.testplatformurl ?? process.env.REACT_APP_ORCHESTRATOR_URL,
        
        testprojectpath: item.testprojectpath,
        testprojectversion: item.testprojectversion,
        apipath: item.apipath,
        controls: [],
    }
    const [formdata, setFormdata] = useState(intdata)
   
    

    const [jsonFile, setJsonFile] = useState(null);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setJsonFile(file);
      };
    const handleOk = async (values) => {
        const userobj = localStorage.getItem('user')
        const user = JSON.parse(userobj)
        formdata['openAPIfile'] = openAPIfile
        formdata['configid'] = item.id
        formdata['framework'] = item.framework
        formdata['userid'] = user.id
        formdata['mountpath'] = mountpath
        formdata['controls'] = controls
        formdata['apipath'] =apipath
        formdata['namespace'] = namespace
        formdata['authToken'] = authToken
        console.log("jsonFile",jsonFile)
        const mydata = { data: formdata }
        const myformData = new FormData();
        myformData.append('data', JSON.stringify(formdata)); // Replace with your JSON data
        myformData.append('file', jsonFile);
    
        console.log("mydata", mydata)
        console.log("QW ",formdata.testplatformurl)
        try {
            console.log(formdata.testplatformurl)
            const response = await fetch(`${formdata.testplatformurl}/sdlparallel`, {
              method: 'POST',
              body: myformData,
            });
      
            if (response.ok) {
              // Handle success
              console.log(' Request submitted to testplatform successfully');
            } else {
              // Handle errors
              console.error('Request failed to submit to testplatform');
            }
          } catch (error) {
            console.error('An error occurred:', error);
          }
        // await axios.post(`${formdata.testplatformurl}/sdl`, mydata)
        //   .then(response => {
        //     console.log('Response:', response);
        //     setOpen(false);

        //   })
        //   .catch(error => {
        //     console.error('Error:', error);

        //   });
        setOpen(false);


    }
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    return (
        <Modal
            title="Run Test"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            okText="Run"
            cancelText="Cancel"
        >
            <div>
                <Row>

                    <Col span={10}>
                        <Form.Item
                            label="AUT"
                            tooltip={{ title: 'AUT', icon: <InfoCircleOutlined /> }}
                        >
                            <Input value={formdata.host} onChange={(event) => { setFormdata({ ...formdata, host: event.target.value }) }} />

                        </Form.Item>
                    </Col>
                    <Col span={2}>  </Col>
                    <Col span={10}>
                        <Form.Item
                            label="Orchestrator"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            tooltip={{ title: 'Orchestrator', icon: <InfoCircleOutlined /> }}
                        >
                            <Input value={formdata.testplatformurl} onChange={(event) => { setFormdata({ ...formdata, testplatformurl: event.target.value }) }} />
                        </Form.Item>
                    </Col>

                    <Col span={2}>  </Col>

                    <Col span={2}>  </Col>
                   

                </Row>
                <Row>
                    <Col span={10}>
                        <Form.Item
                            label="Select OpenAPI"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            tooltip={{ title: 'ZAP require config to run it', icon: <InfoCircleOutlined /> }}
                        >
                            <Select
                                mode="single"
                                allowClear
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Please select"
                                defaultValue={openAPIfile}
                                onChange={handleOpenAPIChange}
                                options={openAPIOptions}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={3}><h3> OR</h3> </Col>
                    <Col span={10}>
                    <label htmlFor="jsonFile">Open API File</label>
        <input
          type="file"
          id="jsonFile"
          accept=".json"
          onChange={handleFileChange}
        />
                    </Col>
                    <Col span={2}></Col>
                    <Col span={10}>
                        <Form.Item
                            label="API path(e.g :=> /contentmgmt)"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            tooltip={{ title: 'API path', icon: <InfoCircleOutlined /> }}
                        >                           
                            <Input value={apipath} onChange={(event) => {setApipath(event.target.value)}} />
                        </Form.Item>
                    </Col>  
                </Row>
                <Row>
                    <Col span={20}>
                        <Form.Item
                            label="Select Config"
                            tooltip={{ title: 'ZAP require config to run it', icon: <InfoCircleOutlined /> }}
                        >

                           
                            <Select
                                mode="multiple"
                                allowClear
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Please select"
                                defaultValue={conffiles[0]}
                                onChange={handleChange}
                                options={options}
                            />
                        </Form.Item>
                    </Col>
                             
                </Row>
                <Row>
                   

                </Row>
                <Row>
                    <Col span={20}>
                        <Form.Item
                            label="Mount path"
                            tooltip={{ title: 'Mount path', icon: <InfoCircleOutlined /> }}
                        >

                           
                            <Input value={mountpath} onChange={(event) => {setMountpath(event.target.value)}} />
                        </Form.Item>
                    </Col>

                </Row>
            </div>
            <div>
        
      </div>
      <Divider/>
      <Row>
            <Col span={10}>
                <Form.Item
                    label="Bearer Token"
                    tooltip={{ title: 'Bearer Token', icon: <InfoCircleOutlined /> }}
                >
                    <Input value={authToken} onChange={(event) => { setAuthToken(event.target.value) }} />

                </Form.Item>
            </Col>
            <Col span={10}>
                <Form.Item
                    label="Name Space"
                    tooltip={{ title: 'Name Space', icon: <InfoCircleOutlined /> }}
                >
                    <Input value={namespace} onChange={(event) => { setNamespace(event.target.value) }} />

                </Form.Item>
            </Col>
            </Row>

        </Modal>
    );
};

export default ZAPParallel;