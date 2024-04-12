import JsonViewerComponent from "./json-viewer";
import ResponseHeader from "./response-header";

export default function Response() {
  return (
    <>
      <ResponseHeader />
      <JsonViewerComponent />
    </>
  );
}
