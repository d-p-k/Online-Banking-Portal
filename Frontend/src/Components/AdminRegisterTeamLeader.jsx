import React, { useState } from "react";
import { useAuth } from "../Utility/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import ErrorMsg from "./ErrorMsg";
import axios from "axios";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";

function AdminRegisterTeamLeader() {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    username: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    verify_password: "",
  };

  const nav = useNavigate();
  const auth = useAuth();

  const handleLogout = () => {
    auth.logout();
    nav("/admin-login");
    console.log("logout clicked");
  };

  const onSubmit = (values) => {
    setLoading(true);
    const payload = JSON.stringify(values);
    axios
      .post("http://localhost:9090/login/admin/register-teamleader", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.jwt}`,
        },
      })
      .then((res) => {
        console.log(values);
        console.log(res.data);
        nav("/admin-add-teamleader");
        toast.success(res.data);
        setLoading(false);
      })
      .catch((res) => console.log(res));
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Email format is missing")
      .required("Email is required"),
    address: Yup.string().required("Address is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Number must be exactly 10 digits")
      .required("Phone no is required"),
    password: Yup.string().required("Password is required"),
    verify_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Verify password"),
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
              <i className="fas fa-fw fa-users fs-6"></i>{" "}
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
            <div>
              <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                  <div
                    className="card o-hidden border-0 shadow-lg my-5"
                    style={{ width: "80%", margin: "auto" }}
                  >
                    <div className="card-body p-0">
                      <div className="col">
                        <div className="p-5">
                          <div className="text-center">
                            <h1 className="h4 text-gray-900 mb-4">
                              Team Leader Registration
                            </h1>
                          </div>
                          <hr />
                          <Formik
                            initialValues={initialValues}
                            onSubmit={onSubmit}
                            validationSchema={validationSchema}
                          >
                            <Form className="user">
                              <div className="form-group text-left">
                                <div class="form-group row">
                                  <div class="col-sm-6 mb-3 mb-sm-0">
                                    <label className="ps-3">User Name</label>
                                    <Field
                                      className="form-control form-control-user mb-2"
                                      type="username"
                                      id="username"
                                      name="username"
                                      placeholder="Enter employee's name"
                                    />
                                    <ErrorMessage
                                      name="username"
                                      component={ErrorMsg}
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    <label className="ps-3">Email</label>
                                    <Field
                                      className="form-control form-control-user mb-2"
                                      type="email"
                                      id="email"
                                      name="email"
                                      placeholder="Enter employee's email"
                                    />
                                    <ErrorMessage
                                      name="email"
                                      component={ErrorMsg}
                                    />
                                  </div>

                                  <div class="col-sm-6 mb-3 mb-sm-0">
                                    <label className="ps-3">Address</label>
                                    <Field
                                      className="form-control form-control-user mb-2"
                                      type="address"
                                      id="address"
                                      name="address"
                                      placeholder="Enter employee's address"
                                    />
                                    <ErrorMessage
                                      name="address"
                                      component={ErrorMsg}
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    <label className="ps-3">Phone Number</label>
                                    <Field
                                      className="form-control form-control-user mb-2"
                                      type="phone"
                                      id="phone"
                                      name="phone"
                                      placeholder="Enter employee's phone number"
                                    />
                                    <ErrorMessage
                                      name="phone"
                                      component={ErrorMsg}
                                    />
                                  </div>

                                  <div class="col-sm-6 mb-3 mb-sm-0">
                                    <label className="ps-3">Password</label>
                                    <Field
                                      className="form-control form-control-user mb-2"
                                      type="password"
                                      id="password"
                                      name="password"
                                      placeholder="Enter employee's password"
                                    />
                                    <ErrorMessage
                                      name="password"
                                      component={ErrorMsg}
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    <label className="ps-3">
                                      Verify Password
                                    </label>
                                    <Field
                                      className="form-control form-control-user mb-2"
                                      type="password"
                                      id="verify_password"
                                      name="verify_password"
                                      placeholder="Enter employee's password again"
                                    />
                                    <ErrorMessage
                                      name="verify_password"
                                      component={ErrorMsg}
                                    />
                                  </div>
                                </div>
                              </div>

                              <button
                                type="submit"
                                className="button rounded-5 bg-primary"
                              >
                                {loading && (
                                  <i className="fa fa-spin">
                                    <i className="bi bi-arrow-clockwise fs-6" />
                                  </i>
                                )}{" "}
                                {loading ? "SUBMITING...." : "SUBMIT"}
                              </button>
                              <hr />
                            </Form>
                          </Formik>
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

export default AdminRegisterTeamLeader;
