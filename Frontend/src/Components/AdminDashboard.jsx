import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Utility/AuthProvider";
import axios from "axios";
import "./AllCss.css";
import { ToastContainer, toast } from "react-toastify";

function AdminDashboard() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const showToast = queryParams.get("showToast");

  const [homeText, setHomeText] = useState(null);
  const [admin, setAdmin] = useState(null);

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
    nav("/admin-login");
    console.log("logout clicked");
  };

  useEffect(() => {
    if (showToast === "true") {
      toast.success("Login Successful");
    }

    const fetchHomeText = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9090/login/admin/home",
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

    const fetchAdmin = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9090/login/admin/profile",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.jwt}`,
            },
          }
        );
        console.log(response.data);
        setAdmin(response.data);
      } catch (error) {
        console.error(error);
        console.log("error has occured");
      }
    };

    fetchHomeText();
    fetchAdmin();
  }, []);

  const changePassword = () => {
    const payload = JSON.stringify(formData);
    console.log(payload);
    axios
      .post("http://localhost:9090/login/admin/change-password", payload, {
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
            to="/admin-dashboard"
          >
            <div className="sidebar-brand-text mx-3">Admin</div>
          </Link>

          <hr className="sidebar-divider my-0 bg-white" />

          <li className="nav-item active">
            <Link className="nav-link" to="/admin-dashboard">
              <i className="fas fa-fw fa-tachometer-alt"></i>{" "}
              <span>Dashboard</span>
            </Link>
          </li>

          <hr className="sidebar-divider p-0 bg-white" />

          <div className="sidebar-heading">Interfaces</div>

          <li className="nav-item">
            <Link className="nav-link" to="/admin-all-employees">
              <i className="fas fa-fw fa-users fs-6 "></i>{" "}
              <span>All Employees</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/admin-add-employee">
              <i class="bi bi-person-plus-fill fs-6"></i>{" "}
              <span>Add Employee</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/admin-all-vendors">
              <i className="fas fa-fw fa-users fs-6 "></i>{" "}
              <span>All Vendors</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/admin-add-vendor">
              <i class="bi bi-person-plus-fill fs-6"></i>{" "}
              <span>Add Vendor</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/admin-all-teamleaders">
              <i className="fas fa-fw fa-users fs-6 "></i>{" "}
              <span>All Team Leaders</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/admin-add-teamleader">
              <i class="bi bi-person-plus-fill fs-6"></i>{" "}
              <span>Add Team Leader</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/admin-retrive-reports">
              <i class="bi bi-person-plus-fill fs-6"></i>{" "}
              <span>Retrive Reports</span>
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
              <i className="fas fa-fw fa-sign-out-alt fs-6"></i>{" "}
              <span>Logout</span>
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
              <div class="h-100 p-5 bg-body-tertiary border rounded-3">
                <h2>Dil Se Open</h2>
                <p className="text-primary font-weight-bold">{homeText}</p>
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
                      </ul>
                    </div>
                    <div class="col-md-6">
                      <Link
                        className="btn btn-primary"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            userid: admin.id,
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
                            <p>{admin && admin.username}</p>
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
                            <p>{admin && admin.email}</p>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                            <label>Phone</label>
                          </div>
                          <div class="col-md-6">
                            <p>{admin && admin.phone}</p>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                            <label>Address</label>
                          </div>
                          <div class="col-md-6">
                            <p>{admin && admin.address}</p>
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

export default AdminDashboard;
