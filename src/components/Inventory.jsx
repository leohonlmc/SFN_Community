import "../Search.css";
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./partial/Header";
import Footer from "./partial/Footer";
import { useNavigate, Link } from "react-router-dom";
import MultiItemCarousel from "./partial/MultiItemCarousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { REACT_APP_API_ENDPOINT } = process.env;

function Inventory() {
  const navigate = useNavigate();
  const [Inventory, setInventory] = useState([]);
  const [quantity, setQuantity] = useState(0);

  const [meat, setMeatData] = useState([]);
  const [fruits, setFruitsData] = useState([]);
  const [vegetables, setVegetablesData] = useState([]);
  const [dairy, setDairyData] = useState([]);
  const [grains, setGrainsData] = useState([]);
  const [cannedGoods, setCannedGoodsData] = useState([]);
  const [beverages, setBeveragesData] = useState([]);
  const [snacks, setSnacksData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_ENDPOINT}/foodbank/${localStorage.getItem(
          "represent"
        )}`
      )
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

        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleUpdate = async (id) => {
    try {
      const { data } = await axios.patch(
        `${REACT_APP_API_ENDPOINT}/update/${id}`,
        {
          quantity,
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      toast.success("Item quantity updated successfully!");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Home">
      <Header title="Manage | SFN Community" />
      <ToastContainer />

      <div className="result-container">
        <h2>Manage Inventory</h2>

        <hr />

        {loading ? (
          <div style={{ textAlign: "center", margin: "50px 0px" }}>
            <FontAwesomeIcon icon={faSpinner} spin size="2xl" />
          </div>
        ) : (
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
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {meat.map((food, index) => (
                        <tr key={index}>
                          <td>{food.foodBank}</td>
                          <td>{food.item_name}</td>
                          <td>{food.quantity}</td>
                          <td>{formatDate(food.expiration_date)}</td>
                          <td>
                            <input
                              type="number"
                              className="ml-2"
                              style={{ width: "100px" }}
                              onChange={handleQuantityChange}
                            />
                          </td>
                          <td>
                            <button
                              className="btn btn-success"
                              onClick={(e) => handleUpdate(food._id)}
                            >
                              Update
                            </button>
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
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {fruits.map((food, index) => (
                        <tr key={index}>
                          <td>{food.foodBank}</td>
                          <td>{food.item_name}</td>
                          <td>{food.quantity}</td>
                          <td>{formatDate(food.expiration_date)}</td>
                          <td>
                            <input
                              type="number"
                              className="ml-2"
                              style={{ width: "100px" }}
                              onChange={handleQuantityChange}
                            />
                          </td>
                          <td>
                            <button
                              className="btn btn-success"
                              onClick={(e) => handleUpdate(food._id)}
                            >
                              Update
                            </button>{" "}
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
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {vegetables.map((food, index) => (
                        <tr key={index}>
                          <td>{food.foodBank}</td>
                          <td>{food.item_name}</td>
                          <td>{food.quantity}</td>
                          <td>{formatDate(food.expiration_date)}</td>
                          <td>
                            <input
                              type="number"
                              className="ml-2"
                              style={{ width: "100px" }}
                              onChange={handleQuantityChange}
                            />
                          </td>
                          <td>
                            <button
                              className="btn btn-success"
                              onClick={(e) => handleUpdate(food._id)}
                            >
                              Update
                            </button>{" "}
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
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {dairy.map((food, index) => (
                        <tr key={index}>
                          <td>{food.foodBank}</td>
                          <td>{food.item_name}</td>
                          <td>{food.quantity}</td>
                          <td>{formatDate(food.expiration_date)}</td>
                          <td>
                            <input
                              type="number"
                              className="ml-2"
                              style={{ width: "100px" }}
                              onChange={handleQuantityChange}
                            />
                          </td>
                          <td>
                            <button
                              className="btn btn-success"
                              onClick={(e) => handleUpdate(food._id)}
                            >
                              Update
                            </button>{" "}
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
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {grains.map((food, index) => (
                        <tr key={index}>
                          <td>{food.foodBank}</td>
                          <td>{food.item_name}</td>
                          <td>{food.quantity}</td>
                          <td>{formatDate(food.expiration_date)}</td>
                          <td>
                            <input
                              type="number"
                              className="ml-2"
                              style={{ width: "100px" }}
                              onChange={handleQuantityChange}
                            />
                          </td>
                          <td>
                            <button
                              className="btn btn-success"
                              onClick={(e) => handleUpdate(food._id)}
                            >
                              Update
                            </button>{" "}
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
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cannedGoods.map((food, index) => (
                        <tr key={index}>
                          <td>{food.foodBank}</td>
                          <td>{food.item_name}</td>
                          <td>{food.quantity}</td>
                          <td>{formatDate(food.expiration_date)}</td>
                          <td>
                            <input
                              type="number"
                              className="ml-2"
                              style={{ width: "100px" }}
                              onChange={handleQuantityChange}
                            />
                          </td>
                          <td>
                            <button
                              className="btn btn-success"
                              onClick={(e) => handleUpdate(food._id)}
                            >
                              Update
                            </button>{" "}
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
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {beverages.map((food, index) => (
                        <tr key={index}>
                          <td>{food.foodBank}</td>
                          <td>{food.item_name}</td>
                          <td>{food.quantity}</td>
                          <td>{formatDate(food.expiration_date)}</td>
                          <td>
                            <input
                              type="number"
                              className="ml-2"
                              style={{ width: "100px" }}
                              onChange={handleQuantityChange}
                            />
                          </td>

                          <td>
                            <button
                              className="btn btn-success"
                              onClick={(e) => handleUpdate(food._id)}
                            >
                              Update
                            </button>{" "}
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
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {snacks.map((food, index) => (
                        <tr key={index}>
                          <td>{food.foodBank}</td>
                          <td>{food.item_name}</td>
                          <td>{food.quantity}</td>
                          <td>{formatDate(food.expiration_date)}</td>
                          <td>
                            <input
                              type="number"
                              className="ml-2"
                              style={{ width: "100px" }}
                              onChange={handleQuantityChange}
                            />
                          </td>
                          <td>
                            <button
                              className="btn btn-success"
                              onClick={(e) => handleUpdate(food._id)}
                            >
                              Update
                            </button>{" "}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : null}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Inventory;
