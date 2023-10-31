import "../App.css";
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./partial/Header";
import { useNavigate, Link } from "react-router-dom";

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
            <button className="btn btn-primary connect-btn">Connect</button>
          </div>
          <div style={{ padding: "20px 20px 10px 20px" }}>
            <p>
              Scarborough Food Network (SFN) is here to offer a platform for
              connecting Food Banks and Communities
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
