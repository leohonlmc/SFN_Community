import "../App.css";
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./partial/Header";
import Footer from "./partial/Footer";
import { useNavigate, Link } from "react-router-dom";
import MultiItemCarousel from "./partial/MultiItemCarousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faCommentDots,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

function UserHome() {
  const navigate = useNavigate();
  const [des, setDes] = useState("Angela, write something here...");

  return (
    <div className="Home">
      <Header title="One Community | SFN Community" />
      <div className="sfn-container">
        <div className="sub-sfn-container">
          <h3 className="text">Welcome to</h3>
          <h1 className="text sfn">
            SCARBOROUGH FOOD NETWORK <br />
            Online Food Bank Service
          </h1>
          <div className="connect-btn-div" onClick={() => navigate("/news")}>
            <button className="btn btn-success connect-btn">
              Start Booking
            </button>
          </div>
          <div style={{ padding: "10px 0px 10px 0px" }}>
            <p>
              Scarborough Food Network (SFN) offers online booking from our food
              bank partners.
            </p>
          </div>
        </div>
      </div>

      <div className="food-bank-partners-div">
        <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
          FOOD BANK PARTNERS
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
            Knowing you <span className="green-text">needs</span>, just got{" "}
            <span className="green-text">easier</span>.
          </h2>

          <div className="bullet-point-div" style={{ margin: "20px 0px" }}>
            <ul className="bullet-point" style={{ color: "white" }}>
              <li>
                Find you nearest food bank and book an appointment in just a few
                clicks.
              </li>
              <li>
                We keep our stock records up to date so you know what's in stock
                before you go.
              </li>
            </ul>
          </div>

          <div
            style={{ margin: "25px 0px" }}
            onClick={() => navigate("/login")}
          >
            <button className="btn btn-success">Get started</button>
          </div>
        </div>
        <div className="flexbox" style={{ flex: 1 }}>
          <img
            src="fruit.png"
            alt="Fruit"
            style={{ maxWidth: "80%", height: "auto" }}
          />
        </div>
      </div>
      <div className="parent-demo-post">
        <div className="row demo-new-post">
          <div style={{ margin: "10px 0px" }}></div>

          <div className="col-md-6 col-12 demo-post"></div>
          <div className="col-md-6 col-12 demo-post"></div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default UserHome;
