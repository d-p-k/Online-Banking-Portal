// import * as React from "react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ErrorMsg from "./ErrorMsg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import forgotpassword from "../Components/img/Forgot Password.jpg";

export default function ForgotPassword() {
  const [sendLoading, setSendLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [email, setEmail] = useState(null);

  const initialValues1 = {
    email: "",
  };

  const initialValues2 = {
    otp: "",
    password: "",
    verify_password: "",
  };

  const onSendOTP = (values) => {
    setSendLoading(true);
    setEmail(values.email);
    const payload = JSON.stringify(values);
    axios
      .post("http://localhost:9090/login/customer/send-otp", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        toast.success(res.data);
        setSendLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setSendLoading(false);
      });
  };

  const onSubmit = (values) => {
    setSubmitLoading(true);
    const credentials = {
      email: email,
      password: values.password,
      otp: values.otp,
    };
    console.log(credentials);
    const payload = JSON.stringify(credentials);
    axios
      .post("http://localhost:9090/login/customer/reset-password", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === "Please enter correct OTP") toast.error(res.data);
        else toast.success(res.data);
        setSubmitLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setSubmitLoading(false);
      });
  };

  const validationSchema1 = Yup.object({
    email: Yup.string()
      .email("Email format is missing")
      .required("Email required"),
  });

  const validationSchema2 = Yup.object({
    otp: Yup.string()
      .matches(/^[0-9]{6}$/, "OTP must be exactly 6 digits")
      .required("OTP is required"),
    password: Yup.string().required("Password required"),
    verify_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Verify password"),
  });

  return (
    <body className="bg-gradient-primary">
      <div>
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9 ">
            <div
              className="card o-hidden border-0 shadow-lg my-5"
              style={{ width: "70%", margin: "auto" }}
            >
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-5 d-none d-lg-block ">
                    <img
                      src={forgotpassword}
                      alt="Customer Login Img"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                  <div className="col-lg-7">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">
                          Forgot Your Password?
                        </h1>
                        <p class="mb-4">
                          We get it, stuff happens. Just enter your email
                          address below and we'll send you an OTP to reset your
                          password!
                        </p>
                      </div>
                      <hr />
                      <Formik
                        initialValues={initialValues1}
                        onSubmit={onSendOTP}
                        validationSchema={validationSchema1}
                      >
                        <Form className="user">
                          <div className="row">
                            <div className="col-8">
                              <div className="form-group">
                                <Field
                                  className="form-control form-control-user mb-2"
                                  type="email"
                                  id="email"
                                  name="email"
                                  placeholder="Enter your email"
                                />
                                <ErrorMessage
                                  name="email"
                                  component={ErrorMsg}
                                />
                              </div>
                            </div>
                            <div className="col-4">
                              <button
                                type="submit"
                                className="button rounded-5 bg-primary"
                              >
                                {sendLoading && (
                                  <i className="fa fa-spin">
                                    <i className="bi bi-arrow-clockwise fs-6" />
                                  </i>
                                )}{" "}
                                {sendLoading ? "SENDING.." : "SEND OTP"}
                              </button>
                            </div>
                          </div>
                        </Form>
                      </Formik>
                      <hr />
                      <Formik
                        initialValues={initialValues2}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema2}
                      >
                        <Form className="user">
                          <div className="form-group">
                            <Field
                              className="form-control form-control-user mb-2"
                              type="password"
                              id="otp"
                              name="otp"
                              placeholder="Enter your 6 digits OTP"
                            />
                            <ErrorMessage name="otp" component={ErrorMsg} />
                          </div>
                          <div className="row">
                            <div className="col-6">
                              <div className="form-group">
                                <Field
                                  className="form-control form-control-user mb-2"
                                  type="password"
                                  id="password"
                                  name="password"
                                  placeholder="Enter new password"
                                />
                                <ErrorMessage
                                  name="password"
                                  component={ErrorMsg}
                                />
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="form-group">
                                <Field
                                  className="form-control form-control-user mb-2"
                                  type="password"
                                  id="verify_password"
                                  name="verify_password"
                                  placeholder="Enter new password again"
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
                            {submitLoading && (
                              <i className="fa fa-spin">
                                <i className="bi bi-arrow-clockwise fs-6" />
                              </i>
                            )}{" "}
                            {submitLoading ? "SUBMITING...." : "SUBMIT"}
                          </button>
                        </Form>
                      </Formik>
                      <hr />
                      <div className="text-center">
                        <Link to="/customer-register" className="link">
                          Create a Customer Account!
                        </Link>
                      </div>
                      <div className="text-center">
                        <Link to="/customer-login" className="link">
                          Already have a Customer Account? Login!
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </body>
  );
}
