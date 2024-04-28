import { Table } from 'antd';
import React from 'react';

const VariablesPage = ({variables}) => {
    const columns = [
        {title: 'Name', dataIndex: 'name', key: 'name'},
        {title: 'Path', dataIndex: 'path', key: 'path'},
        {title: 'Type', dataIndex: 'type', key: 'type'},
        {title: 'Step', dataIndex: 'step', key: 'step'},
        {title: 'Value', dataIndex: 'value', key: 'value'},
    ]
    return (
        <div>
             <Table columns={columns} dataSource={variables}  style={{ fontSize: '8px' }} />
        </div>
    );
};

export default VariablesPage;