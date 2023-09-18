import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../Utility/AuthProvider";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

function CustomerTransaction() {
  const componentPDF = useRef();

  const [startdate, setstartdate] = useState(null);
  const [enddate, setenddate] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const auth = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/transaction/customer/transaction/show-all-my-transactions",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.jwt}`,
          },
        }
      );
      console.log(response.data);
      setTransactions(response.data);
      setFilteredTransactions(response.data);
    } catch (error) {
      console.error(error);
      console.log("error has occured");
    }
  };

  const fetchDataBetweenDates = () => {
    const filteredResults = transactions.filter((row) => {
      return row.datetime >= startdate && row.datetime <= enddate;
    });
    setFilteredTransactions(filteredResults);
  };

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Transaction History",
  });

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
            <Link className="nav-link" to="/customer-show-all-my-transaction">
              <i class="bi bi-arrows-angle-expand"></i>{" "}
              <span>My Transactions</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/customer-deposit">
              <i class="bi bi-box-arrow-in-down-left"></i> <span>Deposit</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/customer-withdraw">
              <i class="bi bi-box-arrow-up-right"></i> <span>Withdraw</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/customer-bank-transfer">
              <i class="bi bi-arrows-expand"></i> <span>Bank Transfer</span>
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
            <div style={{ padding: "13px" }}>
              <p className="display-6 pb-1">My Transactions</p>
              <hr />

              <div className="row p-4">
                <div className="col-md-3">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={fetchData}
                    style={{ width: "190px" }}
                  >
                    All
                  </button>
                </div>
                <div className="col-md-3 ">
                  <div className="d-flex justify-content-center">
                    <h6 style={{ padding: "8px" }}>Start Date</h6>
                    <input
                      type="date"
                      id="startdate"
                      name="startdate"
                      className="form-control"
                      onChange={(e) => setstartdate(e.target.value)}
                      style={{ width: "190px" }}
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="d-flex justify-content-center">
                    <h6 style={{ padding: "8px" }}>End Date</h6>
                    <input
                      type="date"
                      id="enddate"
                      name="enddate"
                      className="form-control"
                      onChange={(e) => setenddate(e.target.value)}
                      style={{ width: "190px" }}
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={fetchDataBetweenDates}
                    style={{ width: "190px" }}
                  >
                    Search
                  </button>
                </div>
              </div>

              <div
                style={{
                  maxHeight: "500px",
                  overflowY: "auto",
                }}
              >
                <div ref={componentPDF} style={{ width: "100%" }}>
                  <table className="table table-bordered shadow p-3 mb-5 rounded">
                    <thead
                      className="table-secondary"
                      style={{
                        position: "sticky",
                        zIndex: "1",
                        top: "0",
                      }}
                    >
                      <tr>
                        <th scope="col">Transaction ID</th>
                        <th scope="col">Date Time</th>
                        <th scope="col">Description</th>
                        <th scope="col">Transaction Type</th>
                        <th scope="col">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {filteredTransactions.map((transaction, index) => (
                        <tr>
                          <td>{transaction.transactionid}</td>
                          <td>{transaction.datetime}</td>
                          <td>{transaction.description}</td>
                          <td>{transaction.transactiontype}</td>
                          <td
                            style={{
                              color:
                                transaction.transactiontype === "CREDIT"
                                  ? "green"
                                  : "red",
                            }}
                          >
                            <i class="bi bi-currency-rupee"></i>
                            {transaction.amount}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="row p-4">
                <div className="col-md-3"></div>
                <div className="col-md-3"></div>
                <div className="col-md-3"></div>
                <div className="col-md-3">
                  <button
                    className="btn btn-success"
                    onClick={generatePDF}
                    style={{ width: "190px" }}
                  >
                    <i class="bi bi-download mx-1"></i>
                    {"  "} Generate PDF
                  </button>
                </div>
              </div>
            </div>
            {/* -------------Code Ends------------ */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerTransaction;
