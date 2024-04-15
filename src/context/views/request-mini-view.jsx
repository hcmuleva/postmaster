import MethodText from "../../utils/method-text";
import { Descriptions } from "antd";

function RequestMiniView({ requestData }) {
  const { name, url, description, method } = requestData;
  const descriptionItems = [
    {
      key: 1,
      label: "Name",
      children: <p>{name}</p>,
    },
    {
      key: 2,
      label: "URL",
      children: <p>{url}</p>,
    },
    {
      key: 3,
      label: "Method",
      children: <MethodText text={method} />,
    },
    {
      key: 4,
      label: "Description",
      children: <p>{description}</p>,
    },
  ];
  return (
    <>
      <Descriptions
        colon={false}
        column={1}
        title={name}
        items={descriptionItems}
      />
    </>
  );
}

export default RequestMiniView;
