import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Utility/AuthProvider";
import axios from "axios";
import "./AllCss.css";
import { ToastContainer, toast } from "react-toastify";

function EmployeeAllAccounts() {
  const [loading, setLoading] = useState(false);

  const [accounts, setAccounts] = useState([]);
  const [accid, setAccid] = useState(null);

  const auth = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    auth.logout();
    nav("/employee-login");
    console.log("logout clicked");
  };

  useEffect(() => {
    fetchAllAccounts();
  }, []);

  const fetchAllAccounts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/login/employee/all-accounts",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.jwt}`,
          },
        }
      );
      console.log(response.data);
      setAccounts(response.data);
    } catch (error) {
      console.error(error);
      console.log("error has occured");
    }
  };

  const fetchPendingAccounts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/login/employee/pending-accounts",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.jwt}`,
          },
        }
      );
      console.log(response.data);
      setAccounts(response.data);
    } catch (error) {
      console.error(error);
      console.log("error has occured");
    }
  };

  const fetchActiveAccounts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/login/employee/active-accounts",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.jwt}`,
          },
        }
      );
      console.log(response.data);
      setAccounts(response.data);
    } catch (error) {
      console.error(error);
      console.log("error has occured");
    }
  };

  const activateAccount = (accid) => {
    setAccid(accid);
    setLoading(true);
    const values = { accid: accid };
    const payload = JSON.stringify(values);
    console.log(payload);
    axios
      .put("http://localhost:9090/login/employee/activate-account", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.jwt}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        fetchPendingAccounts();
        if (res.data.includes("successfully")) toast.success(res.data);
        else toast.error(res.data);
        setLoading(false);
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
              <p className="display-6 pb-1">Customer Accounts</p>

              <div className="row">
                <div className="col-md-4">
                  <button
                    type="button"
                    className="btn btn-secondary m-3"
                    onClick={fetchAllAccounts}
                    style={{ width: "90px" }}
                  >
                    All
                  </button>
                </div>
                <div className="col-md-4">
                  <button
                    type="button"
                    className="btn btn-secondary m-3"
                    onClick={fetchPendingAccounts}
                    style={{ width: "90px" }}
                  >
                    Pending
                  </button>
                </div>
                <div className="col-md-4">
                  <button
                    type="button"
                    className="btn btn-secondary m-3"
                    onClick={fetchActiveAccounts}
                    style={{ width: "90px" }}
                  >
                    Active
                  </button>
                </div>
              </div>

              <div
                style={{
                  maxHeight: "500px",
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
                      <th scope="col">User ID</th>
                      <th scope="col">Account Number</th>
                      <th scope="col">Account Type</th>
                      <th scope="col">IFSC Code</th>
                      <th scope="col">Balance</th>
                      <th scope="col">Status</th>
                      <th scope="col">Activate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accounts.map((account, index) => (
                      <tr>
                        <td>{account.accid}</td>
                        <td>{account.userid}</td>
                        <td>{account.accno}</td>
                        <td>{account.acctype}</td>
                        <td>{account.ifsccode}</td>
                        <td>{account.balance}</td>
                        <td>{account.status}</td>
                        <td>
                          <button
                            type="submit"
                            class="btn btn-success"
                            style={{ width: "150px" }}
                            onClick={() => activateAccount(account.accid)}
                            disabled={account.status === "ACTIVE"}
                          >
                            {loading && accid === account.accid && (
                              <i className="fa fa-spin">
                                <i className="bi bi-arrow-clockwise fs-6" />
                              </i>
                            )}{" "}
                            {loading && accid === account.accid
                              ? "Activating..."
                              : "Activate"}
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
      <ToastContainer />
    </div>
  );
}

export default EmployeeAllAccounts;
