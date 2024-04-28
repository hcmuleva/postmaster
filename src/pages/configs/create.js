import { Create, useForm } from "@refinedev/antd";
import { mediaUploadMapper } from "@refinedev/strapi-v4";
import { Col, Form, Radio, Row } from 'antd';
import { useEffect, useState } from "react";
import CreateConfigForm from './CreateConfigForm';
import SDLConfigForm from "./SDLConfigForm";

const API_URL = process.env.REACT_APP_API_SERVER
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY

export const ConfigCreate = () => {
    const testingType = ["FUNCTIONAL","UNIT","PERFORMANCE","SDL"];
    
    const { formProps, saveButtonProps } = useForm();
    const intdata = {

        name: "",
        project: "",
        host: "",
        testplatformurl: "",
        jmxfile: null,
    }
    const [formdata, setFormdata] = useState(intdata)
    const [testtypeval, setTesttypeval] = useState('PERFORMANCE');
    const onChangeTestType = ({ target: { value } }) => {
        setTesttypeval(value);
      };
      const onChangeAutType = ({ target: { value } }) => {
        setAppTypeVal(value);
      };
      console.log("testtypeval",testtypeval)
      const getComponent=()=>{
        if(testtypeval === 'SDL'){
            console.log("Inside SDL")
            return <SDLConfigForm formdata={formdata} setFormdata={setFormdata} />
        }else{  
            console.log("Inside OTHER")
            return <CreateConfigForm testtypeval={testtypeval}/>
        }
        }
     
    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical" onFinish={async (values) => {
                try {
                    formProps.onFinish?.(mediaUploadMapper(values));
                    setFormdata(intdata)
                } catch (error) {
                    
                }
            }}>
                <Row>

                <Col span={16}>
                <Form.Item
                        label="TestingType"
                        name="type"
                        initialValue={testtypeval} // Use initialValue instead of defaultValue
                        
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                      <Radio.Group options={testingType} onChange={onChangeTestType} value={testtypeval} />  
                      
                    </Form.Item>
 
            </Col>
            </Row>
           
                <Row>
                   
                    {getComponent()}
                </Row>
            </Form>
        </Create>
    )
};
