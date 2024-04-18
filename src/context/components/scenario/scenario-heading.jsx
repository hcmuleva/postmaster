function ScenarioHeading({ scenarioData }) {
  return (
    <section>
      <h1>{scenarioData.name}</h1>
      <h4>{scenarioData.description}</h4>
    </section>
  );
}

export default ScenarioHeading;
