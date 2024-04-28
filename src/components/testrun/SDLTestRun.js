import { Modal, Form, Col, Input, Row, Typography } from 'antd';
import axios from 'axios';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Select, Space } from 'antd';

import React, { useState } from 'react';
import KARATESDLRun from './KARATESDLRun';
import ZAPSDLRun from './ZAPSDLRun';
import PYTHONSDLRun from './PYTHONSDLRun';
import GitleaksRun from './GitleaksRun';
const SDLTestRun = ({ open, setOpen, item }) => {
  const [zapParallel,setZapParallel]=useState(false);
  // Now create a radio button with option single or parallel and if parallel is selected then show the input box to enter the number of parallel runs
  const handleZapParallel=(e)=>{
    console.log("e",e)
    setZapParallel(e)
  } 
  //Create a form
  if(item.framework === "KARATE"){
    return <KARATESDLRun open={open} setOpen={setOpen} item={item}/>
  }else if(item.framework === "PYTHON"){
    return <PYTHONSDLRun open={open} setOpen={setOpen} item={item}/>
  } else if (item.framework === "GITLEAKS") {
    return <GitleaksRun open={open} setOpen={setOpen} item={item}/>
  } else {
    
    return <ZAPSDLRun open={open} setOpen={setOpen} item={item}/>
  }
  
};

export default SDLTestRun;