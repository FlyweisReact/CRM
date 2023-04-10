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
import AssignedCustomer from "./AdminPanel/components/pages/AssignedCustomer";
import AssinedCustomerSales from "./components/pages/AssinedCustomerSales";
import AllAssingnedCustomer from "./AdminPanel/components/pages/AllAssingnedCustomer";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>

      {/* Sales Panel */}
        <Route path="/salesLogin" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customer" element={<Customers />} />
        <Route path="/sales/assigned/customer" element={<AssinedCustomerSales />} />

        {/* Admin Panel */}
        <Route path="/" element={<AdminLogin />} />
        <Route path="/flyweis/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/flyweis/admin/customer" element={<AdminCustomer />} />
          <Route path="/flyweis/AdminSales" element={<AdminSales />} />
          <Route path='/customer/:id' element={<AdminViewCustomer />} />
          <Route path="/assined/customer/:id" element={<AssignedCustomer />} />
          <Route path="/flyweis/admin/assigned-customers" element={<AllAssingnedCustomer />} />

      </Routes>
    </>
  );
}

export default App;
