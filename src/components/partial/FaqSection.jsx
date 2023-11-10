import "../../App.css";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function FaqSection() {
  return (
    <div className="accordion w-100" id="basicAccordion">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button
            className="accordion-button collapsed"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#basicAccordionCollapseOne"
            aria-expanded="false"
            aria-controls="collapseOne"
          >
            Question 1: What is SFN?
          </button>
        </h2>
        <div
          id="basicAccordionCollapseOne"
          className="accordion-collapse collapse"
          aria-labelledby="headingOne"
          data-mdb-parent="#basicAccordion"
          style={{}}
        >
          <div className="accordion-body">
            <strong>
              Scarborough Food Network is an organization involved in addressing
              food insecurity in Scarborough, Toronto. We connect FoodBanks to
              those in need.
            </strong>
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingTwo">
          <button
            className="accordion-button collapsed"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#basicAccordionCollapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            Question 2: What is our mission?
          </button>
        </h2>
        <div
          id="basicAccordionCollapseTwo"
          className="accordion-collapse collapse"
          aria-labelledby="headingTwo"
          data-mdb-parent="#basicAccordion"
          style={{}}
        >
          <div className="accordion-body">
            <strong>
              Our mission and objectives centre around addressing issues related
              to food security, hunger, and community well-being. We are
              committed to making a positive impact on the issue of hunger
            </strong>{" "}
          </div>
        </div>
      </div>

      <div className="accordion-item">
        <h2 className="accordion-header" id="headingThree">
          <button
            className="accordion-button collapsed"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#basicAccordionCollapseThree"
            aria-expanded="false"
            aria-controls="collapseThree"
          >
            Question 3: Should users need a link2feed registration?
          </button>
        </h2>
        <div
          id="basicAccordionCollapseThree"
          className="accordion-collapse collapse"
          aria-labelledby="headingThree"
          data-mdb-parent="#basicAccordion"
          style={{}}
        >
          <div className="accordion-body">
            <strong>Certainly!</strong>, you can complete your registration by
            following this link:{" "}
            <a
              href="https://www.link2feed.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>{" "}
            It's a simple and convenient process!"
          </div>
        </div>
      </div>
    </div>
  );
}

export default FaqSection;
