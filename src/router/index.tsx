import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";

import { MainLayout } from "layouts";
import { AddTransaction, Dashboard, Transactions } from "pages";
import { PATHS } from "./types";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      <Route index element={<Dashboard />} />
      <Route path={PATHS.Transactions}>
        <Route index element={<Transactions />} />
        <Route path="new" element={<AddTransaction />} />
      </Route>
    </Route>
  ),
);
