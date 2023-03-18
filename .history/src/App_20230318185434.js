/** @format */

import { Routes, Route } from "react-router-dom";
import Login from "./components/forms/Login";
import Dashboard from "./components/pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Customers from "./components/pages/Customers/Customers";
import AdminLogin from "./AdminPanel/components/forms/AdminLogin";
import AdminDashboard from "./AdminPanel/components/pages/AdminDashboard";
import AdminCustomer from "./AdminPanel/components/pages/Customers/AdminCustomer";
import AdminSales from "./AdminPanel/components/pages/Customers/AdminSales";
import AdminViewCustomer from "./AdminPanel/components/pages/Customers/AdminViewCustomer";

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
        <Route path="/flyweis/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/flyweis/admin/customer" element={<AdminCustomer />} />
          <Route path="/flyweis/AdminSales" element={<AdminSales />} />
          <Route path="/flyweis/AdminviewCustomer" element={<AdminViewCustomer />} />

      </Routes>
    </>
  );
}

export default App;
