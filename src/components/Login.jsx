import "../Login.css";
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./partial/Header";
import Footer from "./partial/Footer";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="Login">
      <Header title="Login | SFN Community" />

      <section class="h-100 gradient-form" style={{ backgroundColor: "#eee" }}>
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-xl-10">
              <div class="card rounded-3 text-black">
                <div class="row g-0">
                  <div class="col-lg-6">
                    <div class="card-body p-md-5 mx-md-4">
                      <div class="text-center">
                        <img
                          src="https://scarboroughfoodnetwork.ca/wp-content/uploads/2023/04/sfn-logo-green-filled-300x300-1.png"
                          style={{ width: "185px" }}
                          alt="logo"
                        />
                        <h4 class="mt-1 mb-5 pb-1">We are The Community</h4>
                      </div>

                      <form>
                        <p>Please login to your account</p>

                        <div class="form-outline mb-4">
                          <input
                            type="email"
                            class="form-control"
                            placeholder="Email address"
                          />
                        </div>

                        <div class="form-outline mb-4">
                          <input
                            type="password"
                            class="form-control"
                            placeholder="Password"
                          />
                        </div>

                        <div class="text-center pt-1 mb-5 pb-1">
                          <button
                            class="btn btn-success btn-block fa-lg gradient-custom-2 mb-3"
                            type="button"
                          >
                            Log in
                          </button>
                        </div>

                        <div class="d-flex align-items-center justify-content-center pb-4">
                          <p class="mb-0 me-2">Our future client?</p>
                          <button type="button" class="btn btn-outline-danger">
                            Create new
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 class="mb-4">We are more than just a Network</h4>
                      <p class="small mb-0">
                        <strong>Scarborough Food Network (SFN)</strong> is
                        dedicated to bridging Food Banks with communities,
                        fostering a cohesive network to combat hunger and ensure
                        everyone has access to nutritious meals. 🌎
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Login;
