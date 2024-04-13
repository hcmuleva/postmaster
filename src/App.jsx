import { Refine } from "@refinedev/core";
import { useNotificationProvider } from "@refinedev/antd";
import routerProvider, {
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter } from "react-router-dom";
import "@refinedev/antd/dist/reset.css";
import CustomLayout from "./refine-custom/CustomLayout";
import { AppContextProvider } from "./context";
import { CommunicationContextProvider } from "./context/communication-context";
import { TestRunnerContextProvider } from "./context/test-runner-context";
import resources from "./routers/resources";
import { DataProvider } from "@refinedev/strapi-v4";
const API_URL = import.meta.env.VITE_SERVER_URL;

const App = () => {
  return (
    <BrowserRouter>
      <Refine
        dataProvider={DataProvider(API_URL + "/api")}
        resources={resources}
        routerProvider={routerProvider}
        notificationProvider={useNotificationProvider}
        options={{
          warnWhenUnsavedChanges: true,
          syncWithLocation: true,
        }}
      >
        <AppContextProvider>
          <CommunicationContextProvider>
            <TestRunnerContextProvider>
              <CustomLayout></CustomLayout>
            </TestRunnerContextProvider>
          </CommunicationContextProvider>
        </AppContextProvider>
        <UnsavedChangesNotifier />
      </Refine>
    </BrowserRouter>
  );
};

export default App;
