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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { REACT_APP_API_ENDPOINT } = process.env;

function Result() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

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

  const [saveItem, setSaveItem] = useState({});

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
    const localStorageDefaults = {
      location: "All",
      foodBank: "All",
      foodCategory: "All",
      food: "",
    };

    Object.entries(localStorageDefaults).forEach(([key, value]) => {
      if (localStorage.getItem(key) === null) {
        localStorage.setItem(key, value);
      }
    });

    const intervalId = setInterval(() => {
      fetchFoodData();
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  const handleOnSave = (saveItem) => {
    console.log(saveItem);
    axios
      .post(
        `${process.env.REACT_APP_API_ENDPOINT}/saveitem/${localStorage.getItem(
          "user"
        )}`,
        saveItem
      )
      .then((res) => {
        console.log(res.data);
        toast.success(
          `Item: ${res.data.item} from ${res.data.foodbank} saved successfully!`
        );
      })
      .catch((err) => {
        console.error(err);
        if (setError) setError(err);
      });
  };

  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <div className="Home">
      <Header title="Search | SFN Community" />
      <ToastContainer />
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
                        <td>{formatDate(food.expiration_date)}</td>
                        {token ? (
                          <td>
                            <FontAwesomeIcon
                              icon={faStar}
                              style={{ color: "#ffb800" }}
                              size="xl"
                              className="star-icon"
                              onClick={() => handleOnSave(food)}
                            />
                          </td>
                        ) : null}
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
                        <td>{formatDate(food.expiration_date)}</td>
                        {token ? (
                          <td>
                            <FontAwesomeIcon
                              icon={faStar}
                              style={{ color: "#ffb800" }}
                              size="xl"
                              className="star-icon"
                              onClick={() => handleOnSave(food)}
                            />
                          </td>
                        ) : null}
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
                        <td>{formatDate(food.expiration_date)}</td>
                        {token ? (
                          <td>
                            <FontAwesomeIcon
                              icon={faStar}
                              style={{ color: "#ffb800" }}
                              size="xl"
                              className="star-icon"
                              onClick={() => handleOnSave(food)}
                            />
                          </td>
                        ) : null}
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
                        <td>{formatDate(food.expiration_date)}</td>
                        {token ? (
                          <td>
                            <FontAwesomeIcon
                              icon={faStar}
                              style={{ color: "#ffb800" }}
                              size="xl"
                              className="star-icon"
                              onClick={() => handleOnSave(food)}
                            />
                          </td>
                        ) : null}
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
                        <td>{formatDate(food.expiration_date)}</td>
                        {token ? (
                          <td>
                            <FontAwesomeIcon
                              icon={faStar}
                              style={{ color: "#ffb800" }}
                              size="xl"
                              className="star-icon"
                              onClick={() => handleOnSave(food)}
                            />
                          </td>
                        ) : null}
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
                        <td>{formatDate(food.expiration_date)}</td>
                        {token ? (
                          <td>
                            <FontAwesomeIcon
                              icon={faStar}
                              style={{ color: "#ffb800" }}
                              size="xl"
                              className="star-icon"
                              onClick={() => handleOnSave(food)}
                            />
                          </td>
                        ) : null}
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
                        <td>{formatDate(food.expiration_date)}</td>
                        {token ? (
                          <td>
                            <FontAwesomeIcon
                              icon={faStar}
                              style={{ color: "#ffb800" }}
                              size="xl"
                              className="star-icon"
                              onClick={() => handleOnSave(food)}
                            />
                          </td>
                        ) : null}
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
                        <td>{formatDate(food.expiration_date)}</td>
                        {token ? (
                          <td>
                            <FontAwesomeIcon
                              icon={faStar}
                              style={{ color: "#ffb800" }}
                              size="xl"
                              className="star-icon"
                              onClick={() => handleOnSave(food)}
                            />
                          </td>
                        ) : null}
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
