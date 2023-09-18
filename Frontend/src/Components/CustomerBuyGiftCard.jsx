import { ErrorMessage, Field, Formik, Form } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorMsg from "./ErrorMsg";
import * as Yup from "yup";
import { useAuth } from "../Utility/AuthProvider";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function CustomerBuyGiftCard() {
  const [loading, setLoading] = useState(false);

  const auth = useAuth();
  const nav = useNavigate();

  const initialValues = {
    giftcardname: null,
    recipientname: null,
    recipientemail: null,
    giftcardamount: null,
  };

  const submitHandler = (values) => {
    setLoading(true);
    const payload = JSON.stringify(values);

    axios
      .post(
        "http://localhost:9090/gift-card/customer/giftcard/buy-giftcard",
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
        nav("/customer-buy-gift-card");
        toast.success(res.data);
        setLoading(false);
      })
      .catch((res) => console.log(res));
  };

  const validationSchema = Yup.object({
    giftcardname: Yup.string().required("Select gift card"),
    recipientname: Yup.string().required("Recipient's name required"),
    recipientemail: Yup.string()
      .email("Email format is missing")
      .required("Recipient's email required"),
    giftcardamount: Yup.number().positive().required("Amount is required."),
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
            <Link className="nav-link" to="/customer-my-gift-cards">
              <i class="bi bi-box2-heart"></i> <span>My Gift Cards</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/customer-buy-gift-card">
              <i class="bi bi-box2-heart-fill"></i> <span>Buy Gift Card</span>
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
                              Buy Gift Card
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
                                <label className="ps-3">Gift Card Type</label>
                                <Field
                                  className="form-control mb-2"
                                  style={{
                                    paddingLeft: "15px",
                                    fontSize: "0.8rem",
                                    borderRadius: "10rem",
                                    height: "50px",
                                  }}
                                  type="text"
                                  id="giftcardname"
                                  name="giftcardname"
                                  as="select"
                                >
                                  <option value="">Select Gift Card</option>
                                  <option value="Amazon Gift Card">
                                    Amazon Gift Card
                                  </option>
                                  <option value="Flipkard Gift Card">
                                    Flipkard Gift Card
                                  </option>
                                  <option value="Netflix Gift Card">
                                    Netflix Gift Card
                                  </option>
                                  <option value="Starbucks Gift Card">
                                    Starbucks Gift Card
                                  </option>
                                  <option value="Uber Gift Card">
                                    Uber Gift Card
                                  </option>
                                  <option value="Google Play Gift Card">
                                    Google Play Gift Card
                                  </option>
                                </Field>
                                <ErrorMessage
                                  name="giftcardname"
                                  component={ErrorMsg}
                                />

                                <label className="ps-3">Recipient's Name</label>
                                <Field
                                  className="form-control form-control-user mb-2"
                                  type="text"
                                  id="recipientname"
                                  name="recipientname"
                                  placeholder="Enter your name"
                                />
                                <ErrorMessage
                                  name="recipientname"
                                  component={ErrorMsg}
                                />

                                <label className="ps-3">
                                  Recipient's Email
                                </label>
                                <Field
                                  className="form-control form-control-user mb-2"
                                  type="email"
                                  id="recipientemail"
                                  name="recipientemail"
                                  placeholder="Enter recipient's email"
                                />
                                <ErrorMessage
                                  name="recipientemail"
                                  component={ErrorMsg}
                                />

                                <div className="form-group text-left">
                                  <label className="ps-3">Amount</label>
                                  <Field
                                    className="form-control form-control-user mb-2"
                                    type="number"
                                    id="giftcardamount"
                                    name="giftcardamount"
                                    placeholder="Enter amount"
                                  />
                                  <ErrorMessage
                                    name="giftcardamount"
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

export default CustomerBuyGiftCard;
