import Request from "../components/requests/request";
import RequestTabs from "../components/requests/request-option-tabs";
import ResponseLayout from "./response-layout";
Request;

function RequestLayout() {
  return (
    <>
      <Request />
      <RequestTabs />
      <ResponseLayout />
    </>
  );
}

export default RequestLayout;
