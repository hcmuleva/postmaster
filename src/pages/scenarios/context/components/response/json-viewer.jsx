import { useState } from "react";
import { defaultStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import JSONTree from "react-json-view";

export default function JsonViewerComponent({ response }) {
  // console.log(response, response.status);
  // console.log(response.statusText);
  // console.log(response.headers);
  // console.log(response.config);

  if (!response) {
    return <div></div>;
  }

  console.log(response);

  const [clickedPath, setClickedPath] = useState(null);
  const handleClick = (path) => {
    console.log(path);
    setClickedPath(path);
  };
  return (
    <>
      <JSONTree src={response} style={defaultStyles} />;
    </>
  );
}



