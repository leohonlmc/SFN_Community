import "../NewFeed.css";
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./partial/Header";
import Footer from "./partial/Footer";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faThumbsUp,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import NewPost from "./popup/NewPost";
import axios from "axios";
import formatDateString from "./function/formatDateString";

function NewFeed() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}/api/newsfeed`)
      .then((res) => {
        setNews(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="News">
      <Header title="News Feed | SFN Community" />

      {showPopup && <NewPost setShowPopup={setShowPopup} />}

      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-2">
            <div className="profile">
              <img
                src="/user.jpeg"
                alt=""
                style={{ width: "70px", borderRadius: "50%" }}
              />
              <p style={{ marginTop: "10px" }}>Operator</p>
              <p>{localStorage.getItem("represent")}</p>
              <div className="user-setting" style={{ textAlign: "left" }}>
                <hr />
                <p style={{ margin: "10px 0px" }}>News Feed</p>
                <p style={{ margin: "10px 0px" }}>My post</p>
                <p style={{ margin: "10px 0px" }}>Setting</p>
              </div>
            </div>
          </div>

          <div className="col-md-7">
            <div className="new-post-div d-flex flex-column">
              <div className="d-flex align-items-center">
                <div>
                  <img
                    src="/user.jpeg"
                    alt=""
                    style={{ width: "50px", borderRadius: "50%" }}
                  />
                </div>
                <div
                  style={{ flex: 1, marginLeft: "10px" }}
                  onClick={() => setShowPopup(true)}
                >
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

              {/* <div className=" documents">
                <input type="file" name="" id="" style={{ width: "100%" }} />
              </div> */}
            </div>

            <div className="divider-container">
              <hr className="divider-line" />
              <p>
                <strong>News Feed - Sort by Newest</strong>
              </p>
              <hr className="divider-line" />
            </div>

            {!loading ? (
              <div className="spin-div">
                <FontAwesomeIcon icon={faSpinner} size="xl" spin />
              </div>
            ) : (
              <>
                <div className="new-feed-div">
                  {news.map((item, index) => (
                    <div className="sample-new-feed">
                      <div className="user-info d-flex align-items-start">
                        <img
                          src="/user.jpeg"
                          alt=""
                          style={{ width: "50px", borderRadius: "50%" }}
                        />
                        <div className="user-info-child">
                          <p className="first">Operator</p>
                          <p className="second">Sai Dham Food Bank</p>
                          <p className="third">
                            {formatDateString(item.createdAt)}
                          </p>
                        </div>
                      </div>

                      <p className="news-des">{item.description}</p>

                      <img
                        src={`https://s3.ca-central-1.amazonaws.com/myswecompany.com/${item.images}`}
                        alt=""
                        className="news-img"
                      />

                      <div className="comment-section">
                        <div className="like">
                          <img
                            src="/user.jpeg"
                            alt=""
                            className="current-user"
                            style={{ width: "30px" }}
                          />
                        </div>
                        <div className="like">
                          <FontAwesomeIcon
                            icon={faThumbsUp}
                            size="xl"
                            style={{ marginRight: "5px" }}
                          />
                          Like
                        </div>

                        <div className="like">
                          <FontAwesomeIcon
                            icon={faCommentDots}
                            size="xl"
                            style={{ marginRight: "5px" }}
                          />
                          Comment
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="sample-new-feed">
                    <div className="user-info d-flex align-items-start">
                      <img
                        src="/user.jpeg"
                        alt=""
                        style={{ width: "50px", borderRadius: "50%" }}
                      />
                      <div className="user-info-child">
                        <p className="first">Username</p>
                        <p className="second">Represent of</p>
                        <p className="third">1 day ago</p>
                      </div>
                    </div>

                    <p className="news-des">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Phasellus lobortis enim ac leo dapibus, at dignissim risus
                      fringilla. Duis blandit sit amet metus et ultricies. Nam
                      euismod mauris id eros pharetra egestas. Quisque consequat
                      cursus elit a pharetra. Curabitur pulvinar, purus et
                      mattis lobortis, neque purus fermentum magna, in aliquet
                      nisi sem sit amet est. Nam molestie gravida velit non
                      ullamcorper. Cras consectetur vehicula mauris eu euismod.
                      Duis non suscipit nisi, et consectetur odio.
                    </p>

                    <img
                      src="https://raisincdn.akaraisin.com/Org_307/EventLocation_22274/Public/oi8nx9169.jpg"
                      alt=""
                      className="news-img"
                    />

                    <div className="comment-section">
                      <div className="like">
                        <img
                          src="/user.jpeg"
                          alt=""
                          className="current-user"
                          style={{ width: "30px" }}
                        />
                      </div>
                      <div className="like">
                        <FontAwesomeIcon
                          icon={faThumbsUp}
                          size="xl"
                          style={{ marginRight: "5px" }}
                        />
                        Like
                      </div>

                      <div className="like">
                        <FontAwesomeIcon
                          icon={faCommentDots}
                          size="xl"
                          style={{ marginRight: "5px" }}
                        />
                        Comment
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="col-md-3">
            <div className="right">
              <p>Community News</p>
              <hr />
              <div>
                <img
                  src="https://www.ctvnews.ca/content/dam/ctvnews/en/images/2023/10/25/a-group-loads-food-1-6616570-1698254317690.jpg"
                  alt=""
                  style={{ width: "100%" }}
                />
                <a href="https://www.ctvnews.ca/canada/more-canadian-households-struggling-to-put-food-on-the-table-due-to-high-cost-of-living-report-1.6616564">
                  More Canadian households struggling to put food on the table
                  due to high cost of living: report
                </a>

                <p>Oct. 25, 2023 1:18 p.m.</p>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewFeed;
