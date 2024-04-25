import React, { use, useEffect } from 'react';
import ScenarioPage from './ScenarioPage';
import StepPage from './StepPage';

const CenterPanel = ({scenariodata,selectedData, selectiontype}) => {
   const getComponent= ()=>{
        if(selectiontype === "STEP"){
            return (
               <StepPage scenariodata={scenariodata} selectedData={selectedData}/>
            );
        }
        if(selectiontype === "SCENARIO"){
            return (
                <ScenarioPage scenariodata={scenariodata} selectedData={selectedData} />
            );
        }
    } 
    useEffect(() => {
        getComponent();
    }, [selectiontype,selectedData]);
    return (
        <div>
            {getComponent()}
        </div>
    );
    

    
};

export default CenterPanel;