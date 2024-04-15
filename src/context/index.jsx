import { createContext, useState } from "react";
import { findModifiedFields } from "../strapi-actions/object-change-interpreter";
import useUpdateHook, {
  updateRequestObjectCreater,
} from "../strapi-actions/update-provider";
const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [request, setRequest] = useState(null);
  const [requestModalState, setRequestModalState] = useState(false);
  const [unsavedRequest, setUnsavedRequest] = useState(null);
  const [scenario, setScenario] = useState(null);
  const [scenarioModalState, setScenarioModalState] = useState(false);
  const [currentContext, setCurrentContext] = useState(null);
  const { updateRequest } = useUpdateHook();

  const setScenarioRequest = (newRequest, type) => {
    if (type === "UPDATE") {
      const { id } = request;
      const changedFieldsWatchData = findModifiedFields(request, newRequest);
      const values = updateRequestObjectCreater(changedFieldsWatchData);
      updateRequest({
        id,
        values,
      })
        .then((response) => {
          setRequest(newRequest);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (type === "INIT_UPDATE") {
      setRequest(newRequest);
      setUnsavedRequest(newRequest);
      setCurrentContext("REQUEST");

      return;
    }
    setUnsavedRequest(newRequest);
    setCurrentContext("REQUEST");
  };

  const setAppScenario = (newScenario) => {
    setScenario(newScenario);
    setCurrentContext("SCENARIO");
  };

  function changeScenarioModalState(newState) {
    setScenarioModalState(newState);
  }

  function changeRequestModalState(newState) {
    setRequestModalState(newState);
  }

  return (
    <AppContext.Provider
      value={{
        request,
        requestModalState,
        changeRequestModalState,
        unsavedRequest,
        scenarioModalState,
        changeScenarioModalState,
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
