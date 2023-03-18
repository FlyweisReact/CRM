/** @format */

import { Routes, Route } from "react-router-dom";
import Login from "./components/forms/Login";
import Dashboard from "./components/pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Customers from "./components/pages/Customers/Customers";
import AdminLogin from "./AdminPanel/components/forms/AdminLogin";
import AdminDashboard from "./AdminPanel/components/pages/AdminDashboard";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>

      {/* Sales Panel */}
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customer" element={<Customers />} />

        {/* Admin Panel */}
        <Route path="/" element={<AdminLogin />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />

      </Routes>
    </>
  );
}

export default App;
