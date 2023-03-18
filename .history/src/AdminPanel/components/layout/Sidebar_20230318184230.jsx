/** @format */

import React from "react";
import { RiCloseLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { RiLogoutBoxLine } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { MdDashboardCustomize } from "react-icons/md";
import { toast } from "react-toastify";
import img from '../../../Images/2.png'
import logo from './Group 1.png'

const Sidebar = ({ hamb, setHamb }) => {
  const navigate = useNavigate();

  const nav = [
    {
      icon: <MdDashboardCustomize className="text-xl mr-3" />,
      link: "/flyweis/AdminDashboard",
      name: "Dashboard",
    },
    {
      icon: <AiOutlineUser className="text-xl mr-3" />,
      link: "/customer",
      name: "Customer's",
    },
    {
      icon: <AiOutlineUser className="text-xl mr-3" />,
      link: "/sales",
      name: "Sales Members",
    },
  ];

  const logOut = async (e) => {
    localStorage.removeItem("token");
    toast.success("Log-Out SuccessFull");
    navigate("/");
  };

  return (
    <>
      <div
        className="p-4"
        style={{
          backgroundColor: "#001721",
          minHeight: "100vh",
          position : 'relative'
        }}
      >
        <div className="w-full md:hidden relative  mb-4">
          <RiCloseLine
            onClick={() => setHamb(!hamb)}
            className="text-3xl  absolute top-2 sm:hover:rotate-[228deg] transition-transform font-bold right-2 sm:hover:text-[22px] text-[rgb(241,146,46)] cursor-pointer"
          />
        </div>
        

        <figure className="flex  flex-col items-center">
          <img src={logo} alt="" style={{ width: "120px" }} />
          <div
            style={{
              width: "90%",
              height: "2px",
              backgroundColor: "#71FADD",
              marginTop: "20px",
            }}
          ></div>
        </figure>


        <nav className="py-6">
          {nav.map((nav) => {
            return (
              <Link to={nav.link} key={nav.name} className=""    style={{ textDecoration: " none" }}>
                <div
                  className="myNav"
                >
                  <ul tabindex="0">
                    <li style={{ marginTop: "5px " }}> {nav.icon} </li>
                    <li> {nav.name} </li>
                  </ul>
                </div>
              </Link>
            );
          })}

          <span
            onClick={() => logOut()}
            className="myNav"
          >
            <ul tabindex="0">
              <li style={{ marginTop: "5px " }}><RiLogoutBoxLine className="text-xl mr-3" /> </li>
              <li> Logout </li>
            </ul>
          </span>
        </nav>

        <div className="myNavLast">
          <img src={img} alt='' />
          </div>
      </div>
    </>
  );
};

export default Sidebar;
