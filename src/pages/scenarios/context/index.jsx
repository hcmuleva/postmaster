import { createContext, useState } from "react";
const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [request, setRequest] = useState(null);
  const [scenario, setScenario] = useState(null);
  const [currentContext, setCurrentContext] = useState(null);

  const setScenarioRequest = (newRequest) => {
    setRequest(newRequest);
    setCurrentContext("REQUEST");
  };

  const setAppScenario = (newScenario) => {
    setScenario(newScenario);
    setCurrentContext("SCENARIO");
  };

  return (
    <AppContext.Provider
      value={{
        request,
        setScenarioRequest,
        scenario,
        setAppScenario,
        currentContext,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
