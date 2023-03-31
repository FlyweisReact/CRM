/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../layout/HOC";
import { useNavigate } from "react-router-dom";
import img from "../SVG/home.svg";
import { useCallback } from "react";
import axios from "axios";

export const dash = (data) => {
  return data;
};

const Dashboard = () => {
  const salesId = localStorage.getItem("salesId");
  const token = localStorage.getItem("token");
  const [count, setCount] = useState([]);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `http://ec2-13-232-120-74.ap-south-1.compute.amazonaws.com:3000/api/v1/sales/${salesId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCount(data.data);
    } catch (err) {
      console.log(err);
    }
  }, [token, salesId]);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    fetchData();
  }, [fetchData, token, navigate]);

  const countLength = count.length;

  const card = [
    {
      title: "Total Customer's",
      number: countLength,
      icon: <i className="fa-solid fa-user text-2xl text-[#4099ff]"></i>,
      link: "/customer",
      bg: "#4099ff",
    },
  ];

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

      <section className="grid md:grid-cols-4 grid-cols-2 gap-y-6 gap-x-4">
        {card.map((card, index) => {
          return (
            <div
              className="px-5 py-8   shadow-xl   BigOuter"
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
