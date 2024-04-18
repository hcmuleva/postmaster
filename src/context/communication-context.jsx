import { createContext, useContext, useState } from "react";
import useUpdateHook from "../strapi-actions/update-provider";
import { AppContext } from "../context/index";
const CommunicationContext = createContext();

const CommunicationContextProvider = ({ children }) => {
  const [response, setResponse] = useState(null);
  const [headerOptions, setHeaderOptions] = useState([]);
  const [requestBody, setRequestBody] = useState({});
  const { updateRequest } = useUpdateHook();

  const { request } = useContext(AppContext);

  const setCurrentResponse = (newResponse, type) => {
    if (type === "UPDATE") {
      updateRequest({
        id: request.id,
        values: {
          response: newResponse,
          status: String(newResponse?.status),
        },
      });
    }
    setResponse(newResponse);
  };

  const setCurrentHeaderOptions = (newHeaderOptions, type) => {
    if (type === "UPDATE") {
      updateRequest({ values: { header: newHeaderOptions }, id: request.id });
    }
    setHeaderOptions(newHeaderOptions);
  };

  const setCurrentRequestBody = (newRequestBody, type) => {
    if (type === "UPDATE") {
      updateRequest({
        values: { payload: newRequestBody },
        id: request.id,
      });
    }
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
