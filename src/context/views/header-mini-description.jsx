import { Descriptions } from "antd";

const ResponseHeadersMiniDescription = ({ headers }) => {
  if (!headers)
    return (
      <div>
        <h5>No Data</h5>
      </div>
    );
  return (
    headers && (
      <Descriptions column={1} bordered>
        {Object.entries(headers).map(([key, value]) => (
          <Descriptions.Item key={key} label={key}>
            {value}
          </Descriptions.Item>
        ))}
      </Descriptions>
    )
  );
};

export default ResponseHeadersMiniDescription;
