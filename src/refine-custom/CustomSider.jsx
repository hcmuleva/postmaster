import MethodText from "../utils/method-text";
import CustomMenu, { getMenuItem } from "./CustomMenu";
export default function CustomSider({ scenariosData, setCurrentContext }) {
  const scenarios = scenariosData.scenarios.map((item, index) => {
    const requests = item.endpoints.map((item, index) =>
      getMenuItem(
        <p>{item.name}</p>,
        index,
        <MethodText text={item.method} key={index} />,
        null,
        null,
        item
      )
    );
    return getMenuItem(item.name, index, null, requests, null, item);
  });
  return (
    <div>
      <CustomMenu
        menuData={scenarios}
        setCurrentContext={setCurrentContext}
      ></CustomMenu>
    </div>
  );
}
