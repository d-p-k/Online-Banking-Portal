import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Utility/AuthProvider";
import { useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { CSVLink } from "react-csv";

function AdminRetriveReports() {
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

  const [startdate, setstartdate] = useState(null);
  const [enddate, setenddate] = useState(null);
  const [username, setUsername] = useState(null);
  const [task, setTask] = useState(null);
  const [filteredReports, setFilteredReports] = useState([]);

  const [reports, setReports] = useState([]);

  const auth = useAuth();
  const nav = useNavigate();
  const componentPDF = useRef();

  const handleLogout = () => {
    auth.logout();
    nav("/admin-login");
    console.log("logout clicked");
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/login/admin/all-approved-reports",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.jwt}`,
          },
        }
      );
      console.log(response.data);
      setReports(response.data);
      setFilteredReports(response.data);
    } catch (error) {
      console.error(error);
      console.log("error has occured");
    }
  };

  const fetchFilteredData = () => {
    const filteredResults = reports.filter((row) => {
      return (
        startdate != null &&
        row.date >= startdate &&
        enddate != null &&
        row.date <= enddate &&
        username != null &&
        row.username === username &&
        task != null &&
        row.taskdescription === task
      );
    });
    setFilteredReports(filteredResults);
  };

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Vendors_Reports",
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
              <p className="display-6 pb-1">All Vendors Reports</p>
              <hr />

              <div className="row p-4">
                <div className="col-md-4">
                  <div className="d-flex justify-content-center">
                    <h6 style={{ padding: "8px", width: "100px" }}>
                      Start Date
                    </h6>
                    <input
                      type="date"
                      id="startdate"
                      name="startdate"
                      className="form-control"
                      onChange={(e) => setstartdate(e.target.value)}
                      style={{ width: "250px" }}
                    />
                  </div>
                  <br />
                  <div className="d-flex justify-content-center">
                    <h6 style={{ padding: "8px", width: "100px" }}>Name</h6>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      className="form-control"
                      onChange={(e) => setUsername(e.target.value)}
                      style={{ width: "250px" }}
                      placeholder="Enter vendor's name"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex justify-content-center">
                    <h6 style={{ padding: "8px", width: "100px" }}>End Date</h6>
                    <input
                      type="date"
                      id="enddate"
                      name="enddate"
                      className="form-control"
                      onChange={(e) => setenddate(e.target.value)}
                      style={{ width: "250px" }}
                    />
                  </div>
                  <br />
                  <div className="d-flex justify-content-center">
                    <h6 style={{ padding: "8px", width: "100px" }}>Task</h6>
                    <select
                      id="task"
                      name="task"
                      className="form-control"
                      onChange={(e) => setTask(e.target.value)}
                      style={{ width: "250px" }}
                    >
                      <option value="">Select a task</option>
                      {tasks.map((task, index) => (
                        <option key={index} value={task}>
                          {task}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={fetchAllData}
                    style={{ width: "190px" }}
                  >
                    All
                  </button>
                  <br />
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={fetchFilteredData}
                    style={{ width: "190px", marginTop: "32px" }}
                  >
                    Search
                  </button>
                </div>
              </div>

              <div
                style={{
                  maxHeight: "500px",
                  overflowY: "auto",
                }}
              >
                <div ref={componentPDF} style={{ width: "100%" }}>
                  <table className="table table-bordered shadow p-3 mb-5 rounded">
                    <thead
                      className="table-secondary"
                      style={{
                        position: "sticky",
                        zIndex: "1",
                        top: "0",
                      }}
                    >
                      <tr>
                        <th scope="col">S. No.</th>
                        <th scope="col">TP ID</th>
                        <th scope="col">Name</th>
                        <th scope="col" className="px-5">
                          Date
                        </th>
                        <th scope="col">Task Description</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Assignee</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {filteredReports.map((report, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{report.tpid}</td>
                          <td>{report.username}</td>
                          <td>{report.date}</td>
                          <td>{report.taskdescription}</td>
                          <td>{report.duration}</td>
                          <td>{report.assignee}</td>
                          <td
                            style={{
                              color:
                                report.status === "APPROVED"
                                  ? "forestgreen"
                                  : report.status === "REJECTED"
                                  ? "red"
                                  : "black",
                            }}
                          >
                            {report.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="row p-4 justify-content-end">
              <div className="col-md-2">
                <button
                  className="btn btn-success"
                  onClick={generatePDF}
                  style={{ width: "190px" }}
                >
                  <i class="bi bi-download mx-1"></i>
                  {"  "} Generate PDF
                </button>
              </div>
              <div className="col-md-2">
                <CSVLink
                  data={filteredReports}
                  filename="Vendors_Reports"
                  className="btn btn-success"
                  style={{ width: "190px" }}
                >
                  <i class="bi bi-download mx-1"></i>
                  {"  "} Generate Sheet
                </CSVLink>
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
    </div>
  );
}

export default AdminRetriveReports;
