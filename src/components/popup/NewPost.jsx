import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "../../Header.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AWS from "aws-sdk";

const {
  REACT_APP_BUCKET,
  REACT_APP_API_ENDPOINT,
  REACT_APP_ACCESS_ID,
  REACT_APP_SECRET_ACCESS_ID,
  REACT_APP_REGION,
  REACT_APP_AWS,
} = process.env;
const token = localStorage.getItem("token");

AWS.config.update({
  accessKeyId: REACT_APP_ACCESS_ID,
  secretAccessKey: REACT_APP_SECRET_ACCESS_ID,
  region: REACT_APP_REGION,
});

const s3 = new AWS.S3({
  params: {
    Bucket: REACT_APP_BUCKET,
  },
});

const NewPost = ({ setShowPopup, ...props }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const [description, setDes] = useState("");
  const userId = localStorage.getItem("user");
  const [loading, setLoading] = useState(false);

  const [imageSrcs, setImageSrcs] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const closePopup = () => {
    setIsPopupVisible(false);
    setShowPopup(false);
  };

  const handleChange = (e) => {
    setDes(e.target.value);
  };

  const handleFileChange = (event) => {
    setImageFiles(randomString + event.target.files[0].name);
    setSelectedFile(event.target.files[0]);

    const reader = new FileReader();
    reader.onload = function (e) {
      setImageSrcs(e.target.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  //upload image
  const handleUpload = async () => {
    setLoading(true);
    if (selectedFile) {
      const params = {
        Key: imageFiles,
        ContentType: selectedFile.type,
        Body: selectedFile,
        ACL: "public-read",
      };

      s3.upload(params, (err, data) => {
        if (err) {
          toast.error("Error uploading file", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

          console.log(err);
        } else {
          toast.success("File uploaded successfully");
          setLoading(false);
        }
      });
    }

    try {
      axios
        .post(`${process.env.REACT_APP_API_ENDPOINT}/newsfeed`, {
          userId: userId,
          description: description,
          images: imageFiles,
        })
        .then((res) => {
          console.log(res.data);
          toast.success("News feed added successfully!");
          window.location.reload();
        });
    } catch (err) {}
  };

  function generateRandomString() {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@$*";
    let result = "";
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }
    result += localStorage.getItem("id");
    return result;
  }

  const randomString = generateRandomString();

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
                  <p style={{ margin: "0px" }}>Operator</p>
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
              >{`${description.length}/1000 Characters`}</p>

              <div className=" documents" style={{ marginBottom: "20px" }}>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                />{" "}
              </div>
              <hr />

              <div
                className="d-flex"
                style={{ justifyContent: "flex-end" }}
                onClick={() => handleUpload()}
              >
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
