import { useContext } from "react";
import { CommunicationContext } from "../../communication-context";

function RequestBody() {
  const { setCurrentRequestBody, requestBody } =
    useContext(CommunicationContext);
  return (
    <div>
      <textarea
        value={requestBody}
        style={{
          width: "100%",
          height: "270px",
          fontSize: "1rem",
          padding: "1rem",
        }}
        onChange={(e) => {
          setCurrentRequestBody(e.target.value, "UPDATE");
        }}
      ></textarea>
    </div>
  );
}

export default RequestBody;
