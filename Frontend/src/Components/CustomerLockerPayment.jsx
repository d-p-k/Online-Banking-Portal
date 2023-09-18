import { ErrorMessage, Field, Formik, Form } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorMsg from "./ErrorMsg";
import * as Yup from "yup";
import { useAuth } from "../Utility/AuthProvider";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function CustomerLockerPayment() {
  const [loading, setLoading] = useState(false);

  const auth = useAuth();
  const nav = useNavigate();

  const initialValues = {
    lockertype: null,
    lockeramount: null,
  };

  const submitHandler = (values) => {
    setLoading(true);
    const payload = JSON.stringify(values);

    axios
      .put(
        "http://localhost:9090/locker/customer/locker/locker-payment",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.jwt}`,
          },
        }
      )
      .then((res) => {
        console.log(values);
        console.log(res.data);
        nav("/customer-locker-payment");
        if (res.data.includes("successfully")) toast.success(res.data);
        else toast.error(res.data);
        setLoading(false);
      })
      .catch((res) => console.log(res));
  };

  const validationSchema = Yup.object({
    lockertype: Yup.string().required("Select locker type"),
    lockeramount: Yup.number().positive().required("Amount is required."),
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
            <Link className="nav-link" to="/customer-my-lockers">
              <i class="bi bi-database-lock"></i> <span>My Lockers</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/customer-apply-for-locker">
              <i class="bi bi-file-lock"></i> <span>Apply For Locker</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/customer-locker-payment">
              <i class="bi bi-building-lock"></i> <span>Locker Payment</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/customer-close-locker">
              <i class="bi bi-file-lock-fill"></i> <span>Close Locker</span>
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
                    style={{ width: "60%", margin: "auto" }}
                  >
                    <div className="card-body p-0">
                      <div className="col">
                        <div className="p-5">
                          <div className="text-center">
                            <h1 className="h4 text-gray-900 mb-4">
                              Locker Payment
                            </h1>
                          </div>
                          <hr />
                          <Formik
                            initialValues={initialValues}
                            onSubmit={submitHandler}
                            validationSchema={validationSchema}
                          >
                            <Form className="user">
                              <div className="form-group text-left">
                                <label className="ps-3">Locker Type</label>
                                <Field
                                  className="form-control mb-2"
                                  style={{
                                    paddingLeft: "15px",
                                    fontSize: "0.8rem",
                                    borderRadius: "10rem",
                                    height: "50px",
                                  }}
                                  type="text"
                                  id="lockertype"
                                  name="lockertype"
                                  as="select"
                                >
                                  <option value="">Select Locker</option>
                                  <option value="Temporary Locker">
                                    Temporary Locker
                                  </option>
                                  <option value="Personal Locker">
                                    Personal Locker
                                  </option>
                                  <option value="Self Deposit Locker">
                                    Self Deposit Locker
                                  </option>
                                  <option value="Business Locker">
                                    Business Locker
                                  </option>
                                  <option value="Shared Locker">
                                    Shared Locker
                                  </option>
                                  <option value="Digital Locker">
                                    Digital Locker
                                  </option>
                                  <option value="Keyless Locker">
                                    Keyless Locker
                                  </option>
                                </Field>
                                <ErrorMessage
                                  name="lockertype"
                                  component={ErrorMsg}
                                />

                                <label className="ps-3">Locker Amount</label>
                                <Field
                                  className="form-control mb-2"
                                  style={{
                                    paddingLeft: "15px",
                                    fontSize: "0.8rem",
                                    borderRadius: "10rem",
                                    height: "50px",
                                  }}
                                  type="number"
                                  id="lockeramount"
                                  name="lockeramount"
                                  placeholder="Enter locker amount"
                                />
                                <ErrorMessage
                                  name="lockeramount"
                                  component={ErrorMsg}
                                />
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
      <ToastContainer />
    </div>
  );
}

export default CustomerLockerPayment;
