import { Layout } from "antd";
import CustomSider from "./CustomSider";
import ContextView from "../context/layout/context-view";
import { useContext, useMemo } from "react";
import { AppContext } from "../context";
import RequestLayout from "../context/layout/request-layout";
import ScenarioLayout from "../context/layout/scenario-layout";
import WelcomePage from "../utils/loading";

const CustomLayout = () => {
  const { currentContext } = useContext(AppContext);

  const renderComponent = useMemo(() => {
    switch (currentContext) {
      case "REQUEST":
        return <RequestLayout />;
      case "SCENARIO":
        return <ScenarioLayout />;
      default:
        return <WelcomePage />;
    }
  }, [currentContext]);

  return (
    <Layout style={{ display: "flex", flexDirection: "row" }}>
      <CustomSider />
      <Layout.Content>
        <ContextView>{renderComponent}</ContextView>
      </Layout.Content>
    </Layout>
  );
};

export default CustomLayout;
