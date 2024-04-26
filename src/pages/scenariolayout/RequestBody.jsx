import { useUpdate } from "@refinedev/core";
import { Button } from "antd";
import React, { useContext, useEffect } from "react";
import { TestContext } from "../context";

const RequestBody = ({ stepdata }) => {
  const [payaloddata, setPayloadData] = React.useState(stepdata["payload"]);

  const { setRefetchResources } = useContext(TestContext);

  const { mutate } = useUpdate();

  const updateStepBody = () => {
    mutate(
      {
        id: stepdata.id,
        resource: "steps",
        values: {
          payload: payaloddata,
        },
      },
      {
        onError: (error, variables, context) => {},
        onSuccess: (data, variables, context) => {
          setRefetchResources(true);
        },
      }
    );
  };

  return (
    <div style={{ margin: "1rem 0", padding: "1rem 0" }}>
      <textarea
        style={{
          width: "100%",
          height: "270px",
          fontSize: "1rem",
          padding: "1rem",
        }}
        value={payaloddata}
        onChange={(e) => {
          setPayloadData(e.target.value);
          stepdata["payload"] = e.target.value;
        }}
      ></textarea>
      <Button onClick={updateStepBody}>Save</Button>
    </div>
  );
};

export default RequestBody;
