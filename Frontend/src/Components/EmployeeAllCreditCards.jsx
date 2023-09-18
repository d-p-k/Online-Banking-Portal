import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Utility/AuthProvider";
import axios from "axios";
import "./AllCss.css";
import { ToastContainer, toast } from "react-toastify";

function EmployeeAllCreditCards() {
  const [loading, setLoading] = useState(false);

  const [ccreditcardid, setCCreditCardId] = useState(null);
  const [acreditcardid, setACreditCardId] = useState(null);

  const [creditcards, setCreditcards] = useState([]);
  const auth = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    auth.logout();
    nav("/employee-login");
    console.log("logout clicked");
  };

  useEffect(() => {
    fetchAllCreditcards();
  }, []);

  const fetchAllCreditcards = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/credit-card/employee/creditcard/all-credit-cards",
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

  const fetchPendingCreditcards = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/credit-card/employee/creditcard/pending-credit-cards",
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

  const fetchActiveCreditcards = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/credit-card/employee/creditcard/active-credit-cards",
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

  const fetchClosedCreditcards = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/credit-card/employee/creditcard/closed-credit-cards",
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

  const fetchClosingCreditcardRequests = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/credit-card/employee/creditcard/credit-card-closing-requests",
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

  const activateCreditcard = (creditcardid) => {
    setACreditCardId(creditcardid);
    setLoading(true);
    const values = { creditcardid: creditcardid };
    const payload = JSON.stringify(values);
    console.log(payload);
    axios
      .put(
        "http://localhost:9090/credit-card/employee/creditcard/activate-credit-card",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.jwt}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        fetchPendingCreditcards();
        toast.success(res.data);
        setACreditCardId(null);
        setLoading(false);
      })
      .catch((res) => console.log(res));
  };

  const closeCreditcard = (creditcardid) => {
    setCCreditCardId(creditcardid);
    setLoading(true);
    const values = { creditcardid: creditcardid };
    const payload = JSON.stringify(values);
    console.log(payload);
    axios
      .put(
        "http://localhost:9090/credit-card/employee/creditcard/foreclose-credit-card",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.jwt}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        fetchClosingCreditcardRequests();
        toast.success(res.data);
        setCCreditCardId(null);
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
              <p className="display-6 pb-1">All Customers Credit Cards</p>

              <div className="row justify-content-center">
                <div className="col-md-2">
                  <button
                    type="button"
                    className="btn btn-secondary m-3"
                    onClick={fetchAllCreditcards}
                    style={{ width: "150px" }}
                  >
                    All
                  </button>
                </div>
                <div className="col-md-2">
                  <button
                    type="button"
                    className="btn btn-secondary m-3"
                    onClick={fetchClosingCreditcardRequests}
                    style={{ width: "150px" }}
                  >
                    Closing Requests
                  </button>
                </div>
                <div className="col-md-2">
                  <button
                    type="button"
                    className="btn btn-secondary m-3"
                    onClick={fetchPendingCreditcards}
                    style={{ width: "150px" }}
                  >
                    Pending
                  </button>
                </div>
                <div className="col-md-2">
                  <button
                    type="button"
                    className="btn btn-secondary m-3"
                    onClick={fetchActiveCreditcards}
                    style={{ width: "150px" }}
                  >
                    Active
                  </button>
                </div>
                <div className="col-md-2">
                  <button
                    type="button"
                    className="btn btn-secondary m-3"
                    onClick={fetchClosedCreditcards}
                    style={{ width: "150px" }}
                  >
                    Closed
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
                      <th scope="col">Card ID</th>
                      <th scope="col">Card Name</th>
                      <th scope="col">Card Number</th>
                      <th scope="col">CVV</th>
                      <th scope="col">Card Limit</th>
                      <th scope="col">Expiry Date</th>
                      <th scope="col">Status</th>
                      <th scope="col">Activate</th>
                      <th scope="col">Close</th>
                    </tr>
                  </thead>
                  <tbody>
                    {creditcards.map((creditcard, index) => (
                      <tr>
                        <td>{creditcard.account.accid}</td>
                        <td>{creditcard.creditcardid}</td>
                        <td>{creditcard.creditcardname}</td>
                        <td>{creditcard.creditcardnumber}</td>
                        <td>{creditcard.creditcardcvv}</td>
                        <td>
                          <i class="bi bi-currency-rupee"></i>
                          {creditcard.creditcardlimit}
                        </td>
                        <td>{creditcard.expirydate}</td>
                        <td>{creditcard.status}</td>

                        <td>
                          <button
                            type="submit"
                            class="btn btn-success"
                            style={{ width: "130px" }}
                            onClick={() =>
                              activateCreditcard(creditcard.creditcardid)
                            }
                            disabled={creditcard.status !== "PENDING"}
                          >
                            {loading &&
                              acreditcardid === creditcard.creditcardid && (
                                <i className="fa fa-spin">
                                  <i className="bi bi-arrow-clockwise fs-6" />
                                </i>
                              )}{" "}
                            {loading &&
                            acreditcardid === creditcard.creditcardid
                              ? "Activating..."
                              : "Activate"}
                          </button>
                        </td>
                        <td>
                          <button
                            type="submit"
                            class="btn btn-danger"
                            style={{ width: "130px" }}
                            onClick={() =>
                              setCCreditCardId(creditcard.creditcardid)
                            }
                            disabled={
                              creditcard.status !== "REQUESTED FOR CLOSING"
                            }
                            data-toggle="modal"
                            data-target="#closeCreditCardModal"
                          >
                            {loading &&
                              ccreditcardid === creditcard.creditcardid && (
                                <i className="fa fa-spin">
                                  <i className="bi bi-arrow-clockwise fs-6" />
                                </i>
                              )}{" "}
                            {loading &&
                            ccreditcardid === creditcard.creditcardid
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
        id="closeCreditCardModal"
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
              Select "Yes" below if you want to close this credit card.
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
                onClick={() => closeCreditcard(ccreditcardid)}
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

export default EmployeeAllCreditCards;
