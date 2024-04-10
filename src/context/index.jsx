import Request from "./components/requests/request";
import JsonViewerComponent from "./components/response/json-viewer";

const CustomContextProvider = ({ currentContext }) => {
  return (
    <>
      <Request requestData={currentContext} />
      <JsonViewerComponent />
    </>
  );
};

export default CustomContextProvider;
