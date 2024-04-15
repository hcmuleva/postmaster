import axios from "axios";
const API_URL = import.meta.env.VITE_SERVER_URL;
const CreateProvider = () => {
  function createProviderFunc({ values, resource }) {
    axios.post(`${API_URL}/api/${resource}`, {
      data: {
        ...values,
      },
    });
  }
  return { createProviderFunc };
};

export default CreateProvider;
