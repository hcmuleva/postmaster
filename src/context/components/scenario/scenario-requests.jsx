import RequestsTable from "../../tables/request-table";

function ScenarioRequests({ requests }) {
  const requestTableData = requests?.map((request, index) => ({
    key: index,
    name: request.name,
    method: request.method,
    url: request.url,
  }));
  return (
    <>
      <section style={{ padding: "2rem 0" }}>
        <h3 style={{ textTransform: "uppercase", fontSize: "0.8rem" }}>
          Requests
        </h3>
        <RequestsTable
          items={requestTableData}
          key={"request-table"}
          pagination={false}
        />
      </section>
    </>
  );
}

export default ScenarioRequests;
