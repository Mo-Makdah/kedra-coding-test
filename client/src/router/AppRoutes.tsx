import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { paths } from "./paths";
import MyUnitsPage from "@/pages/MyUnits";
import UnitDetailsPage from "@/pages/UnitDetails";
import NotFoundPage from "@/pages/NotFound";

const Router = () => {
  const {
    indexPath,
    unitsPath,
    unitDetailsPath,
    notFoundPath,
    othersPath,
    idParam,
  } = paths;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navigate to={unitsPath} />} path={indexPath} />
        <Route element={<MyUnitsPage />} path={unitsPath} />
        <Route
          element={<UnitDetailsPage />}
          path={`${unitDetailsPath}/${idParam}?`}
        />
        <Route element={<NotFoundPage />} path={notFoundPath} />
        <Route path={othersPath} element={<Navigate to={notFoundPath} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
