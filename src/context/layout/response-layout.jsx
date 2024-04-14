import { useContext, useEffect } from "react";
import { CommunicationContext } from "../communication-context";
import ResponseHeader from "../components/response/response-header";
import ResponseView from "../components/response/response-view";
import ResponseTabs from "../components/response/response-tabs";
import { AppContext } from "..";

function ResponseLayout() {
  const { response, setCurrentResponse } = useContext(CommunicationContext);
  const { request } = useContext(AppContext);
  useEffect(() => {
    setCurrentResponse(request.response);
  }, []);
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
