// import * as React from "react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ErrorMsg from "./ErrorMsg";
import axios from "axios";
import { useAuth } from "../Utility/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import customerlogin from "../Components/img/customer_login.png";

export default function CustomerSignIn() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const showToast = queryParams.get("showToast");

  const initialValues = {
    email: "",
    password: "",
  };

  useEffect(() => {
    if (showToast === "true") {
      toast.success("You are registered successfully");
    }
  }, []);

  const nav = useNavigate();
  const auth = useAuth();

  const onLogin = (values) => {
    const payload = JSON.stringify(values);

    axios
      .post("http://localhost:9090/login/customer/authenticate", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(values);
        console.log(res.data);
        if (
          res.data === "Invalid email or password" ||
          res.data ===
            "Sorry you can't perform this operation because your account is not activated yet."
        ) {
          nav("/customer-login");
          toast.error(res.data);
        } else {
          const jwt = res.data;
          localStorage.setItem("jwt", jwt);
          auth.login(values.email, values.password, jwt);
          nav("/customer-dashboard?showToast=true");
        }
      })
      .catch((res) => console.log(res));
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("email format is missing")
      .required("email required"),
    password: Yup.string().required("password required"),
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
                      src={customerlogin}
                      alt="Customer Login Img"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                  <div className="col-lg-7">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">
                          Customer Login
                        </h1>
                      </div>
                      <hr />
                      <Formik
                        initialValues={initialValues}
                        onSubmit={onLogin}
                        validationSchema={validationSchema}
                      >
                        <Form className="user">
                          <div className="form-group">
                            <Field
                              className="form-control form-control-user mb-2"
                              type="email"
                              id="email"
                              name="email"
                              placeholder="Enter your email"
                            />
                            <ErrorMessage name="email" component={ErrorMsg} />
                          </div>

                          <div className="form-group">
                            <Field
                              className="form-control form-control-user mb-2"
                              type="password"
                              id="password"
                              name="password"
                              placeholder="Enter your password"
                            />
                            <ErrorMessage
                              name="password"
                              component={ErrorMsg}
                            />
                          </div>

                          <button
                            type="submit"
                            className="button rounded-5 bg-primary"
                          >
                            SIGN IN
                          </button>
                          <hr />
                          <Link
                            to="#"
                            class="btn btn-danger btn-user btn-block"
                          >
                            <i class="fab fa-google fa-fw"></i> LOGIN WITH
                            GOOGLE
                          </Link>
                          <Link
                            to="#"
                            class="btn btn-primary btn-user btn-block"
                          >
                            <i class="fab fa-facebook-f fa-fw"></i> LOGIN WITH
                            FACEBOOK
                          </Link>
                        </Form>
                      </Formik>
                      <hr />
                      <div className="container d-flex">
                        <div className="leftlink">
                          <Link to="/customer-register" className="link">
                            Don't have an account? Register!
                          </Link>
                        </div>
                        <div className="rightlink">
                          <Link to="/forgot-password" className="link">
                            Forgot password
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
      </div>
      <ToastContainer />
    </body>
  );
}
