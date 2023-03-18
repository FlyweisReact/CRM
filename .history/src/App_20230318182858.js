/** @format */

import { Routes, Route } from "react-router-dom";
import Login from "./components/forms/Login";
import Dashboard from "./components/pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Customers from "./components/pages/Customers/Customers";

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
        <Route path="/"

      </Routes>
    </>
  );
}

export default App;
