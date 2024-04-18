import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../context";
const API_URL = import.meta.env.VITE_SERVER_URL;
const CreateProvider = () => {
  // const { updateRefetchStatus } = useContext(AppContext);
  function createProviderFunc({ values, resource }) {
    axios
      .post(`${API_URL}/api/${resource}`, {
        data: {
          ...values,
        },
      })
      // .finally(() => updateRefetchStatus(true));
  }
  return { createProviderFunc };
};

export default CreateProvider;
