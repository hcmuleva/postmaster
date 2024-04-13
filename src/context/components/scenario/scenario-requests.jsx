import RequestsTable from "../../tables/request-table";

function ScenarioRequests({ requests }) {
  const requestTableData = requests?.map((request, index) => ({
    key: index,
    name: request.nam
    e,
  }));
  return (
    <>
      <RequestsTable items={requests} key={"request-table"} />
    </>
  );
}

export default ScenarioRequests;
