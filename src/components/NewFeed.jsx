import "../NewFeed.css";
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./partial/Header";
import Footer from "./partial/Footer";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function NewFeed() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // if (!localStorage.getItem("token")) {
    //   navigate("/");
    // }
  }, []);

  return (
    <div className="News">
      <Header title="News Feed | SFN Community" />

      <div class="container-fluid mt-4">
        <div class="row">
          <div class="col-md-2">
            <div className="profile">
              <img
                src="/user.jpeg"
                alt=""
                style={{ width: "70px", borderRadius: "50%" }}
              />
              <p style={{ marginTop: "10px" }}>Username</p>
              <p>Represent of</p>
              <div className="user-setting" style={{ textAlign: "left" }}>
                <hr />
                <p style={{ margin: "10px 0px" }}>News Feed</p>
                <p style={{ margin: "10px 0px" }}>My post</p>
                <p style={{ margin: "10px 0px" }}>Setting</p>
              </div>
            </div>
          </div>

          <div class="col-md-8">
            <div class="new-post-div d-flex flex-column">
              <div class="d-flex align-items-center">
                <div>
                  <img
                    src="/user.jpeg"
                    alt=""
                    style={{ width: "50px", borderRadius: "50%" }}
                  />
                </div>
                <div style={{ flex: 1, marginLeft: "10px" }}>
                  <input
                    type="text"
                    style={{
                      height: "50px",
                      borderRadius: "40px",
                      width: "100%",
                      border: "1px solid #ccc",
                      padding: "0px 20px 0px 20px",
                    }}
                    placeholder="What's on your mind?"
                  />
                </div>
              </div>

              <div class=" documents">
                <input type="file" name="" id="" style={{ width: "100%" }} />
              </div>
            </div>

            <hr />
            {loading ? (
              <div className="spin-div">
                <FontAwesomeIcon icon={faSpinner} size="xl" spin />
              </div>
            ) : (
              <div className="new-feed-div"></div>
            )}
          </div>

          <div class="col-md-2">
            <div>
              <p>Community News</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default NewFeed;
