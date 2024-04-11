import CustomTabs from "../../../refine-custom/CustomTabs";
import RequestBody from "./request-body";
import RequestHeaderOptions from "./request-header-option";

function RequestTabs() {
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
