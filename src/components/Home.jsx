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
          <div className="connect-btn-div" onClick={() => navigate("/news")}>
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

          <p
            className="slogan-des"
            style={{ color: "white", marginTop: "10px" }}
          >
            We warmly invite your organization to our platform. Connect and
            align with peers, amplifying our missions through our news feed.
          </p>

          <div className="bullet-point-div" style={{ margin: "20px 0px" }}>
            <ul className="bullet-point" style={{ color: "white" }}>
              <li>
                Showcase your organization's social impact and initiatives with
                our dedicated audience.
              </li>
              <li>
                Foster meaningful connections, paving the way for potential
                collaborations.
              </li>
              <li>
                Enhance your organization's visibility and broaden its reach.
              </li>
            </ul>
          </div>

          <div
            style={{ margin: "25px 0px" }}
            onClick={() => navigate("/login")}
          >
            <button className="btn btn-success">I'm joining!</button>
          </div>
        </div>
        <div className="flexbox" style={{ flex: 1 }}>
          <img
            src="fruit.png"
            alt="Fruit Image"
            style={{ maxWidth: "80%", height: "auto" }}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
