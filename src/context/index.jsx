import { createContext, useState } from "react";
import { findModifiedFields } from "../strapi-refine-actions/object-change-interpreter";
import useUpdateHook, {
  updateRequestObjectCreater,
} from "../strapi-refine-actions/update-provider";
const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [request, setRequest] = useState(null);
  const [unsavedRequest, setUnsavedRequest] = useState(null);
  const [scenario, setScenario] = useState(null);
  const [currentContext, setCurrentContext] = useState(null);
  const { updateRequest } = useUpdateHook();

  const setScenarioRequest = (newRequest, type) => {
    if (type === "UPDATE") {
      const { id } = request;
      const changedFieldsWatchData = findModifiedFields(request, newRequest);
      console.log(changedFieldsWatchData);
      const values = updateRequestObjectCreater(changedFieldsWatchData);
      updateRequest({
        id,
        values,
      });
      setRequest(newRequest);
    }
    if (type === "INIT_UPDATE") {
      setRequest(newRequest);
      setUnsavedRequest(newRequest);
    }
    setUnsavedRequest(newRequest);
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
        unsavedRequest,
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
