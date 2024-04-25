import { useContext } from "react";
import { CommunicationContext } from "../../communication-context";

function RequestBody() {
  const { setCurrentRequestBody } = useContext(CommunicationContext);
  return (
    <div>
      <textarea
        style={{
          width: "100%",
          height: "270px",
          fontSize: "1rem",
          padding: "1rem",
        }}
        onChange={(e) => setCurrentRequestBody(e.target.value)}
      ></textarea>
    </div>
  );
}

export default RequestBody;
