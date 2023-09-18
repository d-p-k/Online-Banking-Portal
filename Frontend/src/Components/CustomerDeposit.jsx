import { ErrorMessage, Field, Formik, Form } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorMsg from "./ErrorMsg";
import * as Yup from "yup";
import { useAuth } from "../Utility/AuthProvider";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function CustomerDeposit() {
  const [loading, setLoading] = useState(false);

  const auth = useAuth();
  const nav = useNavigate();

  const initialValues = {
    amount: null,
  };

  const submitHandler = async (values) => {
    setLoading(true);
    const payload = JSON.stringify(values);
    console.log(payload);
    axios
      .put(
        "http://localhost:9090/transaction/customer/transaction/deposit",
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
        nav("/customer-deposit");
        if (res.data.includes("successfully")) toast.success(res.data);
        else toast.error(res.data);
        setLoading(false);
      })
      .catch((res) => console.log(res));
  };

  const validationSchema = Yup.object({
    amount: Yup.number().positive().required("Amount is required."),
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
              <i className="bi bi-arrows-angle-expand"></i>{" "}
              <span>My Transactions</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/customer-deposit">
              <i className="bi bi-box-arrow-in-down-left"></i>{" "}
              <span>Deposit</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/customer-withdraw">
              <i className="bi bi-box-arrow-up-right"></i> <span>Withdraw</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/customer-bank-transfer">
              <i className="bi bi-arrows-expand"></i> <span>Bank Transfer</span>
            </Link>
          </li>
        </ul>
        <div id="content-wrapper" className="d-flex flex-column ">
          <div id="content">
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow justify-content-center">
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
                            <h1 className="h4 text-gray-900 mb-4">Deposit</h1>
                          </div>
                          <hr />
                          <Formik
                            initialValues={initialValues}
                            onSubmit={submitHandler}
                            validationSchema={validationSchema}
                          >
                            <Form className="user">
                              <div className="form-group text-left">
                                <label className="ps-3">Amount</label>
                                <Field
                                  className="form-control form-control-user mb-2"
                                  type="number"
                                  id="amount"
                                  name="amount"
                                  placeholder="Enter amount"
                                />
                                <ErrorMessage
                                  name="amount"
                                  component={ErrorMsg}
                                />
                              </div>

                              <button
                                type="submit"
                                className="button rounded-5 bg-primary"
                                disabled={loading}
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

export default CustomerDeposit;
