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
      const scenarios = data.scenarios.map((item, index) => {
        const requests = item.endpoints.map((item, index) =>
          getMenuItem(
            <p style={{ marginBottom: "0" }}>
              <span>{item.name}</span>
            </p>,
            index,
            <MethodText text={item.method} key={index} />,
            null,
            null,
            item
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
