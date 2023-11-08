import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Header from "./partial/Header";
import Footer from "./partial/Footer";

const Donate = () => {
  const [donationType, setDonationType] = useState("money");
  const [selectedFoodBank, setSelectedFoodBank] = useState("");
  const [selectedAmount, setSelectedAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");

  const handleDonation = (e) => {
    e.preventDefault();
    if (donationType === "money") {
      console.log(`Donating $${selectedAmount} to ${selectedFoodBank}`);
    } else {
      console.log(`Donating food to ${selectedFoodBank}`);
    }
  };

  const foodBanks = [
    "Sai Dham Food Bank",
    "Feed Scarborough",
    "Daily Bread Food Bank",
    "Cornerstone Food Bank",
  ];

  const predefinedAmounts = [10, 50, 100, 150, 200];

  return (
    <div className="Donate">
      <Header title="Donate | SFN Community" />

      <section className="h-100 gradient-form parent-demo-post">
        <Container className="py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="card-body p-md-5 mx-md-4">
                  <div className="text-center">
                    <h2 className="mb-2 pb-1">
                      <strong>
                        Your generous contribution will have a meaningful
                        impact.
                      </strong>
                    </h2>
                    <p className="mb-4 pb-1">
                      Your donation to Feed Scarborough, a registered charity,
                      will contribute significantly to the distribution of aid
                      across various areas.
                    </p>
                  </div>

                  <Form onSubmit={handleDonation}>
                    <Form.Group className="mb-4">
                      <Form.Select
                        onChange={(e) => setDonationType(e.target.value)}
                        aria-label="Select donation type"
                      >
                        <option value="money">Donate Money</option>
                        <option value="food">Donate Food</option>
                      </Form.Select>
                    </Form.Group>

                    {donationType === "money" ? (
                      <>
                        <Form.Group className="mb-3" controlId="donationAmount">
                          <Form.Label>
                            Choose or Enter Donation Amount
                          </Form.Label>
                          <div className="d-flex align-items-center">
                            <Form.Select
                              value={selectedAmount}
                              onChange={(e) => {
                                setSelectedAmount(e.target.value);
                                setCustomAmount("");
                              }}
                            >
                              <option value="">Select an amount</option>
                              {predefinedAmounts.map((amount) => (
                                <option key={amount} value={amount}>
                                  ${amount}
                                </option>
                              ))}
                            </Form.Select>
                            <div style={{ margin: "10px" }}>
                              <span className="ml-2"> OR </span>
                            </div>
                            <Form.Control
                              type="number"
                              placeholder="CAD$ 500"
                              value={customAmount}
                              onChange={(e) => {
                                setCustomAmount(e.target.value);
                                setSelectedAmount("");
                              }}
                              className="ml-2"
                            />
                          </div>
                        </Form.Group>
                      </>
                    ) : (
                      <>
                        <Form.Group className="mb-3" controlId="foodItem">
                          <Form.Label>Food Item</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter food item"
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="foodBank">
                          <Form.Label>Food Bank</Form.Label>
                          <Form.Select
                            value={selectedFoodBank}
                            onChange={(e) =>
                              setSelectedFoodBank(e.target.value)
                            }
                          >
                            <option value="">Select a food bank</option>
                            {foodBanks.map((bank, index) => (
                              <option key={index} value={bank}>
                                {bank}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </>
                    )}

                    <Button variant="primary" type="submit" className="btn-lg">
                      Donate
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
};

export default Donate;
