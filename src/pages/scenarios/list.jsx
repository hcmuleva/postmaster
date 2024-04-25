import { List as AntdList } from "antd";
import { List,useSimpleList  } from "@refinedev/antd";

import ScenarioItem from "./ScenarioItem";
import CustomMenu from "./refine-custom/CustomMenu";
import React,{ useState } from "react";
import CustomLayout from "./refine-custom/CustomLayout";
import { AppContextProvider } from "./context";
import { CommunicationContextProvider } from "./context/communication-context";
import useData from "./network/data-provider";
import ScenarioLayout from "../scenariolayout/ScenarioLayout";
import jsdata from "./users.json"   
export const ScenarioContext = React.createContext();

const functionTest=(jsonObject)=>{
    let text = JSON.stringify(jsonObject);

   // let text = "This is a {{sample}} string with {{multiple}} values.";
let myvariables = {'sample':'mysimpledata', 'multiple':'multiplemydata'};

// Regular expression pattern to match values between {{ and }}
let pattern = /\{\{([^}]+)\}\}/g;

// Find all matches
let matches = text.match(pattern);

// Replace matches with values from myvariables
let replacedText = text.replace(pattern, (match, key) => {
    // Check if the key exists in myvariables
    if (myvariables.hasOwnProperty(key)) {
        // Replace the match with the corresponding value from myvariables
        return myvariables[key];
    }
    // If key not found, return the original match
    return match;
});

console.log(replacedText);
    return "functionTest harish ";
}
export const ScenarioList = () => {
    const[scenario,setScenario]=useState(null);
    const [currentContext, setCurrentContext] = useState(null);
    const emails = jsdata.map(element => element.email);

    
    const { listProps } = useSimpleList({
        resource: "scenarios",
        metaData: { populate: ["steps"] },
        pagination: {
            pageSize: 200,
          },
    });
    console.log("listProps",listProps)
    const [scenarios, setSenarios] = useState([]);
    useData(listProps.dataSource);
    
    if(listProps.loading){
        console.log("scenariosData is loading")
        return <div>Loading...</div>
    }
    const value = {
        scenario,
        setScenario
    };

    
    return (

        // <div>
           
        //     <List >
        //         <AntdList
        //             grid={{ gutter: 16, xs: 1 }}
        //             style={{
        //                 justifyContent: "center",
        //             }}
        //             {...listProps}
        //             renderItem={(item) => {
        //                 return <AntdList.Item>
        //                     <ScenarioItem item={item} />
        //                 </AntdList.Item>
        //             }}
        //         />
        //     </List>

        // </div>
        <div >
            {/* <AppContextProvider>
            <CommunicationContextProvider>
     <CustomLayout scenariosData={listProps.dataSource}/>
     </CommunicationContextProvider>
     </AppContextProvider> */}
        <ScenarioContext.Provider value={value} >  
     {listProps.dataSource&&<ScenarioLayout scenariodata={listProps.dataSource}/>}
     </ScenarioContext.Provider>
    </div>
    )
}