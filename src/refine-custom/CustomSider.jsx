import { useEffect, useState } from "react";
import useData from "../network/data-provider";
import MethodText from "../utils/method-text";
import { ScenariosMenuHeading } from "../utils/scenarios-components";
import CustomMenu, { getMenuItem } from "./CustomMenu";
export default function CustomSider() {
  const { data, loading, error } = useData();
  const [scenarios, setSenarios] = useState([]);
  useEffect(() => {
    if (data) {
      const scenarios = data.map((item, index) => {
        const requests = item.steps.map((request_item, index) =>
          getMenuItem(
            <p style={{ marginBottom: "0" }}>
              <span>{request_item.name}</span>
            </p>,
            index,
            <MethodText text={request_item.requesttype} key={index} />,
            null,
            null,
            { ...request_item, scenario_id: item.id }
          )
        );
        return getMenuItem(
          <ScenariosMenuHeading item={item} />,
          index,
          null,
          requests,
          null,
          item
        );
      });
      setSenarios(scenarios);
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <CustomMenu menuData={scenarios}></CustomMenu>
    </div>
  );
}
