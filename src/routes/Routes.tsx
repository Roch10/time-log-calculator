import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import AddLog from "../pages/AddLog";

const MainRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/add-log" element={<AddLog />} />
  </Routes>
);

export default MainRoutes;
