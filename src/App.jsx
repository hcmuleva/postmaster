import { Refine } from "@refinedev/core";
import { useNotificationProvider } from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter } from "react-router-dom";
import "@refinedev/antd/dist/reset.css";
import CustomLayout from "./refine-custom/CustomLayout";
import { AppContextProvider } from "./context";
import { CommunicationContextProvider } from "./context/communication-context";
import axios from "axios";
import { onRequest, onResponse } from "./network/axios-interseptor";
const API_URL = "https://api.fake-rest.refine.dev";

const App = () => {
  return (
    <BrowserRouter>
      <Refine
        dataProvider={dataProvider(API_URL)}
        routerProvider={routerProvider}
        notificationProvider={useNotificationProvider}
        options={{
          warnWhenUnsavedChanges: true,
          syncWithLocation: true,
        }}
      >
        <AppContextProvider>
          <CommunicationContextProvider>
            <CustomLayout></CustomLayout>
          </CommunicationContextProvider>
        </AppContextProvider>
        <UnsavedChangesNotifier />
      </Refine>
    </BrowserRouter>
  );
};

export default App;
