import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../Utility/AuthProvider";
import axios from "axios";
import blankcreditcard from "../Components/img/Credit Card.jpg";
import "../Components/CreditCard.css";

function CustomerMyCreditCards() {
  const [creditcards, setCreditcards] = useState([]);
  const auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9090/credit-card/customer/creditcard/my-credit-cards",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.jwt}`,
            },
          }
        );
        console.log(response.data);
        setCreditcards(response.data);
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
            <Link className="nav-link" to="/customer-my-credit-cards">
              <i class="bi bi-credit-card-2-front"></i>{" "}
              <span>My Credit Cards</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/customer-apply-for-credit-card">
              <i class="bi bi-credit-card-2-back"></i>{" "}
              <span>Apply For Credit Card</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/customer-close-credit-card">
              <i class="bi bi-credit-card-2-back-fill"></i>{" "}
              <span>Close Credit Card</span>
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
                            My Credit Cards
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
                                  {creditcards.map((creditcard, index) => (
                                    <div
                                      className="col-md-4 col-10 mx-auto"
                                      key={index}
                                    >
                                      <div className="card">
                                        <div className="card-image-wrapper">
                                          <img
                                            src={blankcreditcard}
                                            className="card-img-top"
                                            alt="Credit Card"
                                          />

                                          <div className="card-overlay">
                                            <h5 className="card-title font-weight-bold">
                                              {creditcard.creditcardname ===
                                              "Pride Platinum Credit Card"
                                                ? `${
                                                    creditcard.creditcardname.split(
                                                      " "
                                                    )[0]
                                                  } ${
                                                    creditcard.creditcardname.split(
                                                      " "
                                                    )[1]
                                                  }`
                                                : creditcard.creditcardname.split(
                                                    " "
                                                  )[0]}
                                            </h5>
                                            <h6>
                                              {creditcard.creditcardnumber
                                                .toString()
                                                .replace(/(.{4})/g, "$1 ")}
                                            </h6>
                                          </div>
                                        </div>

                                        <div className="card-body">
                                          <h5 className="card-title font-weight-bold">
                                            {creditcard.creditcardname}
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
      {creditcards.map((creditcard, index) => (
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
                  {creditcard.creditcardname}
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
                <p>
                  Card Number:{" "}
                  {creditcard.creditcardnumber
                    .toString()
                    .replace(/(.{4})/g, "$1 ")}
                </p>
                <p>Expiry Date: {creditcard.expirydate}</p>{" "}
                <p>
                  Card Limit: <i class="bi bi-currency-rupee"></i>
                  {creditcard.creditcardlimit}
                </p>
                <p>CVV: {creditcard.creditcardcvv}</p>
                <p>Card Status: {creditcard.status}</p>
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

export default CustomerMyCreditCards;
