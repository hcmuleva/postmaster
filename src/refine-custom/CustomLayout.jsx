import { Layout } from "antd";
import CustomSider from "./CustomSider";
import scenariosData from "../mock/scenarios.json";
import { useState } from "react";
import CustomContextProvider from "../context";
const CustomLayout = () => {
  const [currentContext, setCurrentContext] = useState(null);
  return (
    <Layout style={{ display: "flex", flexDirection: "row" }}>
      <CustomSider
        scenariosData={scenariosData}
        setCurrentContext={setCurrentContext}
      />
      <Layout.Content>
        <CustomContextProvider currentContext={currentContext} />
      </Layout.Content>
    </Layout>
  );
};

export default CustomLayout;
