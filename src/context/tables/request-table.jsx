import { Table } from "antd";
import MethodText from "../../utils/method-text";

function RequestsTable({ items }) {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: 1,
    },
    {
      title: "Method",
      dataIndex: "method",
      key: 2,
      render: (text) => <MethodText text={text} />,
    },
    {
      title: "URL",
      dataIndex: "url",
      key: 3,
    },
  ];

  return (
    <>
      <Table columns={columns} />
    </>
  );
}
export default RequestsTable;
