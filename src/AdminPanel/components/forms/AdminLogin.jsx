/** @format */

import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { AiOutlineMail } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import img from "../Assets/Group 832 1.svg";
import axios from "axios";

const AdminLogin = () => {
  const [pass, setPass] = useState(false);
  const [inputpass, setInputpass] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:6699/api/v1/admin/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", data.token);
      navigate("/flyweis/AdminDashboard");
      toast.success("Welcome Admin");
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error("Check your credentials");
    }
  };

  return (
    <>
      <div
        className="w-full h-screen flex flex-col justify-center items-center bg-slate-100"
        style={{ backgroundColor: "#2b7a8e" }}
      >
        <Form
          className="shadow-2xl w-96 mx-3 sm:mx-0 sm:w-4/5 md:w-4/6 lg:w-4/5 xl:w-1/2 flex flex-col items-center bg-white p-5 md:py-10 "
          onSubmit={login}
        >
          <span
            className="text-center text-[rgb(241,146,46)]"
            style={{ fontSize: "2rem" }}
          >
            <img src={img} alt="" />
          </span>
          <section className="py-7 space-y-2">
            {/* Email */}
            <div className="shadow-2xl sm:w-96 border border-[rgb(241,146,46)] space-x-4 flex items-center w-64  p-2 rounded-md">
              <input
                type="email"
                required
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
                className="outline-none px-0.5  bg-transparent tracking-wider w-full"
              />
              <AiOutlineMail className="text-xl " />
            </div>
            {/* Password */}
            <div className="shadow-2xl sm:w-96 border border-[rgb(241,146,46)] space-x-4 flex items-center w-64  p-2 rounded-md">
              <input
                type={inputpass ? "text" : "password"}
                placeholder="password"
                name="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="outline-none px-0.5  bg-transparent tracking-wider w-full"
              />

              <span
                onClick={() => {
                  setPass(!pass);
                  setInputpass(!inputpass);
                }}
                className="text-xl cursor-pointer hover:scale-90 "
              >
                {pass ? <VscEyeClosed /> : <VscEye />}
              </span>
            </div>
            <button type="submit" className="loginBtn2">
              {loading ? (
                <Oval height={30} secondaryColor="black" color="black" />
              ) : (
                "Log In "
              )}
            </button>
            <button
              className="loginBtn"
              onClick={() => navigate("/salesLogin")}
            >
              Sales Login
            </button>
          </section>
        </Form>
      </div>
    </>
  );
};

export default AdminLogin;
