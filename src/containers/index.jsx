import { Route, Routes } from "react-router-dom";
import { authRoutes, appRoutes } from "../routes/";
import ErrorBoundary from "./errorBoundary";
import AppLayout from "../layouts/Applayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "../pages/home";
import { ConfigProvider } from "antd";
import appTheme from "../theme/appTheme";
import Error404 from "../pages/error/404";

function Containers() {
  const queryClient = new QueryClient();
  return (
    <>
      <ErrorBoundary>
        <ConfigProvider theme={appTheme}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route key={"home"} path="/" element={<Home />} />
              {authRoutes.map(({ path, element }) => (
                <Route key={`auth-${path}`} path={path} element={element} />
              ))}
              {appRoutes.map(({ path, element }) => (
                <Route
                  key={`auth-${path}`}
                  path={path}
                  element={<AppLayout>{element}</AppLayout>}
                />
              ))}
              <Route path="*" element={<Error404 />} />
            </Routes>
          </QueryClientProvider>
        </ConfigProvider>
      </ErrorBoundary>
    </>
  );
}

export default Containers;
