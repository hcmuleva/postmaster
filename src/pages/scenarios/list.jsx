import { List as AntdList } from "antd";
import { List, useSimpleList } from "@refinedev/antd";

import ScenarioItem from "./ScenarioItem";
import CustomMenu from "./refine-custom/CustomMenu";
import React, { useContext, useEffect, useState } from "react";
import CustomLayout from "./refine-custom/CustomLayout";
import { AppContextProvider } from "./context";
import { CommunicationContextProvider } from "./context/communication-context";
import useData from "./network/data-provider";
import ScenarioLayout from "../scenariolayout/ScenarioLayout";
import jsdata from "./users.json";
import { TestContext } from "../context";
export const ScenarioContext = React.createContext();

const functionTest = (jsonObject) => {
  let text = JSON.stringify(jsonObject);

  // let text = "This is a {{sample}} string with {{multiple}} values.";
  let myvariables = { sample: "mysimpledata", multiple: "multiplemydata" };

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

  return "functionTest harish ";
};
export const ScenarioList = () => {
  const [scenario, setScenario] = useState(null);
  const emails = jsdata.map((element) => element.email);

  const {
    allScenarios,
    setAllScenarios,
    refetchResources,
    setRefetchResources,
  } = useContext(TestContext);

  const {
    listProps,
    queryResult: { refetch },
  } = useSimpleList({
    resource: "scenarios",
    metaData: { populate: ["steps"] },
    pagination: {
      pageSize: 200,
    },
  });

  useData(listProps.dataSource);

  useEffect(() => {
    const updatedScenarioData = listProps?.dataSource?.map((scenario) => {
      const updatedSteps = scenario.steps.map((step) => ({
        ...step,
        scenarioid: scenario.id,
      }));
      return {
        ...scenario,
        steps: updatedSteps,
      };
    });
    setAllScenarios(updatedScenarioData);
  }, [listProps.dataSource]);

  useEffect(() => {
    refetch();
    setRefetchResources(false);
  }, [refetchResources]);

  if (listProps.loading) {
    return <div>Loading...</div>;
  }
  const value = {
    scenario,
    setScenario,
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
    <div>
      {/* <AppContextProvider>
            <CommunicationContextProvider>
     <CustomLayout scenariosData={listProps.dataSource}/>
     </CommunicationContextProvider>
     </AppContextProvider> */}
      <ScenarioContext.Provider value={value}>
        {allScenarios && <ScenarioLayout scenariodata={allScenarios} />}
      </ScenarioContext.Provider>
    </div>
  );
};
