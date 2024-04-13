import { createContext, useState } from "react";
import useUpdateHook from "../strapi-refine-actions/update-provider";

const CommunicationContext = createContext();

const CommunicationContextProvider = ({ children }) => {
  const [response, setResponse] = useState(null);
  const [headerOptions, setHeaderOptions] = useState([]);
  const [requestBody, setRequestBody] = useState({});
  const { updateRequest } = useUpdateHook();

  const setCurrentResponse = ({ newResponse, requestId }) => {
    if (response && response.id === requestId) {
      updateRequest({
        id: requestId,
        values: {
          response: newResponse,
        },
      });
    }
    setResponse(newResponse);
  };

  const setCurrentHeaderOptions = (newHeaderOptions) => {
    setHeaderOptions(newHeaderOptions);
  };

  const setCurrentRequestBody = (newRequestBody) => {
    setRequestBody(newRequestBody);
  };
  return (
    <CommunicationContext.Provider
      value={{
        headerOptions,
        setCurrentHeaderOptions,
        requestBody,
        setCurrentRequestBody,
        response,
        setCurrentResponse,
      }}
    >
      {children}
    </CommunicationContext.Provider>
  );
};

export { CommunicationContext, CommunicationContextProvider };
