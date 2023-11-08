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
import FaqSection from "./partial/FaqSection";

function UserHome() {
  const navigate = useNavigate();
  const [des, setDes] = useState("Angela, write something here...");

  return (
    <div className="Home">
      <Header title="One Community | SFN Community" />
      <div className="sfn-container">
        <div className="sub-sfn-container">
          <h3 className="text">Welcome to</h3>
          {localStorage.getItem("represent") ? (
            <h1 className="text sfn">
              SCARBOROUGH FOOD NETWORK <br />
              Workbench
            </h1>
          ) : (
            <h1 className="text sfn">
              SCARBOROUGH FOOD NETWORK <br />
              Online Food Bank Service
            </h1>
          )}

          <div className="connect-btn-div" onClick={() => navigate("/food")}>
            <button className="btn btn-success connect-btn">Start now</button>
          </div>
          <div style={{ padding: "10px 0px 10px 0px" }}>
            <p>
              Scarborough Food Network (SFN) offers online booking from our food
              bank partners.
            </p>
          </div>
        </div>
      </div>

      {localStorage.getItem("represent") ? null : (
        <div className="food-bank-partners-div">
          <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
            FOOD BANK PARTNERS
          </h2>
          <MultiItemCarousel />
        </div>
      )}

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

          {localStorage.getItem("represent") ? null : (
            <>
              <div
                style={{ margin: "25px 0px" }}
                onClick={() => navigate("/login")}
              >
                <button className="btn btn-success">Get started</button>
              </div>
            </>
          )}
        </div>

        <div className="flexbox" style={{ flex: 1 }}>
          <img
            src="fruit.png"
            alt="Fruit"
            style={{ maxWidth: "80%", height: "auto" }}
          />
        </div>
      </div>

      {localStorage.getItem("represent") ? (
        <div className="parent-demo-post">
          <div className="row demo-new-post">
            <div style={{ margin: "10px 0px" }}>
              <h2 style={{ textAlign: "center", color: "white" }}>
                <strong>Let's gather and expand the network ✨</strong>{" "}
              </h2>
              <p style={{ textAlign: "center", color: "white" }}>
                Boost network speed by at least <strong>50%</strong>.
              </p>
            </div>

            <div className="col-md-6 col-12 demo-post">
              <div className="sample-new-feed">
                <div className="user-info d-flex align-items-start">
                  <img
                    src="https://1.img-dpreview.com/files/p/TS560x560~forums/63132016/2a1e59e12f4543bea10f2385259c81cf"
                    alt=""
                    style={{ width: "50px", borderRadius: "50%" }}
                  />
                  <div className="user-info-child">
                    <p className="first">Angela</p>
                    <p className="second">Food Bank Administrator</p>
                    <p className="third">1 day ago</p>
                  </div>
                </div>

                <p className="news-des">{des}</p>

                <img
                  src="https://raisincdn.akaraisin.com/Org_307/EventLocation_22274/Public/oi8nx9169.jpg"
                  alt=""
                  className="news-img"
                />

                <div className="comment-section">
                  <div className="like">
                    <img
                      src="https://1.img-dpreview.com/files/p/TS560x560~forums/63132016/2a1e59e12f4543bea10f2385259c81cf"
                      alt=""
                      className="current-user"
                      style={{ width: "30px", borderRadius: "50%" }}
                    />
                  </div>
                  <div className="like">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      size="lg"
                      style={{ marginRight: "5px" }}
                      bounce
                    />
                    Like
                  </div>

                  <div className="like">
                    <FontAwesomeIcon
                      icon={faCommentDots}
                      size="lg"
                      style={{ marginRight: "5px" }}
                    />
                    Comment
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12 demo-post">
              <div className="popup demo-popup">
                <div
                  className="d-flex"
                  style={{
                    width: "100%",
                    padding: "24px 24px 24px 24px",
                    height: "100%",
                    backgroundColor: "white",
                    borderRadius: "10px",
                  }}
                >
                  <div style={{ width: "100%" }}>
                    <div className="d-flex">
                      <div>
                        <img
                          src="https://1.img-dpreview.com/files/p/TS560x560~forums/63132016/2a1e59e12f4543bea10f2385259c81cf"
                          alt=""
                          style={{ width: "70px", borderRadius: "50%" }}
                        />
                      </div>
                      <div style={{ marginLeft: "10px" }}>
                        <p style={{ margin: "0px" }}>Angela</p>
                        <p style={{ margin: "0px" }}>Post to community</p>
                      </div>
                    </div>
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="7"
                      style={{
                        width: "100%",
                        marginTop: "20px",
                        padding: "10px",
                        border: "none",
                        outline: "none",
                      }}
                      maxLength="1000"
                      placeholder="What's on your mind?"
                      value={des}
                      onChange={(e) => setDes(e.target.value)}
                    ></textarea>

                    <p
                      style={{ textAlign: "right", margin: "0px" }}
                    >{`${des.length}/1000 Characters`}</p>

                    <hr />

                    <div
                      className="d-flex"
                      style={{ justifyContent: "flex-end" }}
                    >
                      <button className="btn btn-secondary">Post</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div
        style={{
          width: "95%",
          margin: "auto",
          marginTop: "30px",
          marginBottom: "30px",
        }}
      >
        <h2>FAQ Section</h2>

        <FaqSection />
      </div>

      <Footer />
    </div>
  );
}

export default UserHome;
