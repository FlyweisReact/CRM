/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../layout/HOC";
import { useNavigate } from "react-router-dom";
import img from "../SVG/home.svg";
import axios from "axios";

export const dash = (data) => {
  return data;
};

const Dashboard = () => {
  const [customerCount, setCustomerCount] = useState([]);
  const [saleCount, setSaleCount] = useState([]);

  const token = localStorage.getItem("token");

  const totalCustomer = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "https://u4x75z11l9.execute-api.ap-south-1.amazonaws.com/dev/api/v1/admin/cuestomer/total",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCustomerCount(data.total);
    } catch (err) {
      console.log(err);
    }
  }, [token]);

  const totalSales = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "https://u4x75z11l9.execute-api.ap-south-1.amazonaws.com/dev/api/v1/admin/allsales",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSaleCount(data.total.length);
    } catch (err) {
      console.log(err);
    }
  }, [token]);

  useEffect(() => {
    totalCustomer();
    totalSales();
  }, [totalCustomer, totalSales]);

  const card = [
    {
      title: "Total Customer's",
      number: customerCount,
      icon: <i className="fa-solid fa-user text-2xl text-[#4099ff]"></i>,
      link: "/customer",
      bg: "#4099ff",
    },
    {
      title: "Total Sales's Members",
      number: saleCount,
      icon: <i className="fa-solid fa-user-tie text-2xl text-[#5b63d9]"></i>,
      link: "/sales",
      bg: "#5b63d9",
    },
  ];

  const navigate = useNavigate();
  return (
    <>
      <div style={{ display: "flex", gap: "20px", marginBottom: "2%" }}>
        <img
          src={img}
          alt=""
          style={{
            backgroundColor: "#4099ff",
            padding: "8px",
            borderRadius: "5px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        />
        <p style={{ color: "black", fontSize: "18px", margin: "0" }}>
          Dashboard
        </p>
      </div>

      <section className="dashBoardCard">
        {card.map((card, index) => {
          return (
            <div
              className="px-5 py-8  shadow-xl   BigOuter"
              key={index}
              onClick={() => navigate(`${card.link ? card.link : "#"}`)}
              style={{ backgroundColor: `${card.bg}` }}
            >
              <div className="Item">
                <div className="left">
                  <span style={{ color: "white", fontSize: "20px" }}>
                    {card.title}
                  </span>
                  <br />
                  <span
                    style={{
                      color: "white",
                      fontSize: "25px",
                      fontWeight: "600",
                    }}
                  >
                    {card.number}
                  </span>
                </div>

                <div className="right">
                  <div className="myICons">
                    {card.img ? <img src={card.img} alt="" /> : card.icon}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default HOC(Dashboard);
