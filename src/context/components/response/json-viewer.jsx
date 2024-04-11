import { useContext, useEffect } from "react";
import { JsonView, defaultStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import { AppContext } from "../..";

export default function JsonViewerComponent() {
  const { response } = useContext(AppContext);
  return <JsonView data={response} style={defaultStyles}></JsonView>;
}
