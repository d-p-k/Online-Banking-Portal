import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Utility/AuthProvider";
import { ErrorMessage, Field, Form, Formik } from "formik";
import ErrorMsg from "./ErrorMsg";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import * as Yup from "yup";

function VendorMarkProductivity() {
  const tasks = [
    "Handle customer inquiries and provide support",
    "Process orders and assist with product/service information",
    "Address customer complaints and resolve issues",
    "Provide technical assistance and troubleshoot problems",
    "Conduct sales calls and promote products/services.",
    "Follow up with leads and prospects",
    "Conduct customer satisfaction surveys",
    "Schedule appointments or demos",
    "Respond to customer inquiries and provide support via email",
    "Manage and organize email communication with clients",
    "Process orders and handle order-related inquiries",
    "Address customer complaints and resolve issues via email",
    "Provide real-time support to website visitors via live chat",
    "Answer product/service questions and provide assistance",
    "Help customers navigate the website and troubleshoot issues",
    "Process orders and assist with payment-related queries",
    "Create and schedule social media posts",
    "Engage with followers and respond to comments/messages",
    "Monitor social media channels for mentions and feedback",
    "Analyze social media metrics and report on performance",
    "Enter data accurately into the system/database",
    "Verify and validate data for accuracy and completeness",
    "Generate reports and perform data analysis",
    "Maintain data integrity and confidentiality",
    "Provide technical assistance over the phone or through chat/email",
    "Troubleshoot hardware/software issues",
    "Install and configure software applications",
    "Document technical solutions and create knowledge base articles",
    "Review and moderate user-generated content",
    "Enforce community guidelines and policies",
    "Respond to user inquiries and resolve content-related issues",
    "Identify and report inappropriate content or violations",
  ];

  const [loading, setLoading] = useState(false);
  const [tpid, setTpid] = useState("");
  const [username, setUserame] = useState("");
  const [teamleaders, setTeamleaders] = useState([]);

  const initialValues = {
    taskdescription: "",
    hours: "",
    minutes: "",
    date: "",
    assignee: "",
  };

  const nav = useNavigate();
  const auth = useAuth();

  const handleLogout = () => {
    auth.logout();
    nav("/vendor-login");
    console.log("logout clicked");
  };

  useEffect(() => {
    const fetchProfile = () => {
      axios
        .get("http://localhost:9090/login/vendor/profile", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.jwt}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setTpid(res.data.tpid);
          setUserame(res.data.username);
        })
        .catch((res) => console.log(res));
    };

    const fetchTeamLeaders = () => {
      axios
        .get("http://localhost:9090/login/vendor/all-teamleaders", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.jwt}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setTeamleaders(res.data);
        })
        .catch((res) => console.log(res));
    };

    fetchProfile();
    fetchTeamLeaders();
  }, []);

  const onSubmit = (values) => {
    setLoading(true);
    const payload = JSON.stringify(values);
    axios
      .post("http://localhost:9090/login/vendor/mark-productivity", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.jwt}`,
        },
      })
      .then((res) => {
        console.log(values);
        console.log(res.data);
        toast.success(res.data);
        setLoading(false);
      })
      .catch((res) => console.log(res));
  };

  const validationSchema = Yup.object({
    taskdescription: Yup.string().required("Task is required"),
    hours: Yup.number()
      .min(0, "Minimum allowed value is 0")
      .max(12, "Maximum allowed value is 12")
      .required("Value is required"),
    minutes: Yup.number()
      .min(0, "Minimum allowed value is 0")
      .max(59, "Maximum allowed value is 59")
      .required("Value is required"),
    date: Yup.date().required("Date is required"),
    assignee: Yup.string().required("Assignee is required"),
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
            to="/vendor-dashboard"
          >
            <div className="sidebar-brand-text mx-3">Vendor</div>
          </Link>

          <hr className="sidebar-divider my-0 bg-white" />

          <li className="nav-item active">
            <Link className="nav-link" to="/vendor-dashboard">
              <i className="fas fa-fw fa-tachometer-alt"></i>{" "}
              <span>Dashboard</span>
            </Link>
          </li>

          <hr className="sidebar-divider p-0 bg-white" />

          <div className="sidebar-heading">Interfaces</div>

          <li className="nav-item">
            <Link className="nav-link" to="/vendor-mark-productivity">
              <i className="fas fa-fw fa-users fs-6 "></i>{" "}
              <span>Mark Productivity</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/vendor-my-reports">
              <i class="bi bi-person-plus-fill fs-6"></i>{" "}
              <span>My Reports</span>
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
            <div>
              <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                  <div
                    className="card o-hidden border-0 shadow-lg my-5"
                    style={{ width: "70%", margin: "auto" }}
                  >
                    <div className="card-body p-0">
                      <div className="col">
                        <div className="p-5">
                          <div className="text-center">
                            <h1 className="h4 text-gray-900 mb-4">
                              Mark Productivity
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
                                    <label className="ps-3">TP ID</label>
                                    <Field
                                      className="form-control form-control-user mb-2"
                                      type="text"
                                      value={tpid}
                                      readOnly
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    <label className="ps-3">Name</label>
                                    <Field
                                      className="form-control form-control-user mb-2"
                                      type="text"
                                      value={username}
                                      readOnly
                                    />
                                  </div>

                                  <div class="col-sm-12 mb-3 mb-sm-0">
                                    <label className="ps-3">
                                      Task Description
                                    </label>

                                    <Field
                                      className="form-control mb-2"
                                      style={{
                                        paddingLeft: "15px",
                                        fontSize: "0.8rem",
                                        borderRadius: "10rem",
                                        height: "50px",
                                      }}
                                      type="text"
                                      id="taskdescription"
                                      name="taskdescription"
                                      as="select"
                                    >
                                      <option value="">Select your task</option>
                                      {tasks.map((task) => (
                                        <option value={task}>{task}</option>
                                      ))}
                                    </Field>
                                    <ErrorMessage
                                      name="taskdescription"
                                      component={ErrorMsg}
                                    />
                                  </div>

                                  <div class="col-sm-6 mb-3 mb-sm-0">
                                    <label className="ps-3">
                                      Time Consumed (Hours)
                                    </label>
                                    <Field
                                      className="form-control form-control-user mb-2"
                                      type="number"
                                      id="hours"
                                      name="hours"
                                      placeholder="Enter hours"
                                    />
                                    <ErrorMessage
                                      name="hours"
                                      component={ErrorMsg}
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    <label className="ps-3">
                                      Time Consumed (Minutes)
                                    </label>
                                    <Field
                                      className="form-control form-control-user mb-2"
                                      type="number"
                                      id="minutes"
                                      name="minutes"
                                      placeholder="Enter minutes"
                                    />
                                    <ErrorMessage
                                      name="minutes"
                                      component={ErrorMsg}
                                    />
                                  </div>

                                  <div class="col-sm-6 mb-3 mb-sm-0">
                                    <label className="ps-3">Date</label>
                                    <Field
                                      className="form-control form-control-user mb-2"
                                      type="date"
                                      id="date"
                                      name="date"
                                      placeholder="Select date"
                                    />
                                    <ErrorMessage
                                      name="date"
                                      component={ErrorMsg}
                                    />
                                  </div>
                                  <div className="col-sm-6">
                                    <label className="ps-3">Assignee</label>
                                    <Field
                                      className="form-control mb-2"
                                      style={{
                                        paddingLeft: "15px",
                                        fontSize: "0.8rem",
                                        borderRadius: "10rem",
                                        height: "50px",
                                      }}
                                      type="text"
                                      id="assignee"
                                      name="assignee"
                                      as="select"
                                    >
                                      <option value="">Select assignee</option>
                                      {teamleaders.map((teamleader) => (
                                        <option value={teamleader.email}>
                                          {teamleader.email}
                                        </option>
                                      ))}
                                    </Field>
                                    <ErrorMessage
                                      name="assignee"
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

export default VendorMarkProductivity;
