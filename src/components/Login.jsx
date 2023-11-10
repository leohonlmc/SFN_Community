import "../Login.css";
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./partial/Header";
import Footer from "./partial/Footer";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { REACT_APP_API_ENDPOINT } = process.env;

function Login() {
  const navigate = useNavigate();
  const [register, setRegister] = useState(false);
  const [client, setClient] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [represent, setRepresent] = useState("");
  const [invitationCode, setInvitationCode] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleRepresent = (event) => {
    setRepresent(event.target.value);
  };

  const handleInvitationCode = (event) => {
    setInvitationCode(event.target.value);
  };

  const handleLoginEmail = (event) => {
    setLoginEmail(event.target.value);
  };

  const handleLoginPassword = (event) => {
    setLoginPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        `${REACT_APP_API_ENDPOINT}/register`,
        {
          email,
          password,
          represent,
          invitationCode,
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      toast.success("Register successfully!");
      setRegister(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        `${REACT_APP_API_ENDPOINT}/login`,
        {
          loginEmail,
          loginPassword,
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      toast.success("Login successfully!");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", data.user);
      localStorage.setItem("represent", data.represent);
      navigate("/food");

      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="Login">
      <Header title="Login | SFN Community" />

      <ToastContainer />

      {register ? (
        <section
          className="h-100 gradient-form"
          style={{ backgroundColor: "#eee" }}
        >
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-xl-10">
                <div className="card rounded-3 text-black">
                  <div className="row g-0">
                    <div className="col-lg-6">
                      <div className="card-body p-md-5 mx-md-4">
                        <div className="text-center">
                          <img
                            src="https://scarboroughfoodnetwork.ca/wp-content/uploads/2023/04/sfn-logo-green-filled-300x300-1.png"
                            style={{ width: "185px" }}
                            alt="logo"
                          />
                          {client ? (
                            <h4 className="mt-1 mb-4 pb-1">
                              Operator register
                            </h4>
                          ) : (
                            <h4 className="mt-1 mb-4 pb-1">User register</h4>
                          )}
                        </div>

                        {client ? (
                          <p
                            className="mb-2"
                            style={{ textAlign: "center", cursor: "pointer" }}
                            onClick={() => setClient(false)}
                          >
                            Our user only?
                          </p>
                        ) : (
                          <p
                            className="mb-2"
                            style={{ textAlign: "center", cursor: "pointer" }}
                            onClick={() => setClient(true)}
                          >
                            Are you our operator?
                          </p>
                        )}

                        <form onSubmit={(e) => handleSubmit(e)}>
                          <div className="form-outline mb-4">
                            <p style={{ textAlign: "right" }}>
                              Please fill in all area *
                            </p>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Email address"
                              onChange={handleEmail}
                            />
                          </div>

                          <div className="form-outline mb-4">
                            <input
                              type="password"
                              className="form-control"
                              placeholder="Password"
                              onChange={handlePassword}
                            />
                          </div>

                          {client ? (
                            <>
                              <div className="form-outline mb-4">
                                <input
                                  type="represent"
                                  className="form-control"
                                  placeholder="Represent as"
                                  onChange={handleRepresent}
                                />
                              </div>
                              <div className="form-outline mb-4">
                                <input
                                  type="invitation"
                                  className="form-control"
                                  placeholder="Invitation code"
                                  onChange={handleInvitationCode}
                                />
                              </div>
                            </>
                          ) : null}

                          <div className="text-center pt-1 mb-5 pb-1">
                            <button
                              className="btn btn-success btn-block fa-lg gradient-custom-2 mb-3"
                              type="submit"
                            >
                              Register
                            </button>
                          </div>

                          <div className="d-flex align-items-center justify-content-center pb-4">
                            <p className="mb-0 me-2">Already registered?</p>
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              onClick={() => setRegister(false)}
                            >
                              Login
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                      <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                        <h4 className="mb-4">
                          We are more than just a Network
                        </h4>
                        <p className="small mb-0">
                          <strong>Scarborough Food Network (SFN)</strong> is
                          dedicated to bridging Food Banks with communities,
                          fostering a cohesive network to combat hunger and
                          ensure everyone has access to nutritious meals. 🌎
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section
          className="h-100 gradient-form"
          style={{ backgroundColor: "#eee" }}
        >
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-xl-10">
                <div className="card rounded-3 text-black">
                  <div className="row g-0">
                    <div className="col-lg-6">
                      <div className="card-body p-md-5 mx-md-4">
                        <div className="text-center">
                          <img
                            src="https://scarboroughfoodnetwork.ca/wp-content/uploads/2023/04/sfn-logo-green-filled-300x300-1.png"
                            style={{ width: "185px" }}
                            alt="logo"
                          />
                          <h4 className="mt-1 mb-5 pb-1">
                            We are The Community
                          </h4>
                        </div>

                        <form onSubmit={(e) => handleLogin(e)}>
                          <p>Please login to your account</p>

                          <div className="form-outline mb-4">
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Email address"
                              onChange={handleLoginEmail}
                            />
                          </div>

                          <div className="form-outline mb-4">
                            <input
                              type="password"
                              className="form-control"
                              placeholder="Password"
                              onChange={handleLoginPassword}
                            />
                          </div>

                          <div className="text-center pt-1 mb-5 pb-1">
                            <button
                              className="btn btn-success btn-block fa-lg gradient-custom-2 mb-3"
                              type="submit"
                            >
                              Log in
                            </button>
                          </div>

                          <div className="d-flex align-items-center justify-content-center pb-4">
                            <p className="mb-0 me-2">New user?</p>
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              onClick={() => setRegister(true)}
                            >
                              Create new
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                      <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                        <h4 className="mb-4">
                          We are more than just a Network
                        </h4>
                        <p className="small mb-0">
                          <strong>Scarborough Food Network (SFN)</strong> is
                          dedicated to bridging Food Banks with communities,
                          fostering a cohesive network to combat hunger and
                          ensure everyone has access to nutritious meals. 🌎
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

export default Login;
