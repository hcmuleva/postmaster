import React from 'react';

const FileDownloadGolang = ({open,setOpen,item}) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const userobj = localStorage.getItem('user')
        const user = JSON.parse(userobj)
       
    const intdata = {
        threads: 1,
        url: '',
        orchestratorpath:process.env.REACT_APP_ORCHESTRATOR_URL,
    }
    const [formdata, setFormdata] = useState(intdata)
    const { Text } = Typography;
    const handleOk =async()=>{
        formdata['configid'] = item.id
        formdata['users_permissions_user'] = user.id
        const mydata = { data: formdata }
        await axios.post(`${formdata.orchestratorpath}/filedownload`, mydata)
                .then(response => {
                    console.log('Response:', response);
                     
                    setOpen(false);
                     
                })
                .catch(error => {
                    console.error('Error:', error);

                });
        setOpen(false);

    }
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
                <Col span={10}>
                <Form.Item      
                        tooltip={{ title: 'Total Threads', icon: <InfoCircleOutlined /> }}
                    >
                      <Input  value={formdata.threads} onChange={(event) => { setFormdata({ ...formdata, threads: event.target.value }) }} />
                    </Form.Item>
                </Col>
                <Col span={10}>
                <Form.Item      
                        tooltip={{ title: 'file dowmload url', icon: <InfoCircleOutlined /> }}
                    >
                      <Input  value={formdata.url} onChange={(event) => { setFormdata({ ...formdata, url: event.target.value }) }} />
                    </Form.Item>
                </Col>
                </Row>
        </div>
        </Modal>
    );
};

export default FileDownloadGolang;