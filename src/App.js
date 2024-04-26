import {
  GitHubBanner,
  Refine,
  AuthBindings,
  Authenticated,
} from "@refinedev/core";
import * as Ably from "ably";

import { AblyProvider } from "ably/react";

import {
  notificationProvider,
  ThemedLayoutV2,
  ErrorComponent,
  AuthPage,
} from "@refinedev/antd";
import CustomHeader from "./CustomHeader";

import { DataProvider, AuthHelper } from "@refinedev/strapi-v4";
import axios from "axios";
import routerProvider, {
  CatchAllNavigate,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { Title } from "./components/title";
import Header from "./components/header";
import { ProjectOutlined, DashboardOutlined } from "@ant-design/icons";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import "@refinedev/antd/dist/reset.css";

import {
  ProjectList,
  ProjectCreate,
  ProjectEdit,
  ProjectShow,
} from "./pages/projects";
import {
  ConfigCreate,
  ConfigEdit,
  ConfigList,
  ConfigShow,
} from "./pages/configs";

import { ResultList, ResultShow } from "./pages/results";
import {
  ScenarioCreate,
  ScenarioEdit,
  ScenarioList,
  ScenarioShow,
} from "./pages/scenarios";
import { StepCreate, StepEdit, StepList, StepShow } from "./pages/steps";
import { TestProvider } from "./pages/context";

const API_URL = process.env.REACT_APP_API_SERVER;
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;

const App = () => {
  const axiosInstance = axios.create();
  const strapiAuthHelper = AuthHelper(API_URL + "/api");
  const authProvider = {
    login: async ({ email, password }) => {
      const { data, status } = await strapiAuthHelper.login(email, password);
      if (status === 200) {
        localStorage.setItem(TOKEN_KEY, data.jwt);
        localStorage.setItem("user", JSON.stringify(data.user));
        // set header axios instance
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.jwt}`;

        return {
          success: true,
          redirectTo: "/",
        };
      }
      return {
        success: false,
        error: {
          message: "Login failed",
          name: "Invalid email or password",
        },
      };
    },
    logout: async () => {
      localStorage.removeItem(TOKEN_KEY);
      return {
        success: true,
        redirectTo: "/login",
      };
    },
    onError: async (error) => {
      return { error };
    },
    check: async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;
        return {
          authenticated: true,
        };
      }

      return {
        authenticated: false,
        error: {
          message: "Authentication failed",
          name: "Token not found",
        },
        logout: true,
        redirectTo: "/login",
      };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) {
        return null;
      }

      const { data, status } = await strapiAuthHelper.me(token, {
        metaData: { populate: ["photo"] },
      });
      if (status === 200) {
        const { id, username, email, photo } = data;

        return {
          id,
          username,
          email,
          photo,
        };
      }

      return null;
    },
  };

  // Supported in React 18+
  const option = {
    key: process.env.REACT_APP_ABLY_KEY,
    clientId: process.env.REACT_APP_ABLY_CLIENTID,
  };

  //const client = new Ably.Realtime(option);
  return (
    // <AblyProvider client={client}>
    <TestProvider>
      <BrowserRouter>
        {/* <GitHubBanner /> */}
        <Refine
          authProvider={authProvider}
          dataProvider={DataProvider(API_URL + "/api", axiosInstance)}
          routerProvider={routerProvider}
          resources={[
            {
              name: "projects",
              list: ProjectList,
              create: ProjectCreate,
              edit: ProjectEdit,
              show: ProjectShow,
              meta: {
                label: "Project",
                icon: <ProjectOutlined />, //this one is default one
              },
            },
            {
              name: "configs",
              list: ConfigList,
              create: ConfigCreate,
              edit: ConfigEdit,
              show: ConfigShow,
            },
            {
              name: "results",
              list: ResultList,

              show: ResultShow,
              meta: {
                label: "Result",
                icon: <DashboardOutlined />, //this one is default one
              },
            },
            {
              name: "scenarios",
              list: ScenarioList,
              create: ScenarioCreate,
              edit: ScenarioEdit,
              show: ScenarioShow,
            },
            {
              name: "steps",
              list: StepList,
              create: StepCreate,
              edit: StepEdit,
              show: StepShow,
              parentName: "scenarios",
            },
          ]}
          notificationProvider={notificationProvider}
          options={{
            warnWhenUnsavedChanges: true,
            syncWithLocation: true,
          }}
        >
          <Routes>
            <Route
              element={
                <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                  <ThemedLayoutV2 Header={Header} Title={Title}>
                    <Outlet />
                  </ThemedLayoutV2>
                </Authenticated>
              }
            >
              <Route
                index
                element={<NavigateToResource resource="projects" />}
              />

              <Route path="/projects">
                <Route index element={<ProjectList />} />
                <Route path="create" element={<ProjectCreate />} />
                <Route path="edit/:id" element={<ProjectEdit />} />
                <Route path="show/:id" element={<ProjectShow />} />
              </Route>
              <Route path="/configs">
                <Route index element={<ConfigList />} />
                <Route path="create" element={<ConfigCreate />} />
                <Route path="edit/:id" element={<ConfigEdit />} />
                <Route path="show/:id" element={<ConfigShow />} />
              </Route>
              <Route path="/results">
                <Route index element={<ResultList />} />

                <Route path="show/:id" element={<ResultShow />} />
              </Route>
              <Route path="/steps">
                <Route index element={<StepList />} />
                <Route path="create" element={<StepCreate />} />
                <Route path="edit/:id" element={<StepEdit />} />
                <Route path="show/:id" element={<StepShow />} />
              </Route>
              <Route path="/scenarios">
                <Route index element={<ScenarioList />} />
                <Route path="create" element={<ScenarioCreate />} />
                <Route path="edit/:id" element={<ScenarioEdit />} />
                <Route path="show/:id" element={<ScenarioShow />} />
              </Route>
            </Route>
            <Route
              element={
                <Authenticated fallback={<Outlet />}>
                  <NavigateToResource resource="projects" />
                </Authenticated>
              }
            >
              <Route
                path="/login"
                element={
                  <AuthPage
                    type="login"
                    formProps={{
                      initialValues: {
                        email: "harish.muleva@dell.com",
                        password: "Welcome@123",
                      },
                    }}
                  />
                }
              />
            </Route>
            <Route
              element={
                <Authenticated>
                  <ThemedLayoutV2>
                    <Outlet />
                  </ThemedLayoutV2>
                </Authenticated>
              }
            >
              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>
          {/* <UnsavedChangesNotifier /> */}
        </Refine>
      </BrowserRouter>
    </TestProvider>
    // </AblyProvider>
  );
};

export default App;
