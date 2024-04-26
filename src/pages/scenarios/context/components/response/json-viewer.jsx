import { useState } from "react";
import { defaultStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import JSONTree from "react-json-view";

export default function JsonViewerComponent({ response }) {
  if (!response) {
    return <div></div>;
  }

  const [clickedPath, setClickedPath] = useState(null);
  const handleClick = (path) => {
    setClickedPath(path);
  };
  return (
    <>
      <JSONTree src={response} style={defaultStyles} />;
    </>
  );
}
