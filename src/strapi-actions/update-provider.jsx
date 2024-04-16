import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../context";
const API_URL = import.meta.env.VITE_SERVER_URL;
const useUpdateHook = () => {
  // const { updateRefetchStatus } = useContext(AppContext);
  const updateRequest = ({ values, id }) => {
    return axios
      .put(API_URL + `/api/steps/${id}`, {
        data: { ...values },
      })
      // .finally(() => updateRefetchStatus(true));
  };
  const updateScenario = ({ values, id }) => {
    return axios
      .put(API_URL + `/api/scenarios/${id}`, {
        data: { ...values },
      })
      // .finally(() => updateRefetchStatus(true));
  };

  return { updateRequest, updateScenario };
};

const updateRequestObjectCreater = (modifiedDataObject) => {
  const newValues = {};
  for (const field in modifiedDataObject) {
    newValues[field] = modifiedDataObject[field].newValue;
  }
  return newValues;
};

export { updateRequestObjectCreater };

export default useUpdateHook;
