import { ErrorMessage, Field, Formik, Form } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorMsg from "./ErrorMsg";
import * as Yup from "yup";
import { useAuth } from "../Utility/AuthProvider";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function CustomerApplyLoan() {
  const [loading, setLoading] = useState(false);

  const auth = useAuth();
  const nav = useNavigate();

  const initialValues = {
    loantype: null,
    loanamount: 0,
    duration: 0,
  };

  const submitHandler = (values) => {
    setLoading(true);
    const payload = JSON.stringify(values);

    axios
      .post("http://localhost:9090/loan/customer/loan/apply-loan", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.jwt}`,
        },
      })
      .then((res) => {
        console.log(values);
        console.log(res.data);

        nav("/customer-apply-loan");
        if (res.data.includes("successfully")) toast.success(res.data);
        else toast.error(res.data);
        setLoading(false);
      })
      .catch((res) => console.log(res));
  };

  const validationSchema = Yup.object({
    loantype: Yup.string().required("Select loan type"),
    loanamount: Yup.number()
      .max(500000, "Loan Amount must be less than or equal to 500000")
      .positive()
      .required("Loan amount is required."),
    duration: Yup.number().positive().required("Loan duration is required."),
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
            <Link className="nav-link" to="/customer-my-loans">
              <i className="fas fa-fw fa-chart-area"></i> <span>My Loans</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/customer-apply-loan">
              <i className="fas fa-fw fa-chart-area"></i>{" "}
              <span>Apply For Loan</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/customer-loan-payment">
              <i className="fas fa-fw fa-lock"></i> <span>Loan Payment</span>
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
                              Apply For Loan
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
                                <label className="ps-3">Loan Type</label>
                                <Field
                                  className="form-control mb-2"
                                  style={{
                                    paddingLeft: "15px",
                                    fontSize: "0.8rem",
                                    borderRadius: "10rem",
                                    height: "50px",
                                  }}
                                  type="text"
                                  id="loantype"
                                  name="loantype"
                                  placeholder="Select loan type"
                                  as="select"
                                >
                                  <option value="">Select Loan</option>
                                  <option value="Home Loan">Home Loan</option>
                                  <option value="Education Loan">
                                    Education Loan
                                  </option>
                                  <option value="Personal Loan">
                                    Personal Loan
                                  </option>
                                  <option value="Payday Loan">
                                    Payday Loan
                                  </option>
                                  <option value="Business Loan">
                                    Business Loan
                                  </option>
                                  <option value="Vehical Loan">
                                    Vehical Loan
                                  </option>
                                </Field>
                                <ErrorMessage
                                  name="loantype"
                                  component={ErrorMsg}
                                />
                                <label className="ps-3">Loan Amount</label>
                                <Field
                                  className="form-control form-control-user mb-2"
                                  type="number"
                                  id="loanamount"
                                  name="loanamount"
                                  placeholder="Enter loan amount"
                                />
                                <ErrorMessage
                                  name="loanamount"
                                  component={ErrorMsg}
                                />
                                <label className="ps-3">Duration</label>
                                <Field
                                  className="form-control mb-2"
                                  style={{
                                    paddingLeft: "15px",
                                    fontSize: "0.8rem",
                                    borderRadius: "10rem",
                                    height: "50px",
                                  }}
                                  type="number"
                                  id="duration"
                                  name="duration"
                                  placeholder="Enter duration"
                                  as="select"
                                >
                                  <option value="">Select Months</option>
                                  <option value="12">12 Months</option>
                                  <option value="24">24 Months</option>
                                  <option value="36">36 Months</option>
                                  <option value="48">48 Months</option>
                                  <option value="60">60 Monts</option>
                                </Field>
                                <ErrorMessage
                                  name="duration"
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

export default CustomerApplyLoan;
