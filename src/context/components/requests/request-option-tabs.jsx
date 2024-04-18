import { useContext, useEffect } from "react";
import CustomTabs from "../../../refine-custom/CustomTabs";
import RequestBody from "./request-body";
import RequestHeaderOptions from "./request-header-option";
import { AppContext } from "../..";
import { CommunicationContext } from "../../communication-context";

function RequestTabs() {
  const { request } = useContext(AppContext);
  const { setCurrentHeaderOptions, setCurrentRequestBody } =
    useContext(CommunicationContext);
  const { payload, header } = request;
  useEffect(() => {
    setCurrentHeaderOptions(header);
    setCurrentRequestBody(payload);
  }, []);
  const items = [
    {
      key: 1,
      label: "Query Params",
      children: <RequestHeaderOptions />,
    },
    {
      key: 2,
      label: "Body",
      children: <RequestBody />,
    },
  ];
  return <CustomTabs items={items} />;
}
export default RequestTabs;
