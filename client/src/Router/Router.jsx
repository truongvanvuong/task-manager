import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "../Layout";
import {
  Home,
  Completed,
  InCompleted,
  Important,
  Login,
  Register,
} from "../Page";
const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route
        path="/home"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/completed"
        element={
          <Layout>
            <Completed />
          </Layout>
        }
      />
      <Route
        path="/incompleted"
        element={
          <Layout>
            <InCompleted />
          </Layout>
        }
      />
      <Route
        path="/important"
        element={
          <Layout>
            <Important />
          </Layout>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Routers;
