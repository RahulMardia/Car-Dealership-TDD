import { Route, Routes } from "react-router-dom";
import { routesConfig } from "./routeConfig";
export default function AppRoutes() {
  return (
    <Routes>
      {routesConfig.map(({ path, element }: { path: string, element: any }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
}