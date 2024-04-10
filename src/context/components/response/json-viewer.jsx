import { JsonView, defaultStyles } from "react-json-view-lite";
import ResponseData from "../../../mock/response.json";
import "react-json-view-lite/dist/index.css";

export default function JsonViewerComponent() {
  return <JsonView data={ResponseData} style={defaultStyles}></JsonView>;
}
