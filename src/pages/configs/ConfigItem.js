import FunctionalTestRun from '../../components/testrun/FunctionalTestRun';
import { PlayCircleOutlined } from '@ant-design/icons';
import { useTheme } from '@emotion/react';
import { DeleteButton, EditButton } from "@refinedev/antd";
import { Card,Button,Row,Col, Space } from "antd";
import { InternalBreadcrumbItem } from 'antd/es/breadcrumb/BreadcrumbItem';
import { useState } from 'react';
import ModalRun from "./ModalRun";
import UnitTestRun from '../../components/testrun/UnitTestRun';
import SDLTestRun from '../../components/testrun/SDLTestRun';
import PerformanceTestRun from '../../components/testrun/PerformanceTestRun';
import ZAPParallel from '../../components/testrun/ZAPParallel';
const { Meta } = Card;
export const ConfigItem = ({ item }) => {
    const [open, setOpen] = useState(false);
    const [runtype, setRuntype] = useState("SINGLE");
    const style = { padding: '8px 0' };
    const projectname=item?.project?.name
    console.log("item",item)
    console.log("item auttype", item.project.auttype)
    const filearray=item?.filearray??[];
    const [loading, setLoading] = useState(false);
    return (
        <>
              {item.type==="PERFORMANCE"?<PerformanceTestRun open={open} setOpen={setOpen} item={item} />:""}
              {item.type==="FUNCTIONAL"?<FunctionalTestRun open={open} setOpen={setOpen} item={item} />:""}
              {item.type==="UNIT"?<UnitTestRun open={open} setOpen={setOpen} item={item} />:""}
              {item.type==="SDL"&&runtype==="SINGLE"?<SDLTestRun open={open} setOpen={setOpen} item={item} />:""}
              {item.type==="SDL"&&runtype==="PARALLEL"?<ZAPParallel open={open} setOpen={setOpen} item={item} />:""}
            
            <Card
                style={{ width: 300 }}
                title={`Config Name : ${item.name}`}
                actions={[
                    <EditButton key="edit" recordItemId={item.id} />,
                    <Space/>,
                    <Button type="primary" danger ghost  loading={loading} onClick={()=>{  
                        console.log("open state",open)
                        setRuntype("PARALLEL")  
                        setOpen(true)
                        }}>ParallelRun</Button>,
                        <Space/>,
                    <Button type="primary"  loading={loading} onClick={()=>{  
                        console.log("open state",open)
                        setOpen(true)  }}>Run</Button>
                ]}
            >
                    <Row><Col span={10}><b>TestType:</b></Col><Col span={12}>{item.type}</Col></Row>
                    <Row><Col span={10}><b>Project:</b></Col><Col span={12}>{projectname}</Col></Row>
                    <Row><Col span={10}><b>AUT:</b></Col><Col span={12}>{item.host}</Col></Row>
                    <Row><Col span={10}><b>Orchestrator:</b></Col><Col span={12}>{item.testplatformurl}</Col></Row>
                    {/* <Row><Col span={10}><b>JMX file:</b></Col><Col span={12}>{jmxfile?item.jmxfile.name:""}</Col></Row> */}
                   {item.type==="PERFORMANCE"? <Row><Col span={10}><b>Files for download:</b></Col><Col span={12}>{filearray.length}</Col></Row> :""}       
            </Card>
        </>
    );
};
