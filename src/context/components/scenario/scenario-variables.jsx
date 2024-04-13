import VariableTable from "../../tables/variable-table";

function ScenarioVariables({ variables }) {
  const variableTableData = variables?.map((variable, index) => ({
    key: index,
    name: variable.name,
    path: variable.path,
  }));
  return (
    <section style={{ padding: "2rem 0" }}>
      <h3 style={{ textTransform: "uppercase", fontSize: "0.8rem" }}>
        Variables
      </h3>
      <VariableTable
        items={variableTableData}
        pagination={false}
        key={"variable-table"}
      />
    </section>
  );
}
export default ScenarioVariables;
