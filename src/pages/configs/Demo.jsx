import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Tree, Input, Button ,FloatButton} from "antd";

const { Search } = Input;

export const Demo = () => {
  const projectData = [
    {
      title: "Project1",
      key: "Project1",
      children: [
        {
          title: "Create Config",
          key: "CreateConfig1",
          isButton: true,
          onClick: () => console.log("Create Config 1")
        },
        {
          title: "Config11",
          key: "Config11",
          children: [
            {
              title: "Create SDL",
              key: "CreateSDL11",
              isButton: true,
              onClick: () => console.log("Create SDL 11")
            },
            {
              title: "Edit SDL",
              key: "EditSDL11",
              isButton: true,
              onClick: () => console.log("Edit SDL 11")
            },
            {
              title: "Create PERF",
              key: "CreatePERF11",
              isButton: true,
              onClick: () => console.log("Create PERF 11")
            },
            {
              title: "Edit PERF",
              key: "EditPERF11",
              isButton: true,
              onClick: () => console.log("Edit PERF 11")
            },
            // Add similar buttons for FUNCTIONAL and UNIT sections
          ]
        },
        {
          title: "Config12",
          key: "Config12",
          children: [
            // Add buttons and sections for Config12
          ]
        },
        {
          title: "Config13",
          key: "Config13",
          children: [
            // Add buttons and sections for Config13
          ]
        }
      ]
    },
    // Add similar structure for Project2 and Project3
  ];

  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [tree, setTree] = useState(projectData);

  const onExpand = (expandedKeysValue) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue) => {
    setCheckedKeys(checkedKeysValue);
  };

  const onSelect = (selectedKeysValue, info) => {
    setSelectedKeys(selectedKeysValue);
  };

  const onSearch = (value) => {
    setSearchValue(value);
  };

  const renderTitle = (node) => {
    if (node.isButton) {
      return (
        <Button type="link" onClick={node.onClick}>
          {node.title}
        </Button>
      );
    }
    return node.title;
  };

  const renderTreeNode = (data) => {
    return data.map((node) => {
      if (node.children) {
        return {
          ...node,
          title: renderTitle(node),
          children: renderTreeNode(node.children)
        };
      }
      return {
        ...node,
        title: renderTitle(node)
      };
    });
  };

  const renderedTree = renderTreeNode(tree);

  return (
    <div>
      <Search
        style={{ marginBottom: 8 }}
        placeholder="Search"
        onChange={(e) => {
          onSearch(e.target.value);
        }}
      />
      <Tree
        checkable
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        onCheck={onCheck}
        checkedKeys={checkedKeys}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        treeData={renderedTree}
      />
    </div>
  );
};

