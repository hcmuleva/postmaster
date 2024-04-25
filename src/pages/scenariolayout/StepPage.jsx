import React from 'react';
import { Select, Input, Button, Tabs } from "antd";
import MethodText from '../scenarios/utils/method-text';
import HeaderOptionForm from './HeaderOptionForm';
import RequestBody from './RequestBody';
import RequestResponse from './RequestResponse';
const { Option } = Select;

const methodColors = {
    POST: "yellow",
    GET: "green",
    PUT: "blue",
    DELETE: "red",
  };
  
const StepPage = ({scenariodata,selectedData}) => {
  function handleURLChange(e) {
    selectedData['url']=  e.target;
  }
  const handleUpdateStep=()=>{
  }
  const handleSend=()=>{
  }
  const handleMethodChange=(value)=>{
    selectedData['requsttype']=value;
  }

  const RequestMethodSelect = ({selectedData,requesttype}) => {
    return (<Select defaultValue={requesttype} onChange={handleMethodChange}>
      {Object.keys(methodColors).map((method, index) => 
        {
          return <Option value={method} key={index}>
          <div>
            <MethodText size={"14px"} text={method} />
          </div>
        </Option>}
      )}
    </Select>)
    }
    const items = [
      {
        key: 1,
        label: "Query Params",
        children: <HeaderOptionForm stepdata={selectedData} />,
      },
      {
        key: 2,
        label: "RequestBody",
        children: <RequestBody stepdata={selectedData} />,
      }
    ];
    return (
      <div>
        <form style={{width:'100%', display: "flex", gap: "1rem" }}>
        <Input
          addonBefore={<RequestMethodSelect requesttype={selectedData?.requesttype} />}
          value={selectedData?.url}
          onChange={handleURLChange}
        />
        <Button type="primary" onClick={handleSend}>
          Send
        </Button>
      </form>
      <Tabs items={items}/>
      <RequestResponse stepdata={selectedData} scenariodata={scenariodata}/>
      <Button type="primary" onClick={()=>{
      }}>
          Update
        </Button>
      </div>
      
    );
};

export default StepPage;