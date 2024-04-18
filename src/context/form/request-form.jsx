import { Select, Input, Button } from "antd";
import MethodText, { getAllMethods } from "../../utils/method-text";
import { useContext, useEffect } from "react";
import useRequestHandler from "../../network/request-handler";
import { CommunicationContext } from "../communication-context";
import { FileAddOutlined } from "@ant-design/icons";
import { AppContext } from "..";
import { Tooltip } from "antd";

const { Option } = Select;
export default function RequestForm() {
  const { setScenarioRequest, unsavedRequest } = useContext(AppContext);
  const { data, fetchData } = useRequestHandler();
  const { requestBody, headerOptions, setCurrentResponse } =
    useContext(CommunicationContext);

  const handleMethodChange = (value) => {
    setScenarioRequest({ ...unsavedRequest, requesttype: value });
  };

  const RequestMethodSelect = () => (
    <Select
      defaultValue={unsavedRequest?.requesttype}
      onChange={handleMethodChange}
    >
      {getAllMethods().map((method, index) => (
        <Option value={method} key={index}>
          <div>
            <MethodText size={"14px"} text={method} />
          </div>
        </Option>
      ))}
    </Select>
  );

  function saveChanges() {
    setScenarioRequest(unsavedRequest, "UPDATE");
  }

  function handleURLChange(e) {
    const { value } = e.target;
    setScenarioRequest({ ...unsavedRequest, url: value });
  }

  function handleSend() {
    fetchData(unsavedRequest, headerOptions, requestBody);
  }

  useEffect(() => {
    if (data) {
      setCurrentResponse(data, "UPDATE");
    }
  }, [data]);

  return (
    <form style={{ display: "flex", gap: "1rem" }}>
      <Input
        addonBefore={<RequestMethodSelect />}
        value={unsavedRequest?.url}
        onChange={handleURLChange}
      />

      <Tooltip placement="bottom" title={"Save"}>
        <Button type="default" onClick={saveChanges}>
          <FileAddOutlined />
        </Button>
      </Tooltip>
      <Button type="primary" onClick={handleSend}>
        Send
      </Button>
    </form>
  );
}
