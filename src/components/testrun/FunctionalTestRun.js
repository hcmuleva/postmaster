import { Modal,Form,Col, Input,Row, Typography } from 'antd';
import axios from 'axios';
import { InfoCircleOutlined } from '@ant-design/icons';

import React, { useState } from 'react';

const FunctionalTestRun = ({open,setOpen,item}) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const intdata = {
        host: item.host,
        orchestratorpath: item?.testplatformurl??process.env.REACT_APP_ORCHESTRATOR_URL,
    }
    const [formdata, setFormdata] = useState(intdata)
    const { Text } = Typography;
    const handleOk =async()=>{
        const mydata = { data: formdata }
        await axios.post(`${formdata.orchestratorpath}/functional`, mydata)
                .then(response => {
                    console.log('Response:', response);
                     
                    setOpen(false);
                     
                })
                .catch(error => {
                    console.error('Error:', error);

                });
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
                       
                        tooltip={{ title: 'Orchestrator', icon: <InfoCircleOutlined /> }}
                    >
                      <Input  value={formdata.orchestratorpath} onChange={(event) => { setFormdata({ ...formdata, orchestratorpath: event.target.value }) }} />
                
                    </Form.Item>
                </Col>
               
                </Row>
           

        </div>
        </Modal>
    );
};

export default FunctionalTestRun;