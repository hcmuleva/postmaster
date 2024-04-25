import React, { useState } from 'react';
import { useTable } from "@refinedev/core";
import { Modal, Table, Space, Select, Typography, Input } from "antd";

const { Text } = Typography;
const { Option } = Select;

const SDLReport = () => {
    const [selectedColumn, setSelectedColumn] = useState("");
    const [searchText, setSearchText] = useState("");

    const { tableQueryResult } = useTable({
        initialSorter: [
            {
                field: "id",
                order: "desc",
            },
        ],
        resource: "sdlresults",
        metaData: { populate: ["config", "userid"] },
    });

    const tableProps = tableQueryResult?.data?.data;
    console.log("tableProps", tableProps);

    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
            sorter: (a, b) => a.id - b.id,
            sortDirections: ["ascend", "descend"],
        },
        {
            title: "Service",
            dataIndex: "apipath",
            key: "apipath",
            sorter: (a, b) => a.apipath.localeCompare(b.apipath),
            sortDirections: ["ascend", "descend"],
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            sorter: (a, b) => a.status.localeCompare(b.status),
            sortDirections: ["ascend", "descend"],
        },
        {
            title: "Environment",
            dataIndex: "aut",
            key: "aut",
            sorter: (a, b) => a.aut.localeCompare(b.aut),
            sortDirections: ["ascend", "descend"],
        },
        {
            title: "Control",
            dataIndex: "control",
            key: "control",
            sorter: (a, b) => a.control.localeCompare(b.control),
            sortDirections: ["ascend", "descend"],
        },
        {
            title: "User",
            dataIndex: "userid",
            key: "userid",
            render: (userid) => userid?.email || "",
            sorter: (a, b) => a.userid.email.localeCompare(b.userid.email),
            sortDirections: ["ascend", "descend"],
        },
        {
          title: "runid",
          dataIndex: "runid",
          key: "runid",
          sorter: (a, b) => a.runid - b.runid,
          sortDirections: ["ascend", "descend"],
      },
        {
            title: "RunTime",
            dataIndex: "createdAt",
            key: "createdAt",
            sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
            sortDirections: ["ascend", "descend"],
        },
        {
            title: "Duration(HH:MM:SS:ms)",
            dataIndex: "duration",
            key: "duration",
            sorter: (a, b) => a.duration - b.duration,
            sortDirections: ["ascend", "descend"],
        },
        {
            title: "Report",
            dataIndex: "reporturl",
            key: "reporturl",
            render: (reporturl) => <a href={reporturl} target="_blank">Report</a>,
        },
    ];

    const handleSearch = (e) => {

        setSearchText(e.target.value);
    };

    const handleColumnSelect = (value) => {
        setSelectedColumn(value);
    };

    const filteredTableProps = tableProps?.filter((record) => {
        const fieldValue = record[selectedColumn]?.toString().toLowerCase();
        return fieldValue && fieldValue.includes(searchText.toLowerCase());
    });
    console.log("Single", Single)
    return (
        <div style={{ width: "100%", overflowX: "auto" }}>
            <Space>
                <Text strong>Filters:</Text>
                <Select value={selectedColumn} style={{ width: 200 }} onChange={handleColumnSelect} placeholder="Select Filter">
                    {columns.map((column) => (
                        <Option key={column.dataIndex} value={column.dataIndex}>
                            {column.title}
                        </Option>
                    ))}
                </Select>
                <Text strong>Search:</Text>
                <Input type="text" value={searchText} onChange={handleSearch} placeholder="Search"/>
            </Space>
            <Table
                dataSource={selectedColumn ? filteredTableProps : tableProps}
                bordered
                columns={columns}
                scroll={{ x: "min-content" }}
            />
        </div>
    );
};

export default SDLReport;
