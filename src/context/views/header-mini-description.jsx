import { Descriptions } from "antd";

const ResponseHeadersMiniDescription = ({ headers }) => {
  return (
    <Descriptions title="Response Headers" column={1} bordered>
      {Object.entries(headers).map(([key, value]) => (
        <Descriptions.Item key={key} label={key}>
          {value}
        </Descriptions.Item>
      ))}
    </Descriptions>
  );
};

export default ResponseHeadersMiniDescription;
