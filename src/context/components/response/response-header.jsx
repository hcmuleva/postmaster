import { useContext } from "react";
import { CommunicationContext } from "../../communication-context";
import "../../../styles/response-header.css";
import RequestStatus from "./response-status";
function ResponseHeader() {
  const { response } = useContext(CommunicationContext);
  console.log(response);

  if (!response) {
    return <div>Response Header</div>;
  }

  return (
    <div className="response-header">
      <div>
        <p>{response?.metadata?.timeTaken} ms</p>
      </div>
      <div>{response?.metadata?.responseBodySize + "B"}</div>
      <RequestStatus code={response?.status} message={response?.message} />
    </div>
  );
}

export default ResponseHeader;
