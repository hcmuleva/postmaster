import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Popconfirm, Table } from "antd";
import { CommunicationContext } from "../communication-context";
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};
const HeaderOptionForm = () => {
  const { headerOptions, setCurrentHeaderOptions } =
    useContext(CommunicationContext);
  const [count, setCount] = useState(2);
  const handleDelete = (key) => {
    const newData = headerOptions.filter((item) => item.key !== key);
    setCurrentHeaderOptions(newData, "UPDATE");
  };
  const defaultColumns = [
    {
      title: "Key",
      dataIndex: "key",
      width: "30%",
      editable: true,
    },
    {
      title: "Value",
      dataIndex: "value",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) =>
        headerOptions.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];
  const handleAdd = () => {
    const newData = {
      key: "Accept",
      value: "*/*",
    };
    setCurrentHeaderOptions([...headerOptions, newData], "UPDATE");
    setCount(count + 1);
  };
  const handleSave = (row) => {
    const newData = [...headerOptions];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setCurrentHeaderOptions(newData, "UPDATE");
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const rowSelection = {
    //! need to add selection options
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <h5>Query Params</h5>
        <Button
          onClick={handleAdd}
          type="primary"
          style={{
            marginBottom: 10,
            marginTop: 10,
          }}
        >
          Add New
        </Button>
      </div>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={headerOptions}
        columns={columns}
        pagination={null}
        rowSelection={{ type: "checkbox", ...rowSelection }}
      />
    </div>
  );
};
export default HeaderOptionForm;
