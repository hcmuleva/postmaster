import { useContext } from "react";
import { CommunicationContext } from "../communication-context";
import JsonViewerComponent from "../components/response/json-viewer";
import ResponseHeader from "../components/response/response-header";
import ResponseView from "../components/response/response-view";
import ResponseTabs from "../components/response/response-tabs";

function ResponseLayout() {
  const { response } = useContext(CommunicationContext);
  return (
    <div style={{ padding: "2rem" }}>
      <ResponseView children={<ResponseHeader />} />
      {response && (
        <ResponseView
          children={<ResponseTabs response={response} key={"response-tabs"} />}
        />
      )}
    </div>
  );
}

export default ResponseLayout;
