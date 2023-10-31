import "../App.css";
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./partial/Header";
import Footer from "./partial/Footer";
import { useNavigate, Link } from "react-router-dom";
import MultiItemCarousel from "./partial/MultiItemCarousel";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="Home">
      <Header title="One Community | SFN Community" />
      <div className="sfn-container">
        <div className="sub-sfn-container">
          <h3 className="text">Welcome to</h3>
          <h1 className="text sfn">
            SCARBOROUGH FOOD NETWORK <br />
            Community
          </h1>
          <div className="connect-btn-div">
            <button className="btn btn-success connect-btn">Connect</button>
          </div>
          <div style={{ padding: "10px 0px 10px 0px" }}>
            <p>
              Scarborough Food Network (SFN) is here to offer a platform for
              connecting Food Banks and Communities
            </p>
          </div>
        </div>
      </div>

      <div className="food-bank-partners-div">
        <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
          FOOD BANK PARNTERS
        </h2>
        <MultiItemCarousel />
      </div>

      <div className="slogan-div">
        <div className="flexbox" style={{ flex: 1, paddingRight: "20px" }}>
          <h2
            style={{
              margin: "0px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            The more we <span className="green-text">gather</span>, the more we{" "}
            <span className="green-text">provide</span>.
          </h2>
          <p style={{ color: "white", marginTop: "10px" }}>
            We invite your organization to join and gather together, connecting
            with each other and share our mission from our new feed.
          </p>
          <ul className="bullet-point" style={{ color: "white" }}>
            <li>Share your social impact and activity through new feed</li>
            <li>We connect for more potential collaboration</li>
            <li>To maximize your organization exposure</li>
          </ul>

          <button className="btn btn-success">I'm joining!</button>
        </div>
        <div className="flexbox" style={{ flex: 1 }}>
          <img
            src="fruit.png"
            alt="Fruit Image"
            style={{ maxWidth: "70%", height: "auto" }}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
