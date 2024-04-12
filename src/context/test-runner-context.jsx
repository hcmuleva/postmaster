import { createContext, useState } from "react";

const TestRunnerContext = createContext();

const TestRunnerContextProvider = ({ children }) => {
  const [variableModalState, setVariableModalState] = useState(false);
  const [variableModalData, setVariableModal] = useState(null);

  const setVariableModalView = (newView) => setVariableModalState(newView);
  const setVariableModalData = (newData) => setVariableModal(newData);

  return (
    <TestRunnerContext.Provider
      value={{
        variableModalState,
        setVariableModalView,
        variableModalData,
        setVariableModalData,
      }}
    >
      {children}
    </TestRunnerContext.Provider>
  );
};

export { TestRunnerContext, TestRunnerContextProvider };
