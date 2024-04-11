import Request from "../components/requests/request";
import RequestTabs from "../components/requests/request-option-tabs";
import Response from "../components/response/response";
Request;

function RequestLayout() {
  return (
    <>
      <Request />
      <RequestTabs />
      <Response />
    </>
  );
}

export default RequestLayout;
