import React, { useState, useEffect } from 'react';
import { Button, Layout, Menu } from "antd";
import MethodText from '../scenarios/utils/method-text';
import { ScenariosMenuHeading } from '../scenarios/utils/scenarios-components';
import CenterPanel from './CenterPanel';
import CreateScenario from './CreateScenario';
const ScenarioLayout = ({ scenariodata }) => {
    const [scenarios, setSenarios] = useState([]);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [selectiontype, setSelectionType] = useState("SCENARIO");
    const [selectedData, setSelectedData] = useState(scenariodata[0]);
    if (!scenariodata && scenariodata.length === 0) {
        return <div>Loading...</div>;
    }
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const addScenario = (scenario) => {
        setSenarios(prevScenarios => [...prevScenarios, scenario]);
    };
    useEffect(() => {
        if (scenariodata) {
            const scenarios = scenariodata.map((item, index) => {
                const requests = item.steps.map((step, step_index) =>

                    getMenuItem(
                        <p style={{ marginBottom: "0" }}>
                            <span>{step.name}</span>
                        </p>,
                        step_index,
                        <MethodText text={step.requesttype} key={step_index} />,
                        null,
                        null,
                        { ...step, scenarioid: item.id, scenarioName: item.name, variables: item.variables }
                    )
                );
                return getMenuItem(

                    <Button type="text" onClick={() => {
                        setSelectionType("SCENARIO")
                        setSelectedData(item)
                    }}>{item.name}</Button>,
                    index,
                    null,
                    requests,
                    null,
                    item
                );
            });
            setSenarios(scenarios);
        }
    }, [scenariodata]);

    const { Sider } = Layout;
    function getMenuItem(label, key, icon, children, type, data) {
        return {
            key,
            icon,
            children,
            label,
            type,
            "data-custom-value": data,
        };
    }

    return (

        <div style={{ display: 'flex' }}>
            <CreateScenario isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} addScenario={addScenario}/>
            <Layout>

                <Sider width={180} style={{ marginTop: 0 }}>
                    <Button
                        type="text"
                        onClick={() => {
                            setIsModalOpen(true)
                        }}
                        style={{
                            backgroundColor: 'orange',
                            color: 'white',
                            width: '100%', // reduce size to 60% of the parent's width, which is 40% less
                            margin: '0 auto', // center the button
                        }}
                    >
                        Add
                    </Button>
                    <Menu
                        mode="inline"
                        style={{ height: '100vh', borderRight: 0 }}
                        items={scenarios}
                        onClick={(e) => {
                            setSelectionType("STEP")
                            setSelectedData(e.item.props['data-custom-value'])
                        }}
                    />
                </Sider>
                <div style={{ marginLeft: 20, width: "110vh" }}>
                    <CenterPanel scenariodata={scenariodata} selectedData={selectedData} selectiontype={selectiontype} />
                </div>
            </Layout>
        </div>
    );
};

export default ScenarioLayout;