import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Utility/AuthProvider";
import axios from "axios";
import amazongiftcard from "../Components/img/Amazon Gift Card.jpg";
import flipkartgiftcard from "../Components/img/Flipkart Gift Card.jpg";
import netflixgiftcard from "../Components/img/Netflix Gift Card.jpg";
import starbucksgiftcard from "../Components/img/Starbucks Gift Card.jpg";
import ubergiftcard from "../Components/img/Uber Gift Card.jpg";
import googleplaygiftcard from "../Components/img/Google Play Gift Card.jpg";

function CustomerMyGiftCardsPurchased() {
  const [giftcards, setGiftcards] = useState([]);

  const auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9090/gift-card/customer/giftcard/my-giftcards-purchased",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.jwt}`,
            },
          }
        );
        console.log(response.data);
        setGiftcards(response.data);
      } catch (error) {
        console.error(error);
        console.log("error has occured");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div id="wrapper">
        <ul
          className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
          id="accordionSidebar"
        >
          <Link
            className="sidebar-brand d-flex align-items-center justify-content-center"
            to="/customer-dashboard"
          >
            <div className="sidebar-brand-text mx-3">Customer</div>
          </Link>

          <hr className="sidebar-divider my-0 bg-white" />

          <li className="nav-item active">
            <Link className="nav-link" to="/customer-dashboard">
              <i className="fas fa-fw fa-tachometer-alt"></i>{" "}
              <span>Dashboard</span>
            </Link>
          </li>

          <hr className="sidebar-divider p-0 bg-white" />

          <div className="sidebar-heading">Services</div>

          <li className="nav-item">
            <Link className="nav-link" to="/customer-my-gift-cards">
              <i class="bi bi-box2-heart"></i> <span>My Gift Cards</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/customer-buy-gift-card">
              <i class="bi bi-box2-heart-fill"></i> <span>Buy Gift Card</span>
            </Link>
          </li>
        </ul>
        <div id="content-wrapper" class="d-flex flex-column ">
          <div id="content">
            <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow justify-content-center">
              <h5>
                <strong>Apex Banking Portal</strong>
              </h5>
            </nav>
            {/* -------------Code Starts------------ */}

            <div className="row mb-3">
              <div className="col-xl-10 col-lg-12 col-md-9">
                <div
                  className="card o-hidden border-0 shadow-lg mx-3"
                  style={{ width: "118%" }}
                >
                  <div className="card-body p-0">
                    <div className="col">
                      <div className="py-5">
                        <div className="text-center">
                          <h1 className="h4 text-gray-900 mb-4">
                            My Gift Cards
                          </h1>
                        </div>
                        <hr />

                        <div
                          style={{
                            maxHeight: "500px",
                            overflowY: "auto",
                          }}
                        >
                          <div className="container-fluid mb-5">
                            <div className="row">
                              <div className="col-10 mx-auto">
                                <div className="row gy-4">
                                  {giftcards.map((giftcard, index) => (
                                    <div
                                      className="col-md-4 col-10 mx-auto"
                                      key={index}
                                    >
                                      <div className="card">
                                        {giftcard.giftcardname ===
                                        "Amazon Gift Card" ? (
                                          <img
                                            src={amazongiftcard}
                                            className="card-img-top"
                                            alt="Gift Card"
                                          />
                                        ) : giftcard.giftcardname ===
                                          "Google Play Gift Card" ? (
                                          <img
                                            src={googleplaygiftcard}
                                            className="card-img-top"
                                            alt="Gift Card"
                                          />
                                        ) : giftcard.giftcardname ===
                                          "Flipkard Gift Card" ? (
                                          <img
                                            src={flipkartgiftcard}
                                            className="card-img-top"
                                            alt="Gift Card"
                                          />
                                        ) : giftcard.giftcardname ===
                                          "Uber Gift Card" ? (
                                          <img
                                            src={ubergiftcard}
                                            className="card-img-top"
                                            alt="Gift Card"
                                          />
                                        ) : giftcard.giftcardname ===
                                          "Netflix Gift Card" ? (
                                          <img
                                            src={netflixgiftcard}
                                            className="card-img-top"
                                            alt="Gift Card"
                                          />
                                        ) : (
                                          <img
                                            src={starbucksgiftcard}
                                            className="card-img-top"
                                            alt="Gift Card"
                                          />
                                        )}
                                        <div className="card-body">
                                          <h5 className="card-title font-weight-bold">
                                            {giftcard.giftcardname}
                                          </h5>
                                          <button
                                            className="btn btn-primary"
                                            data-toggle="modal"
                                            data-target={`#modal-${index}`}
                                          >
                                            Show Details
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* -------------Code Ends------------ */}
          </div>
        </div>
      </div>
      {giftcards.map((giftcard, index) => (
        <div
          className="modal fade"
          id={`modal-${index}`}
          tabIndex="-1"
          role="dialog"
          aria-labelledby={`modalLabel-${index}`}
          aria-hidden="true"
          key={index}
        >
          <div
            className="modal-dialog"
            style={{ maxWidth: "30%" }}
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={`modalLabel-${index}`}>
                  {giftcard.giftcardname}
                </h5>
                <button
                  className="close"
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body text-left">
                <p>Recipient Name: {giftcard.recipientname}</p>
                <p>Recipient Email: {giftcard.recipientemail}</p>
                <p>
                  Gift Card Amount: <i class="bi bi-currency-rupee"></i>
                  {giftcard.giftcardamount}
                </p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" data-dismiss="modal">
                  Okay
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CustomerMyGiftCardsPurchased;
