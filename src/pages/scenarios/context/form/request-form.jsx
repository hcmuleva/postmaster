import { Select, Input, Button } from "antd";
import MethodText, { getAllMethods } from "../../utils/method-text";
import { useContext, useEffect } from "react";
import useRequestHandler from "../../network/request-handler";
import { CommunicationContext } from "../communication-context";
import { AppContext } from "..";

const { Option } = Select;
export default function RequestForm() {
  const { setScenarioRequest, request } = useContext(AppContext);
  const { data, fetchData } = useRequestHandler();
  const { requestBody, headerOptions, setCurrentResponse } =
    useContext(CommunicationContext);

  const handleMethodChange = (value) => {
    setScenarioRequest({ ...request, method: value });
  };

  const RequestMethodSelect = () => (
    <Select defaultValue={request?.method} onChange={handleMethodChange}>
      {getAllMethods().map((method, index) => (
        <Option value={method} key={index}>
          <div>
            <MethodText size={"14px"} text={method} />
          </div>
        </Option>
      ))}
    </Select>
  );

  function handleURLChange(e) {
    const { value } = e.target;
    setScenarioRequest({ ...request, url: value });
  }

  function handleSend() {
    fetchData(request, headerOptions, requestBody);
  }

  useEffect(() => {
    setCurrentResponse(data);
  }, [data]);

  return (
    <form style={{ display: "flex", gap: "1rem" }}>
      <Input
        addonBefore={<RequestMethodSelect />}
        value={request?.url}
        onChange={handleURLChange}
      />
      <Button type="primary" onClick={handleSend}>
        Send
      </Button>
    </form>
  );
}
