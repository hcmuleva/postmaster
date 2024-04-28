import { createContext, useState } from "react";

const CommunicationContext = createContext();

const CommunicationContextProvider = ({ children }) => {
  const [response, setResponse] = useState(null);
  const [headerOptions, setHeaderOptions] = useState([]);
  const [requestBody, setRequestBody] = useState({});

  const setCurrentResponse = (newResponse) => {
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
