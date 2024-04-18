import { BrowserRouter } from "react-router-dom";
import "@refinedev/antd/dist/reset.css";
import CustomLayout from "./refine-custom/CustomLayout";
import { AppContextProvider } from "./context";
import { CommunicationContextProvider } from "./context/communication-context";
import { TestRunnerContextProvider } from "./context/test-runner-context";

const App = () => {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <CommunicationContextProvider>
          <TestRunnerContextProvider>
            <CustomLayout></CustomLayout>
          </TestRunnerContextProvider>
        </CommunicationContextProvider>
      </AppContextProvider>
    </BrowserRouter>
  );
};

export default App;
