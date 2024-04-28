import {
  Button,
  Card,
  Divider,
  Form,
  Modal,
  Select,
  Space,
  Table,
  Tabs,
} from "antd";
import { useContext, useEffect, useState } from "react";
import CreateStep from "./CreateStep";
import axios from "axios";
import moment from "moment";
import { DeleteButton } from "@refinedev/antd";
import RequestResponse from "./RequestResponse";
import VariablesPage from "./VariablesPage";
import { TestProvider } from "../context";
const { TabPane } = Tabs;

const ScenarioPage = ({ selectedData }) => {
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [steps, setSteps] = useState(selectedData?.steps ?? []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [stepdata, setStepData] = useState(null);

  const runAxioStep = async (method, url, mydata, header) => {
    const start = moment();
    const data = JSON.parse(mydata);
    try {
      const response = await axios.post(url, { data }, { headers: header });
      const end = moment();
      const duration = moment.duration(end.diff(start));

      return {
        headers: response.headers,
        data: response.data,
        timeTaken: duration.asMilliseconds(), // time taken in milliseconds
      };
    } catch (error) {
      throw error;
    }
    // Implement your logic to run the step here
  };
  const runStep = (step) => {
    const { requesttype, url, payload, header } = step;
    runAxioStep(requesttype, url, payload, header)
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  };

  const openModal = (scenario) => {
    setSelectedScenario(scenario);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOnOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setIsModalOpen(false);
      })
      .catch((info) => {});
  };
  const GetTable = () => {
    if (!selectedData) {
      return <></>;
    }
    if (selectedData) {
      return (
        <Table
          columns={columns}
          dataSource={selectedData.steps}
          rowKey="id"
          style={{ fontSize: "8px" }}
        />
      );
    }
  };
  useEffect(() => {}, [selectedData, selectedData?.steps]);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => <div style={{ fontSize: "12px" }}>{text}</div>,
    },
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
      render: (text) => <div style={{ fontSize: "12px" }}>{text}</div>,
    },
    {
      title: "Request Type",
      dataIndex: "requesttype",
      key: "requestType",
      render: (text) => <div style={{ fontSize: "12px" }}>{text}</div>,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <Space>
            <Button
              size="middle"
              icon={
                <img
                  src="runid.png"
                  alt="Run"
                  style={{ width: "1em", height: "1em", marginRight: "0.5em" }}
                />
              }
              onClick={() => runStep(record)}
            >
              Run
            </Button>
            <DeleteButton
              key="delete"
              resource="steps"
              recordItemId={record.id}
              onSuccess={(value) => {
                selectedData.steps = selectedData.steps.filter(
                  (item) => item.id !== value.data.data.id
                );
              }}
            />
            <Button
              size="middle"
              icon={
                <img
                  src="runid.png"
                  alt="Run"
                  style={{ width: "1em", height: "1em", marginRight: "0.5em" }}
                />
              }
              onClick={() => {
                setStepData(record);
              }}
            >
              Details
            </Button>
          </Space>
        </>
      ),
    },
  ];
  return (
    <div>
      {selectedData && (
        <Card title={selectedData.name}>
          <p>{selectedData.description}</p>

          <Tabs defaultActiveKey="1">
            <TabPane tab="Steps" key="1">
              <VariablesPage variables={selectedData.variables} />
              <Button onClick={() => openModal(null)}>Add Step</Button>
              <Modal
                title="Step Create"
                open={isModalOpen}
                onCancel={closeModal}
                onOk={handleOnOk}
              >
                {selectedData && (
                  <CreateStep
                    scenarioid={selectedData.id}
                    setIsModalOpen={setIsModalOpen}
                    selectedData={selectedData}
                  />
                )}
              </Modal>
              <GetTable />
              <Divider />
              {stepdata && (
                <RequestResponse
                  scenariodata={selectedData}
                  stepdata={stepdata}
                />
              )}
            </TabPane>
            <TabPane tab="Functional" key="2">
              {/* Content of the Functional tab */}
            </TabPane>
            <TabPane tab="Performance" key="3">
              {/* Content of the Performance tab */}
            </TabPane>
          </Tabs>
        </Card>
      )}
    </div>
  );
};

export default ScenarioPage;
