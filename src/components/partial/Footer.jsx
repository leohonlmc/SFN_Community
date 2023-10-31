import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer
      className="container-footer container text-center my-6 p-8 text-gray3"
      style={{ marginTop: "30px" }}
    >
      <div className="mx-auto w-24 h-1 my-12 bg-gradient-to-r from-gray5 to-gray4 rounded-full"></div>

      <div className="py-3">
        <img
          src="https://scarboroughfoodnetwork.ca/wp-content/uploads/2023/04/sfn-logo-green-filled-300x300-1.png"
          alt=""
          style={{ width: "130px" }}
        />
      </div>

      <div
        className="text-xs"
        style={{ fontSize: "0.8rem", fontWeight: "bold", padding: "10px" }}
      >
        {`Copyright © ${new Date().getFullYear()}`} <strong>SFN.com</strong>
      </div>
    </footer>
  );
}

export default Footer;
