import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../Utility/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

function VendorMyReports() {
  const [startdate, setstartdate] = useState(null);
  const [enddate, setenddate] = useState(null);
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);

  const auth = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/login/vendor/my-reports",
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

  const fetchDataBetweenDates = () => {
    const filteredResults = reports.filter((row) => {
      return row.date >= startdate && row.date <= enddate;
    });
    setFilteredReports(filteredResults);
  };

  const handleLogout = () => {
    auth.logout();
    nav("/vendor-login");
    console.log("logout clicked");
  };

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
            <div style={{ padding: "13px" }}>
              <p className="display-6 pb-1">My Reports</p>
              <hr />

              <div className="row p-4">
                <div className="col-md-3">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={fetchData}
                    style={{ width: "190px" }}
                  >
                    All
                  </button>
                </div>
                <div className="col-md-3 ">
                  <div className="d-flex justify-content-center">
                    <h6 style={{ padding: "8px" }}>Start Date</h6>
                    <input
                      type="date"
                      id="startdate"
                      name="startdate"
                      className="form-control"
                      onChange={(e) => setstartdate(e.target.value)}
                      style={{ width: "190px" }}
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="d-flex justify-content-center">
                    <h6 style={{ padding: "8px" }}>End Date</h6>
                    <input
                      type="date"
                      id="enddate"
                      name="enddate"
                      className="form-control"
                      onChange={(e) => setenddate(e.target.value)}
                      style={{ width: "190px" }}
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={fetchDataBetweenDates}
                    style={{ width: "190px" }}
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
                <div style={{ width: "100%" }}>
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
                        <th scope="col" className="px-5">
                          Date
                        </th>
                        <th scope="col">Task Description</th>
                        <th scope="col">Assignee</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Remark</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {filteredReports.map((report, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{report.date}</td>
                          <td>{report.taskdescription}</td>
                          <td>{report.assignee}</td>
                          <td>{report.duration}</td>
                          <td>{report.remark}</td>
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

export default VendorMyReports;
