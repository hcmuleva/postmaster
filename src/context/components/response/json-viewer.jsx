import { useContext } from "react";
import { JsonView, defaultStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import { CommunicationContext } from "../../communication-context";

export default function JsonViewerComponent() {
  const { response } = useContext(CommunicationContext);
  // console.log(response, response.status);
  // console.log(response.statusText);
  // console.log(response.headers);
  // console.log(response.config);
  return <JsonView data={response} style={defaultStyles}></JsonView>;
}
