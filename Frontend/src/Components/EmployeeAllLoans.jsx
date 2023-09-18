import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Utility/AuthProvider";
import axios from "axios";
import "./AllCss.css";
import { ToastContainer, toast } from "react-toastify";

function EmployeeAllLoans() {
  const [loading, setLoading] = useState(false);

  const [aloanid, setALoanId] = useState(null);
  const [cloanid, setCLoanId] = useState(null);

  const [loans, setLoans] = useState([]);
  const auth = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    auth.logout();
    nav("/employee-login");
    console.log("logout clicked");
  };

  useEffect(() => {
    fetchAllLoans();
  }, []);

  const fetchAllLoans = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/loan/employee/loan/all-loans",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.jwt}`,
          },
        }
      );
      console.log(response.data);
      setLoans(response.data);
    } catch (error) {
      console.error(error);
      console.log("error has occured");
    }
  };

  const fetchPendingLoans = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/loan/employee/loan/pending-loans",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.jwt}`,
          },
        }
      );
      console.log(response.data);
      setLoans(response.data);
    } catch (error) {
      console.error(error);
      console.log("error has occured");
    }
  };

  const fetchActiveLoans = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/loan/employee/loan/active-loans",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.jwt}`,
          },
        }
      );
      console.log(response.data);
      setLoans(response.data);
    } catch (error) {
      console.error(error);
      console.log("error has occured");
    }
  };

  const fetchCompletedLoans = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/loan/employee/loan/completed-loans",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.jwt}`,
          },
        }
      );
      console.log(response.data);
      setLoans(response.data);
    } catch (error) {
      console.error(error);
      console.log("error has occured");
    }
  };

  const activateLoan = (loanid) => {
    setLoading(true);
    setALoanId(loanid);
    const values = { loanid: loanid };
    const payload = JSON.stringify(values);
    console.log(payload);
    axios
      .put("http://localhost:9090/loan/employee/loan/activate-loan", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.jwt}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        fetchPendingLoans();
        toast.success(res.data);
        setLoading(false);
        setALoanId(null);
      })
      .catch((res) => console.log(res));
  };

  const closeLoan = (loanid) => {
    setLoading(true);
    setCLoanId(loanid);
    const values = { loanid: loanid };
    const payload = JSON.stringify(values);
    console.log(payload);
    axios
      .put("http://localhost:9090/loan/employee/loan/close-loan", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.jwt}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        fetchActiveLoans();
        toast.success(res.data);
        setLoading(false);
        setCLoanId(null);
      })
      .catch((res) => console.log(res));
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
            <div style={{ padding: "13px" }}>
              <p className="display-6 pb-1">All Customers Loans</p>

              <div className="row">
                <div className="col-md-3">
                  <button
                    type="button"
                    className="btn btn-secondary m-3"
                    onClick={fetchAllLoans}
                    style={{ width: "100px" }}
                  >
                    All
                  </button>
                </div>
                <div className="col-md-3">
                  <button
                    type="button"
                    className="btn btn-secondary m-3"
                    onClick={fetchPendingLoans}
                    style={{ width: "100px" }}
                  >
                    Pending
                  </button>
                </div>
                <div className="col-md-3">
                  <button
                    type="button"
                    className="btn btn-secondary m-3"
                    onClick={fetchActiveLoans}
                    style={{ width: "100px" }}
                  >
                    Active
                  </button>
                </div>
                <div className="col-md-3">
                  <button
                    type="button"
                    className="btn btn-secondary m-3"
                    onClick={fetchCompletedLoans}
                    style={{ width: "105px" }}
                  >
                    Completed
                  </button>
                </div>
              </div>

              <div
                style={{
                  maxHeight: "600px",
                  overflowY: "auto",
                }}
              >
                <table className="table table-bordered shadow p-3 bg-body-tertiary rounded">
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
                      <th scope="col">Loan ID</th>
                      <th scope="col">Loan Type</th>
                      <th scope="col">Loan Amount</th>
                      <th scope="col">EMI/Month</th>
                      <th scope="col">Start Date</th>
                      <th scope="col">End Date</th>
                      <th scope="col">Duration</th>
                      <th scope="col">Status</th>
                      <th scope="col">Activate</th>
                      <th scope="col">Close</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loans.map((loan, index) => (
                      <tr>
                        <td>{loan.account.accid}</td>
                        <td>{loan.loanid}</td>
                        <td>{loan.loantype}</td>
                        <td>
                          <i class="bi bi-currency-rupee"></i>
                          {loan.loanamount}
                        </td>
                        <td>
                          <i class="bi bi-currency-rupee"></i>
                          {loan.monthlyemi}
                        </td>
                        <td>{loan.statedate}</td>
                        <td>{loan.enddate}</td>
                        <td>{loan.duration} Months</td>
                        <td>{loan.status}</td>
                        <td>
                          <button
                            type="submit"
                            class="btn btn-success"
                            style={{ width: "130px" }}
                            onClick={() => activateLoan(loan.loanid)}
                            disabled={loan.status !== "PENDING"}
                          >
                            {loading && aloanid === loan.loanid && (
                              <i className="fa fa-spin">
                                <i className="bi bi-arrow-clockwise fs-6" />
                              </i>
                            )}{" "}
                            {loading && aloanid === loan.loanid
                              ? "Activating..."
                              : "Activate"}
                          </button>
                        </td>
                        <td>
                          <button
                            type="submit"
                            class="btn btn-danger"
                            style={{ width: "130px" }}
                            onClick={() => setCLoanId(loan.loanid)}
                            disabled={loan.status !== "ACTIVE"}
                            data-toggle="modal"
                            data-target="#closeLoanModal"
                          >
                            {loading && cloanid === loan.loanid && (
                              <i className="fa fa-spin">
                                <i className="bi bi-arrow-clockwise fs-6" />
                              </i>
                            )}{" "}
                            {loading && cloanid === loan.loanid
                              ? "Closing..."
                              : "Close"}
                          </button>
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

      <div
        class="modal fade"
        id="closeLoanModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Are you sure?
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
              Select "Yes" below if you want to close this loan.
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-secondary"
                type="button"
                data-dismiss="modal"
              >
                No
              </button>
              <Link
                class="btn btn-primary"
                data-dismiss="modal"
                onClick={() => closeLoan(cloanid)}
              >
                Yes
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default EmployeeAllLoans;
