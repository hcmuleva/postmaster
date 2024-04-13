import { Tabs } from "antd";
import JsonViewerComponent from "./json-viewer";
import ResponseHeadersMiniDescription from "../../views/header-mini-description";
function ResponseTabs({ response }) {
    console.log(response);
  const items = [
    {
      key: "1",
      label: "Body",
      children: (
        <JsonViewerComponent
          response={response?.data}
          type={"RESPONSE"}
          subType={"BODY"}
        />
      ),
    },
    {
      key: "2",
      label: "Headers",
      children: <ResponseHeadersMiniDescription headers={response.headers} />,
    },
  ];
  return <Tabs items={items} />;
}
export default ResponseTabs;
