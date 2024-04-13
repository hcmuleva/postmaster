import { createContext, useState } from "react";
import { findModifiedFields } from "../strapi-refine-actions/object-change-interpreter";
import useUpdateHook, {
  updateRequestObjectCreater,
} from "../strapi-refine-actions/update-provider";
const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [request, setRequest] = useState(null);
  const [scenario, setScenario] = useState(null);
  const [currentContext, setCurrentContext] = useState(null);
  const { updateRequest } = useUpdateHook();

  const setScenarioRequest = (newRequest) => {
    if (request) {
      const { id } = request;
      const changedFieldsWatchData = findModifiedFields(request, newRequest);
      const values = updateRequestObjectCreater(changedFieldsWatchData);
      updateRequest({
        id,
        values,
      });
    }
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
