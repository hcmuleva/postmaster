import { Table } from "antd";
function VariableTable({ items, pagination }) {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: 1,
    },
    {
      title: "Path",
      dataIndex: "path",
      key: 2,
    },
  ];
  return <Table dataSource={items} columns={columns} pagination={pagination} />;
}

export default VariableTable;
