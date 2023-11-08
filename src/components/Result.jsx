import "../Result.css";
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
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const { REACT_APP_API_ENDPOINT } = process.env;

function Result() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const location = localStorage.getItem("location");
  const foodBank = localStorage.getItem("foodBank");
  const category = localStorage.getItem("foodCategory"); // This was foodCategory in your code
  const search = localStorage.getItem("food");

  //   "Fruits",
  //   "Vegetables",
  //   "Meat",
  //   "Dairy",
  //   "Grains",
  //   "Canned Goods",
  //   "Beverages",
  //   "Snacks",

  const [meat, setMeatData] = useState([]);
  const [fruits, setFruitsData] = useState([]);
  const [vegetables, setVegetablesData] = useState([]);
  const [dairy, setDairyData] = useState([]);
  const [grains, setGrainsData] = useState([]);
  const [cannedGoods, setCannedGoodsData] = useState([]);
  const [beverages, setBeveragesData] = useState([]);
  const [snacks, setSnacksData] = useState([]);

  const constructQuery = () => {
    const query = {};

    if (location && location !== "All") {
      query.location = location;
    }

    if (foodBank && foodBank !== "All") {
      query.foodBank = foodBank;
    }

    if (category && category !== "All") {
      query.category = category;
    }

    if (search && search.trim() !== "") {
      query.search = search.trim();
    }

    return query;
  };

  const fetchFoodData = () => {
    const query = constructQuery();
    const queryString = new URLSearchParams(query).toString();

    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}/foodbanks?${queryString}`)
      .then((res) => {
        const filteredData = {
          Meat: res.data.filter((food) => food.category === "Meat"),
          Fruits: res.data.filter((food) => food.category === "Fruits"),
          Vegetables: res.data.filter((food) => food.category === "Vegetables"),
          Dairy: res.data.filter((food) => food.category === "Dairy"),
          Grains: res.data.filter((food) => food.category === "Grains"),
          CannedGoods: res.data.filter(
            (food) => food.category === "Canned Goods"
          ),
          Beverages: res.data.filter((food) => food.category === "Beverages"),
          Snacks: res.data.filter((food) => food.category === "Snacks"),
        };

        // Now, only set state for those categories with data
        if (filteredData.Meat.length > 0) setMeatData(filteredData.Meat);
        if (filteredData.Fruits.length > 0) setFruitsData(filteredData.Fruits);
        if (filteredData.Vegetables.length > 0)
          setVegetablesData(filteredData.Vegetables);
        if (filteredData.Dairy.length > 0) setDairyData(filteredData.Dairy);
        if (filteredData.Grains.length > 0) setGrainsData(filteredData.Grains);
        if (filteredData.CannedGoods.length > 0)
          setCannedGoodsData(filteredData.CannedGoods);
        if (filteredData.Beverages.length > 0)
          setBeveragesData(filteredData.Beverages);
        if (filteredData.Snacks.length > 0) setSnacksData(filteredData.Snacks);
      })
      .catch((err) => {
        console.error(err);
        if (setError) setError(err);
      });
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }

    if (localStorage.getItem("location") === null) {
      localStorage.setItem("location", "All");
    }
    if (localStorage.getItem("foodBank") === null) {
      localStorage.setItem("foodBank", "All");
    }
    if (localStorage.getItem("foodCategory") === null) {
      localStorage.setItem("foodCategory", "All");
    }
    if (localStorage.getItem("food") === null) {
      localStorage.setItem("food", "");
    }

    fetchFoodData();
  }, []);

  return (
    <div className="Home">
      <Header title="Search | SFN Community" />
      <div className="result-container">
        <h2>Search Result</h2>
        <p>{`Location: ${location}, Food Bank: ${foodBank}, Category: ${category}, Keywords: ${search}`}</p>

        <hr />

        <div className="results-div">
          {meat && meat.length > 0 ? (
            <>
              {" "}
              <h3>Meat</h3>
              <div className="result-item table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Food Bank</th>
                      <th scope="col">Item Name</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Expiration Date</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {meat.map((food, index) => (
                      <tr key={index}>
                        <td>{food.foodBank}</td>
                        <td>{food.item_name}</td>
                        <td>{food.quantity}</td>
                        <td>{food.expiration_date}</td>
                        <td>
                          <FontAwesomeIcon
                            icon={faStar}
                            style={{ color: "#ffb800" }}
                            size="xl"
                            className="star-icon"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : null}

          {fruits && fruits.length > 0 ? (
            <>
              <h3>Fruits</h3>
              <div className="result-item table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Food Bank</th>
                      <th scope="col">Item Name</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Expiration Date</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fruits.map((food, index) => (
                      <tr key={index}>
                        <td>{food.foodBank}</td>
                        <td>{food.item_name}</td>
                        <td>{food.quantity}</td>
                        <td>{food.expiration_date}</td>
                        <td>
                          <FontAwesomeIcon
                            icon={faStar}
                            style={{ color: "#ffb800" }}
                            size="xl"
                            className="star-icon"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : null}

          {vegetables && vegetables.length > 0 ? (
            <>
              {" "}
              <h3>Vegetables</h3>
              <div className="result-item table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Food Bank</th>
                      <th scope="col">Item Name</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Expiration Date</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vegetables.map((food, index) => (
                      <tr key={index}>
                        <td>{food.foodBank}</td>
                        <td>{food.item_name}</td>
                        <td>{food.quantity}</td>
                        <td>{food.expiration_date}</td>
                        <td>
                          <FontAwesomeIcon
                            icon={faStar}
                            style={{ color: "#ffb800" }}
                            size="xl"
                            className="star-icon"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : null}

          {dairy && dairy.length > 0 ? (
            <>
              <h3>Dairy</h3>
              <div className="result-item table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Food Bank</th>
                      <th scope="col">Item Name</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Expiration Date</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dairy.map((food, index) => (
                      <tr key={index}>
                        <td>{food.foodBank}</td>
                        <td>{food.item_name}</td>
                        <td>{food.quantity}</td>
                        <td>{food.expiration_date}</td>
                        <td>
                          <FontAwesomeIcon
                            icon={faStar}
                            style={{ color: "#ffb800" }}
                            size="xl"
                            className="star-icon"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : null}

          {grains && grains.length > 0 ? (
            <>
              <h3>Grains</h3>
              <div className="result-item table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Food Bank</th>
                      <th scope="col">Item Name</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Expiration Date</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grains.map((food, index) => (
                      <tr key={index}>
                        <td>{food.foodBank}</td>
                        <td>{food.item_name}</td>
                        <td>{food.quantity}</td>
                        <td>{food.expiration_date}</td>
                        <td>
                          <FontAwesomeIcon
                            icon={faStar}
                            style={{ color: "#ffb800" }}
                            size="xl"
                            className="star-icon"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : null}

          {cannedGoods && cannedGoods.length > 0 ? (
            <>
              <h3>Canned Food</h3>

              <div className="result-item table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Food Bank</th>
                      <th scope="col">Item Name</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Expiration Date</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cannedGoods.map((food, index) => (
                      <tr key={index}>
                        <td>{food.foodBank}</td>
                        <td>{food.item_name}</td>
                        <td>{food.quantity}</td>
                        <td>{food.expiration_date}</td>
                        <td>
                          <FontAwesomeIcon
                            icon={faStar}
                            style={{ color: "#ffb800" }}
                            size="xl"
                            className="star-icon"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : null}

          {beverages && beverages.length > 0 ? (
            <>
              <h3>Beverages</h3>

              <div className="result-item table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Food Bank</th>
                      <th scope="col">Item Name</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Expiration Date</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {beverages.map((food, index) => (
                      <tr key={index}>
                        <td>{food.foodBank}</td>
                        <td>{food.item_name}</td>
                        <td>{food.quantity}</td>
                        <td>{food.expiration_date}</td>
                        <td>
                          <FontAwesomeIcon
                            icon={faStar}
                            style={{ color: "#ffb800" }}
                            size="xl"
                            className="star-icon"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : null}

          {snacks && snacks.length > 0 ? (
            <>
              {" "}
              <h3>Snacks</h3>
              <div className="result-item table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Food Bank</th>
                      <th scope="col">Item Name</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Expiration Date</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {snacks.map((food, index) => (
                      <tr key={index}>
                        <td>{food.foodBank}</td>
                        <td>{food.item_name}</td>
                        <td>{food.quantity}</td>
                        <td>{food.expiration_date}</td>
                        <td>
                          <FontAwesomeIcon
                            icon={faStar}
                            style={{ color: "#ffb800" }}
                            size="xl"
                            className="star-icon"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : null}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Result;
