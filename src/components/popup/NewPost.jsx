import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "../../Header.css";

const { REACT_APP_API_ENDPOINT, REACT_APP_AWS } = process.env;

const NewPost = ({ setShowPopup, ...props }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const [des, setDes] = useState("");

  const closePopup = () => {
    setIsPopupVisible(false);
    setShowPopup(false);
  };

  const handleChange = (e) => {
    setDes(e.target.value);
  };

  return (
    <div>
      {isPopupVisible && (
        <div className="popup">
          <div
            className="d-flex"
            style={{
              width: "100%",
              padding: "24px 24px 24px 24px",
              height: "100%",
            }}
          >
            <div style={{ width: "100%" }}>
              <div className="d-flex">
                <div>
                  <img
                    src="/user.jpeg"
                    alt=""
                    style={{ width: "70px", borderRadius: "50%" }}
                  />
                </div>
                <div style={{ marginLeft: "10px" }}>
                  <p style={{ margin: "0px" }}>Username</p>
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
                onChange={handleChange}
              ></textarea>

              <p
                style={{ textAlign: "right", margin: "0px" }}
              >{`${des.length}/1000 Characters`}</p>

              <div className=" documents" style={{ marginBottom: "20px" }}>
                <input type="file" name="" id="" style={{ width: "100%" }} />
              </div>
              <hr />

              <div className="d-flex" style={{ justifyContent: "flex-end" }}>
                <button className="btn btn-secondary">Post</button>
              </div>
            </div>
            <div
              className="ml12 aside-cta flex--item print:d-none"
              onClick={closePopup}
            >
              <FontAwesomeIcon
                icon={faXmark}
                style={{ cursor: "pointer" }}
                size="lg"
              />
            </div>
          </div>
        </div>
      )}

      {isPopupVisible && <div className="overlay"></div>}

      <style>
        {`
          .popup {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgb(255, 255, 255);
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            width: 60%;
            border-radius: 10px;
          }

          .button-container {
            display: flex;
            justify-content: space-between;
            margin-top: 20px; /* Adjust as needed */
          }

          .popup h2 {
            margin-bottom: 10px;
          }

          .popup p {
            margin-bottom: 20px;
          }

          .popup button {
            padding: 7px 10px;
            background-color: rgb(0, 213, 255);
            font-weight: bold;
            
          }

          .popup button:hover {
            background-color: rgb(1, 185, 222);
          }

          .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 9998;
          }

          @media screen and (max-width: 768px) {

            .popup {
              width: 80%;
            }
          }
          

        `}
      </style>
    </div>
  );
};

export default NewPost;
