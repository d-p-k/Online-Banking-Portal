import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Utility/AuthProvider";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "./Dashboard.css";

function CustomerDashboard() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const showToast = queryParams.get("showToast");

  const [homeText, setHomeText] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [account, setAccount] = useState(null);

  const [formData, setFormData] = useState({
    userid: null,
    oldpassword: "",
    newpassword: "",
    newpasswordagain: "",
  });

  const auth = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    auth.logout();
    nav("/customer-login");
    console.log("logout clicked");
  };

  useEffect(() => {
    if (showToast === "true") {
      toast.success("Login Successful");
    }

    const fetchHomeText = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9090/login/customer/home",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.jwt}`,
            },
          }
        );
        console.log(response.data);
        setHomeText(response.data);
      } catch (error) {
        console.error(error);
        console.log("error has occured");
      }
    };

    const fetchCustomer = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9090/login/customer/profile",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.jwt}`,
            },
          }
        );
        console.log(response.data);
        setCustomer(response.data);
      } catch (error) {
        console.error(error);
        console.log("error has occured");
      }
    };

    const fetchAccount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9090/login/customer/account-details",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.jwt}`,
            },
          }
        );
        console.log(response.data);
        setAccount(response.data);
      } catch (error) {
        console.error(error);
        console.log("error has occured");
      }
    };

    fetchHomeText();
    fetchCustomer();
    fetchAccount();
  }, []);

  const changePassword = () => {
    const payload = JSON.stringify(formData);
    console.log(payload);
    axios
      .post("http://localhost:9090/login/customer/change-password", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.jwt}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.includes("successfully")) toast.success(res.data);
        else toast.error(res.data);
      })
      .catch((error) => console.log(error));
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

          <div className="sidebar-heading">Interfaces</div>

          <li className="nav-item">
            <Link className="nav-link" to="/customer-show-all-my-transaction">
              <i className="fas fa-fw fa-rupee-sign"></i>{" "}
              <span>Transaction</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/customer-my-loans">
              <i className="fas fa-fw fa-university"></i> <span>Loan</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/customer-my-lockers">
              <i className="fas fa-fw fa-lock"></i> <span>Locker</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/customer-my-credit-cards">
              <i className="fas fa-fw fa-credit-card"></i>{" "}
              <span>Credit Card</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/customer-my-gift-cards">
              <i className="fas fa-fw fa-gift"></i> <span>Gift Card</span>
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
              <div>
                <div class="h-100 p-5 bg-body-tertiary border rounded-3">
                  <h3>Dil Se Open</h3>
                  <p className="text-primary font-weight-bold">{homeText}</p>
                </div>
              </div>

              <div class="container emp-profile border bg-body-tertiary">
                <form method="post">
                  <div className="row">
                    <div className="col-md-6">
                      <ul
                        class="nav nav-tabs justify-content-center mb-5"
                        id="myTab"
                        role="tablist"
                      >
                        <li class="nav-item">
                          <a
                            class="nav-link active"
                            id="home-tab"
                            data-toggle="tab"
                            href="#home"
                            role="tab"
                            aria-controls="home"
                            aria-selected="true"
                          >
                            Profile
                          </a>
                        </li>
                        <li class="nav-item">
                          <a
                            class="nav-link"
                            id="profile-tab"
                            data-toggle="tab"
                            href="#profile"
                            role="tab"
                            aria-controls="profile"
                            aria-selected="false"
                          >
                            Account
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div class="col-md-6">
                      <Link
                        className="btn btn-primary"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            userid: customer.id,
                          })
                        }
                        data-toggle="modal"
                        data-target="#changePasswordModal"
                      >
                        Change Password
                      </Link>
                    </div>
                  </div>
                  <div class="row">
                    <div class="tab-content profile-tab" id="myTabContent">
                      <div
                        class="tab-pane fade show active"
                        id="home"
                        role="tabpanel"
                        aria-labelledby="home-tab"
                      >
                        <div class="row">
                          <div class="col-md-6">
                            <label>Name</label>
                          </div>
                          <div class="col-md-6">
                            <p>{customer && customer.username}</p>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                            <label>Password</label>
                          </div>
                          <div class="col-md-6">
                            <p>XXXXX</p>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                            <label>Email</label>
                          </div>
                          <div class="col-md-6">
                            <p>{customer && customer.email}</p>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                            <label>Phone</label>
                          </div>
                          <div class="col-md-6">
                            <p>{customer && customer.phone}</p>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                            <label>Address</label>
                          </div>
                          <div class="col-md-6">
                            <p>{customer && customer.address}</p>
                          </div>
                        </div>
                      </div>
                      <div
                        class="tab-pane fade"
                        id="profile"
                        role="tabpanel"
                        aria-labelledby="profile-tab"
                      >
                        <div class="row">
                          <div class="col-md-6">
                            <label>Account Number</label>
                          </div>
                          <div class="col-md-6">
                            <p>{account && account.accno}</p>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                            <label>Account Type</label>
                          </div>
                          <div class="col-md-6">
                            <p>{account && account.acctype}</p>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                            <label>IFSC Code</label>
                          </div>
                          <div class="col-md-6">
                            <p>{account && account.ifsccode}</p>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                            <label>Account Balance</label>
                          </div>
                          <div class="col-md-6">
                            <p>
                              {" "}
                              <i class="bi bi-currency-rupee"></i>{" "}
                              {account && account.balance}
                            </p>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                            <label>Account Status</label>
                          </div>
                          <div class="col-md-6">
                            <p>{account && account.status}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {/* -------------Code Ends------------ */}
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="changePasswordModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Edit Profile
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
              <div className="modal-body text-left">
                <label>Old Password</label>
                <input
                  className="form-control mb-3"
                  type="password"
                  name="oldpassword"
                  onChange={(e) =>
                    setFormData({ ...formData, oldpassword: e.target.value })
                  }
                />
                <label>New Password</label>
                <input
                  className="form-control mb-3"
                  type="password"
                  name="newpassword"
                  onChange={(e) =>
                    setFormData({ ...formData, newpassword: e.target.value })
                  }
                />
                <label>New Password Again</label>
                <input
                  className="form-control mb-3"
                  type="password"
                  name="newpasswordagain"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      newpasswordagain: e.target.value,
                    })
                  }
                />
              </div>
              <div class="modal-footer">
                <button
                  class="btn btn-secondary"
                  type="button"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  class="btn btn-primary"
                  type="submit"
                  data-dismiss="modal"
                  onClick={() => changePassword()}
                >
                  Submit
                </button>
              </div>
            </div>
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

export default CustomerDashboard;
