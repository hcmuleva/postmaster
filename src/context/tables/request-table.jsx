import { Table, Button } from "antd";
import MethodText from "../../utils/method-text";
import { CaretRightOutlined } from "@ant-design/icons";

function RequestsTable({ items, pagination }) {
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
    {
      title: "Action",
      dataIndex: "",
      key: 4,
      render: () => (
        <Button type="text" onClick={(e) => console.log(e.target)}>
          <CaretRightOutlined />
        </Button>
      ),
    },
  ];

  const expandable = {
    expandedRowRender: (record) => (
      <p
        style={{
          margin: 0,
        }}
      >
        {record.description}
      </p>
    ),
    rowExpandable: (record) => record,
    onExpand: (record, event) => {
      console.log(event);
    },
    expandRowByClick: true,
  };

  return (
    <>
      <Table
        columns={columns}
        rowSelection={true}
        dataSource={items}
        expandable={expandable}
        pagination={pagination}
      />
    </>
  );
}
export default RequestsTable;
