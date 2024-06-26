import { Authenticated, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";
import { dataProvider, liveProvider, authProvider } from "./providers";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { resources } from "./config/resources";
import { Home, ForgotPassword, Login, Register, CompanyList } from "./pages";
import { App as AntdApp } from "antd";
import Layout from "./components/layout";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import client from "./apollo-client";
import { ApolloProvider } from "@apollo/client";
import List from "./pages/projects/list";
import EditTask from "./pages/projects/edit";
import TasksCreatePage from "./pages/projects/create";
import Create from "./pages/companyList/create";
import { UserList } from "./pages/users/list";
import CreateUsers from "./pages/users/create";
import Edit from "./pages/companyList/edit";
import EditPage from "./pages/users/edit";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ApolloProvider client={client}>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                liveProvider={liveProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={resources}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "c4PuKU-7EFwpa-LQAnb2",
                  liveMode: "auto",
                }}
              >
                <Routes>
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route
                    element={
                      <Authenticated // Tells if we are authenticated or not
                        key="authenticated-layout" // Key makes sure that the authenticated component is unique
                        fallback={<CatchAllNavigate to="/login" />} // if not authenticated then we fall back to login
                      >
                        <Layout>
                          <Outlet />
                          {/* Outlet component renders the child route of the current route, the child route in this case the whole page is the child of the current route(Authenticated route) */}
                        </Layout>
                      </Authenticated>
                    }
                  >
                    <Route index element={<Home />} />

                    <Route path="/companies">
                      <Route index element={<CompanyList />} />
                      <Route path="new" element={<Create />} />
                      <Route path="edit/:id" element={<Edit />} />
                    </Route>

                    <Route path="/users">
                      <Route index element={<UserList />} />
                      <Route path="new" element={<CreateUsers />} />
                      <Route path="edit/:id" element={<EditPage />} />
                    </Route>

                    <Route
                      path="/tasks"
                      element={
                        <List>
                          <Outlet />
                        </List>
                      }
                    >
                      <Route path="new" element={<TasksCreatePage />} />
                      <Route path="edit/:id" element={<EditTask />} />
                    </Route>
                  </Route>
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              {/* <DevtoolsPanel /> */}
            </DevtoolsProvider>
          </AntdApp>
        </ApolloProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
