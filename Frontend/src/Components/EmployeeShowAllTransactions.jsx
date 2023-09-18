import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Utility/AuthProvider";
import axios from "axios";
import "./AllCss.css";

function EmployeeShowAllTransactions() {
  const [startdate, setstartdate] = useState(null);
  const [enddate, setenddate] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const auth = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    auth.logout();
    nav("/employee-login");
    console.log("logout clicked");
  };

  useEffect(() => {
    fetchAllTransactions();
  }, []);

  const fetchAllTransactions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/transaction/employee/transaction/show-all-transactions",
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

  return (
    <div>
      <div id="wrapper">
        <ul
          className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
          id="accordionSidebar"
        >
          <Link
            className="sidebar-brand d-flex align-items-center justify-content-center"
            to="/employee-dashboard"
          >
            <div className="sidebar-brand-text mx-3">Employee</div>
          </Link>

          <hr className="sidebar-divider my-0 bg-white" />

          <li className="nav-item active">
            <Link className="nav-link" to="/employee-dashboard">
              <i className="fas fa-fw fa-tachometer-alt"></i>{" "}
              <span>Dashboard</span>
            </Link>
          </li>

          <hr className="sidebar-divider p-0 bg-white" />

          <div className="sidebar-heading">Interfaces</div>

          <li className="nav-item">
            <Link className="nav-link" to="/employee-all-accounts">
              <i className="fas fa-fw fa-chart-area"></i> <span>Accounts</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/employee-all-customers">
              <i className="fas fa-fw fa-chart-area"></i> <span>Customers</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/employee-show-all-transactions">
              <i className="fas fa-fw fa-lock"></i> <span>Transactions</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/employee-all-loans">
              <i className="fas fa-fw fa-chart-area"></i> <span>Loans</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/employee-all-lockers">
              <i className="fas fa-fw fa-table"></i> <span>Lockers</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/employee-all-credit-cards">
              <i className="fas fa-fw fa-table"></i> <span>Credit Cards</span>
            </Link>
          </li>

          <hr className="sidebar-divider p-0 bg-white" />

          <div className="sidebar-heading">Navigation</div>

          <li className="nav-item">
            <Link
              className="nav-link"
              data-toggle="modal"
              data-target="#logoutModal"
            >
              <i className="fas fa-fw fa-sign-out-alt"></i> <span>Logout</span>
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
            <div style={{ padding: "15px" }}>
              <p className="display-6 pb-1">All Customers Transactions</p>
              <hr />
              <div className="row p-4">
                <div className="col-md-3">
                  <button
                    type="submit"
                    className="btn btn-secondary"
                    onClick={fetchAllTransactions}
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
                    className="btn btn-secondary"
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
                <table className="table table-bordered shadow p-3 mb-5 bg-body-tertiary rounded">
                  <thead
                    className="table-secondary"
                    style={{
                      position: "sticky",
                      zIndex: "1",
                      top: 0,
                    }}
                  >
                    <tr>
                      <th scope="col">Account ID</th>
                      <th scope="col">Transaction ID</th>
                      <th scope="col">Date Time</th>
                      <th scope="col">Description</th>
                      <th scope="col">Transaction Type</th>
                      <th scope="col">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((transaction, index) => (
                      <tr>
                        <td>{transaction.account.accid}</td>
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
            {/* -------------Code Ends------------ */}
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="logoutModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Ready to Leave?
              </h5>
              <button
                class="close"
                type="button"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div class="modal-body text-left">
              Select "Logout" below if you are ready to end your current
              session.
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-secondary"
                type="button"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <Link
                class="btn btn-primary"
                data-dismiss="modal"
                onClick={handleLogout}
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeShowAllTransactions;
