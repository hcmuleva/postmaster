import { useContext } from "react";
import { CommunicationContext } from "../communication-context";
import JsonViewerComponent from "../components/response/json-viewer";
import ResponseHeader from "../components/response/response-header";
import ResponseView from "../components/response/response-view";
function ResponseLayout() {
  const { response } = useContext(CommunicationContext);

  return (
    <>
      <ResponseView children={<ResponseHeader />} />
      {response && (
        <ResponseView
          children={<JsonViewerComponent response={response?.data} />}
        />
      )}
    </>
  );
}

export default ResponseLayout;
