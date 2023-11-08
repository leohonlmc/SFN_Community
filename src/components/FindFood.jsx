import "../Search.css";
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
import axios from "axios";
import NearestLocationFinder from "./function/NearestLocationFinder";

function FindFood() {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState(
    localStorage.getItem("location") || "All"
  );
  const [selectedFoodBank, setSelectedFoodBank] = useState(
    localStorage.getItem("foodBank") || "All"
  );
  const [selectedFoodCategory, setSelectedFoodCategory] = useState(
    localStorage.getItem("foodCategory") || "All"
  );

  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  const myCoords = { lat: 43.70011, lng: -79.4163 };

  const address = [
    "7140 Goreway Dr, Mississauga, ON L4T 2T6",
    "157 Byng Ave, Scarborough, ON M1L3P3",
    "191 New Toronto Street Toronto, ON M8V 2E7",
    "9680 Ninth Line, Markham, ON L6B 1A8",
  ];

  const allLocation = [
    "All",
    "Toronto",
    "Mississauga",
    "Markham",
    "Scarborough",
  ];

  const allFoodBank = [
    "All",
    "Said Ham Food Bank",
    "Scarborough Food Security Initiative",
    "Daily Bread Food Bank",
    "Cornerstone food bank",
  ];

  const allFoodCategory = [
    "All",
    "Fruits",
    "Vegetables",
    "Meat",
    "Dairy",
    "Grains",
    "Canned Goods",
    "Beverages",
    "Snacks",
  ];

  useEffect(() => {
    localStorage.setItem("location", selectedLocation);
  }, [selectedLocation]);

  useEffect(() => {
    localStorage.setItem("foodBank", selectedFoodBank);
  }, [selectedFoodBank]);

  useEffect(() => {
    localStorage.setItem("foodCategory", selectedFoodCategory);
  }, [selectedFoodCategory]);

  const handleLocationChange = (e) => {
    localStorage.setItem("location", e.target.value);
    setSelectedLocation(e.target.value);
  };

  const handleFoodBankChange = (e) => {
    localStorage.setItem("foodBank", e.target.value);
    setSelectedFoodBank(e.target.value);
  };

  const handleFoodCategoryChange = (e) => {
    localStorage.setItem("foodCategory", e.target.value);
    setSelectedFoodCategory(e.target.value);
  };

  const handleSearchChange = (e) => {
    console.log(e.target.value);
    localStorage.setItem("food", e.target.value);
    setSearch(e.target.value);
  };

  return (
    <div className="Home">
      <Header title="Food Inquiry | SFN Community" />
      <div className="search-container parent-demo-post">
        <div className="search-div">
          <div className="search-area">
            <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
              What you want to get today?
            </h2>
            <div className="card search-form">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-12">
                    <div className="row no-gutters">
                      <div className="col-lg-1 col-md-1 col-sm-1 p-0">
                        <select
                          className="form-select"
                          aria-label=".form-select-sm example"
                          value={localStorage.getItem("location") || "All"}
                          onChange={(e) => handleLocationChange(e)}
                        >
                          {allLocation.map((item, index) => (
                            <option value={item} key={index}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-lg-2 col-md-2 col-sm-2 p-0">
                        <select
                          className="form-select"
                          id="exampleFormControlSelect1"
                          aria-label=".form-select-sm example"
                          value={localStorage.getItem("foodBank") || "All"}
                          onChange={(e) => handleFoodBankChange(e)}
                        >
                          {allFoodBank.map((item, index) => (
                            <option value={item} key={index}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-lg-1 col-md-1 col-sm-1 p-0">
                        <select
                          className="form-select"
                          id="exampleFormControlSelect1"
                          aria-label=".form-select-sm example"
                          value={localStorage.getItem("foodCategory") || "All"}
                          onChange={(e) => handleFoodCategoryChange(e)}
                        >
                          {allFoodCategory.map((item, index) => (
                            <option value={item} key={index}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-lg-6 col-md-5 col-sm-5 p-0">
                        <input
                          type="text"
                          placeholder="Search..."
                          className="form-control"
                          id="search"
                          name="search"
                          onChange={(e) => handleSearchChange(e)}
                        />
                      </div>
                      <div
                        className="col-lg-1 col-md-1 col-sm-2 p-0 reset"
                        onClick={() => {
                          localStorage.setItem("foodCategory", "All");
                          localStorage.setItem("food", "");
                          window.location.reload();
                        }}
                      >
                        <button className="btn btn-base">Reset</button>
                      </div>
                      <div
                        className="col-lg-1 col-md-2 col-sm-1 p-0"
                        onClick={() => navigate("/result")}
                        style={{ backgroundColor: "green" }}
                      >
                        <button className="btn btn-base">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-search"
                            style={{ color: "white" }}
                          >
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <br />

            <div className="filter-show">
              <span>You filtered: </span>
              <span className="selected">{selectedLocation}</span>
              <span className="selected">{selectedFoodBank}</span>
              <span className="selected">{selectedFoodCategory}</span>
              <br />
              <br />
              <span>{`Searching Keywords: ${search}`}</span>

              <NearestLocationFinder
                setSelectedFoodBank={setSelectedFoodBank}
              />
            </div>

            <div className="food-category-div row">
              <div
                className="category col-lg-3 col-md-4 col-sm-6"
                data-content="Meat"
                onClick={() => {
                  localStorage.setItem("foodCategory", "Meat");
                  localStorage.setItem("food", "");
                  localStorage.setItem("location", "All");
                  localStorage.setItem("foodBank", "All");
                  navigate("/result");
                }}
              >
                <img
                  src="https://images.ctfassets.net/odk340ad2lwh/3NNWlojETBJLfQNuDqgwSb/c8675eb4439f703ede5eddc3648743f1/WFC_7007_Chicken_Breast_Fillets_Raw.jpg?fm=webp&w=1920&h=1080"
                  alt=""
                  style={{ width: "100%" }}
                  className="img-fluid category-image"
                />
              </div>
              <div
                className="category col-lg-3 col-md-4 col-sm-6"
                data-content="Vegetable"
                onClick={() => {
                  localStorage.setItem("foodCategory", "Vegetables");
                  localStorage.setItem("food", "");
                  localStorage.setItem("location", "All");
                  localStorage.setItem("foodBank", "All");
                  navigate("/result");
                }}
              >
                <img
                  src="https://www.cnet.com/a/img/resize/fc685ebed35c7b1c5f4bcf6a6ce884e728d5d74d/hub/2022/06/23/259f9d31-e96c-4e9b-8c14-edd08798430b/twitter-hq-headquarters-02075.jpg?auto=webp&fit=crop&height=1200&width=1200"
                  alt=""
                  style={{ width: "100%" }}
                  className="img-fluid category-image"
                />
              </div>
              <div
                className="category col-lg-3 col-md-4 col-sm-6"
                data-content="Canned Goods"
                onClick={() => {
                  localStorage.setItem("foodCategory", "Canned Goods");
                  localStorage.setItem("food", "");
                  localStorage.setItem("location", "All");
                  localStorage.setItem("foodBank", "All");
                  navigate("/result");
                }}
              >
                <img
                  src="https://www.eatingwell.com/thmb/w1U6mpaeSe8XIkuYqkVDXO6vasQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cans-953d721826164ce0bb04cc0bf51a4396.jpg"
                  alt=""
                  style={{ width: "100%" }}
                  className="img-fluid category-image"
                />
              </div>
              <div
                className="category col-lg-3 col-md-4 col-sm-6"
                data-content="Beverages"
                onClick={() => {
                  localStorage.setItem("foodCategory", "Beverages");
                  localStorage.setItem("food", "");
                  localStorage.setItem("location", "All");
                  localStorage.setItem("foodBank", "All");
                  navigate("/result");
                }}
              >
                <img
                  src="https://hips.hearstapps.com/hmg-prod/images/publix-grocery-store-sports-drinks-display-news-photo-1593204642.jpg?crop=0.66699xw:1xh;center,top&resize=640:*"
                  alt=""
                  style={{ width: "100%", objectFit: "cover" }}
                  className="img-fluid category-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default FindFood;
