import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ErrorMsg from "./ErrorMsg";
import "./AllCss.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import customerregister from "../Components/img/customer_register.jpg";

export default function CustomerSignIn() {
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

  const onSubmit = (values) => {
    setLoading(true);
    const payload = JSON.stringify(values);
    axios
      .post("http://localhost:9090/login/customer/register", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(values);
        console.log(res.data);
        if (res.data.includes("successfully")) {
          setLoading(false);
          nav("/customer-login?showToast=true");
        } else {
          setLoading(false);
          nav("/customer-register");
          toast.error(res.data);
        }
      })
      .catch((res) => console.log(res));
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("username required"),
    email: Yup.string()
      .email("email format is missing")
      .required("email required"),
    address: Yup.string().required("address required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "number must be exactly 10 digits")
      .required("phone no is required"),
    password: Yup.string().required("password required"),
    verify_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "passwords must match")
      .required("verify password"),
  });

  return (
    <body class="bg-gradient-primary py-2">
      <div class="container">
        <div
          class="card o-hidden border-0 shadow-lg my-5"
          style={{ width: "80%", margin: "auto" }}
        >
          <div class="card-body p-0">
            <div class="row">
              <div class="col-lg-5 d-none d-lg-block">
                <img
                  src={customerregister}
                  alt="Login Img"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <div class="col-lg-7">
                <div class="p-5">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-4">Customer Registration</h1>
                  </div>
                  <hr />
                  <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                  >
                    <Form class="user">
                      <div class="form-group row">
                        <div class="col-sm-6 mb-3 mb-sm-0">
                          <Field
                            className="form-control form-control-user mb-2"
                            type="username"
                            id="username"
                            name="username"
                            placeholder="Enter your name"
                          />
                          <ErrorMessage name="username" component={ErrorMsg} />
                        </div>
                        <div class="col-sm-6">
                          <Field
                            className="form-control form-control-user mb-2"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                          />
                          <ErrorMessage name="email" component={ErrorMsg} />
                        </div>
                      </div>

                      <div class="form-group row">
                        <div class="col-sm-6 mb-3 mb-sm-0">
                          <Field
                            className="form-control form-control-user mb-2"
                            type="address"
                            id="address"
                            name="address"
                            placeholder="Enter your address"
                          />
                          <ErrorMessage name="address" component={ErrorMsg} />
                        </div>
                        <div class="col-sm-6">
                          <Field
                            className="form-control form-control-user mb-2"
                            type="phone"
                            id="phone"
                            name="phone"
                            placeholder="Enter your phone no"
                          />
                          <ErrorMessage name="phone" component={ErrorMsg} />
                        </div>
                      </div>

                      <div class="form-group row">
                        <div class="col-sm-6 mb-3 mb-sm-0">
                          <Field
                            className="form-control form-control-user mb-2"
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                          />
                          <ErrorMessage name="password" component={ErrorMsg} />
                        </div>
                        <div class="col-sm-6">
                          <Field
                            className="form-control form-control-user mb-2"
                            type="password"
                            id="verify_password"
                            name="verify_password"
                            placeholder="Enter your password again"
                          />
                          <ErrorMessage
                            name="verify_password"
                            component={ErrorMsg}
                          />
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
                        {loading ? "REGISTERING...." : "REGISTER"}
                      </button>
                      <hr />
                      <Link to="#" class="btn btn-danger btn-user btn-block">
                        <i class="fab fa-google fa-fw"></i> REGISTER WITH GOOGLE
                      </Link>
                      <Link to="#" class="btn btn-primary btn-user btn-block">
                        <i class="fab fa-facebook-f fa-fw"></i> REGISTER WITH
                        FACEBOOK
                      </Link>
                    </Form>
                  </Formik>
                  <hr />
                  <div className="text-center">
                    <Link to="/customer-login" className="link">
                      Already have an account? Login!
                    </Link>
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
