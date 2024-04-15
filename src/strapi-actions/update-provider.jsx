import axios from "axios";
const API_URL = import.meta.env.VITE_SERVER_URL;
const useUpdateHook = () => {
  const updateRequest = ({ values, id }) => {
    return axios.put(API_URL + `/api/steps/${id}`, {
      data: { ...values },
    });
  };

  return { updateRequest };
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
