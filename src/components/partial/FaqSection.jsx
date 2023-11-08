import "../../App.css";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function FaqSection() {
  return (
    <div class="accordion w-100" id="basicAccordion">
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
          <button
            class="accordion-button collapsed"
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
          class="accordion-collapse collapse"
          aria-labelledby="headingOne"
          data-mdb-parent="#basicAccordion"
          style={{}}
        >
          <div class="accordion-body">
            <strong>This forum is a community for software engineers</strong> to
            engage in conversations covering a broad array of subjects such as
            academia, course evaluations, job searches, programming, algorithmic
            concepts, industry best practices, and career guidance.
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo">
          <button
            class="accordion-button collapsed"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#basicAccordionCollapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            Question 2: How do SFN do?
          </button>
        </h2>
        <div
          id="basicAccordionCollapseTwo"
          class="accordion-collapse collapse"
          aria-labelledby="headingTwo"
          data-mdb-parent="#basicAccordion"
          style={{}}
        >
          <div class="accordion-body">
            <strong>
              You can join by signing up with your email or through other
              platforms like Google.
            </strong>{" "}
          </div>
        </div>
      </div>

      <div class="accordion-item">
        <h2 class="accordion-header" id="headingThree">
          <button
            class="accordion-button collapsed"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#basicAccordionCollapseThree"
            aria-expanded="false"
            aria-controls="collapseThree"
          >
            Question 3: Is it free to join?
          </button>
        </h2>
        <div
          id="basicAccordionCollapseThree"
          class="accordion-collapse collapse"
          aria-labelledby="headingThree"
          data-mdb-parent="#basicAccordion"
          style={{}}
        >
          <div class="accordion-body">
            <strong>Absolutely!</strong> it is free to join.
          </div>
        </div>
      </div>
    </div>
  );
}

export default FaqSection;
