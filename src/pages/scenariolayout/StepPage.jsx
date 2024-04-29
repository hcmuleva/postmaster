import React, { useContext, useEffect, useState } from "react";
import { Select, Input, Button, Tabs } from "antd";
import MethodText from "../scenarios/utils/method-text";
import HeaderOptionForm from "./HeaderOptionForm";
import RequestBody from "./RequestBody";
import RequestResponse from "./RequestResponse";
import useRequestHandler from "../scenarios/network/request-handler";
import {
  getJsonValueByPath,
  replaceVariables,
} from "../scenarios/GetJsonValueFromResponse";
import { useUpdate } from "@refinedev/core";
import { TestContext } from "../context";

const { Option } = Select;

const methodColors = {
  POST: "yellow",
  GET: "green",
  PUT: "blue",
  DELETE: "red",
};

const StepPage = () => {
  const {
    allScenarios,
    setAllScenarios,
    setCurrentStep,
    currentStep,
    setRefetchResources,
  } = useContext(TestContext);

  const { fetchData } = useRequestHandler();
  const { mutate } = useUpdate();

  const handleURLChange = (e) => {
    setCurrentStep({ ...currentStep, url: e.target.value });
  };

  // useEffect(() => {
  //   const updatedScenarios = allScenarios.map((scenario) => {
  //     if (scenario.id === currentStep.scenarioid) {
  //       const updatedSteps = scenario.steps.map((step) =>
  //         step.id === currentStep.id ? currentStep : step
  //       );
  //       return { ...scenario, steps: updatedSteps };
  //     }
  //     return scenario;
  //   });
  //   setAllScenarios(updatedScenarios);
  // }, [currentStep, allScenarios, setAllScenarios]);

  const updateJsonVariablesWithActualValue = (scenario) => {
    const updatedScenarioVariables = scenario?.variables?.map((variable) => {
      const stepnum = variable.step;
      const elementWithId = scenario?.steps?.find(
        (element) => element.id === stepnum
      );
      const jsonvalue = getJsonValueByPath(
        elementWithId?.response,
        variable.path
      );
      return { ...variable, [variable.name]: jsonvalue };
    });

    const updatedScenarios = allScenarios.map((el) =>
      el.id === scenario.id
        ? { ...el, variables: updatedScenarioVariables }
        : el
    );
    setAllScenarios(updatedScenarios);
    return updatedScenarioVariables;
  };

  const handleUpdateStep = (response) => {
    mutate(
      {
        resource: "steps",
        values: { response },
        id: currentStep.id,
      },
      {
        onError: (error) => {},
        onSuccess: () => {
          setCurrentStep({ ...currentStep, response: response });
          setRefetchResources(true);
        },
      }
    );

    const updatedScenarios = allScenarios.map((scenario) => ({
      ...scenario,
      steps: scenario.steps.map((step) =>
        step.id === currentStep.id ? { ...step, response } : step
      ),
    }));
    console.log(updatedScenarios);
    setAllScenarios(updatedScenarios);
  };

  const handleSend = async () => {
    const currentScenario = allScenarios.find(
      (scenario) => currentStep.scenarioid === scenario.id
    );

    const updatedVariables =
      updateJsonVariablesWithActualValue(currentScenario);

    const { header, url, requesttype, payload } = currentStep;
    const request = { url, method: requesttype };
    const transferPayload = replaceVariables(payload, updatedVariables);

    try {
      const response = await fetchData(request, header, transferPayload);
      handleUpdateStep(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMethodChange = (value) => {
    setCurrentStep({ ...currentStep, requesttype: value });
  };

  const RequestMethodSelect = ({ requesttype }) => (
    <Select defaultValue={requesttype} onChange={handleMethodChange}>
      {Object.keys(methodColors).map((method) => (
        <Option value={method} key={method}>
          <MethodText size={"14px"} text={method} />
        </Option>
      ))}
    </Select>
  );

  const items = [
    {
      key: 1,
      label: "Query Params",
      children: <HeaderOptionForm stepdata={currentStep} />,
    },
    {
      key: 2,
      label: "RequestBody",
      children: <RequestBody stepdata={currentStep} />,
    },
  ];

  return (
    <div>
      <form style={{ width: "100%", display: "flex", gap: "1rem" }}>
        <Input
          addonBefore={
            <RequestMethodSelect requesttype={currentStep?.requesttype} />
          }
          value={currentStep?.url}
          onChange={handleURLChange}
        />
        <Button type="primary" onClick={handleSend}>
          Send
        </Button>
      </form>
      <Tabs items={items} />
      <RequestResponse stepdata={currentStep} />
    </div>
  );
};

export default StepPage;
