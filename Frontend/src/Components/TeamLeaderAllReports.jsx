import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../Utility/AuthProvider";

function TeamLeaderAllReports() {
  const tlRemarks = [
    "Please revise and resubmit",
    "Inaccurate or inconsistent data",
    "Inadequate analysis or lack of insights",
    "Insufficient supporting evidence",
    "Failure to meet specified requirements",
    "Missing critical information",
    "Inadequate or impractical recommendations",
    "Lack of clarity or coherence in the report",
    "Non-compliance with reporting standards",
    "Missed deadlines for report submission",
    "Failure to address specific requirements",
  ];

  const [loading, setLoading] = useState(false);
  const [rid, setRid] = useState(false);

  const [reports, setReports] = useState([]);
  const [reportIdForRejecting, setReportIdForRejecting] = useState(null);
  const [remarkForRejecting, setRemarkForRejecting] = useState("");

  const auth = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/login/teamleader/all-reports-submitted-to-me",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.jwt}`,
          },
        }
      );
      console.log(response.data);
      setReports(response.data);
    } catch (error) {
      console.error(error);
      console.log("error has occured");
    }
  };

  const fetchPendingData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/login/teamleader/pending-reports-submitted-to-me",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.jwt}`,
          },
        }
      );
      console.log(response.data);
      setReports(response.data);
    } catch (error) {
      console.error(error);
      console.log("error has occured");
    }
  };

  const fetchApprovedData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/login/teamleader/approved-reports-submitted-to-me",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.jwt}`,
          },
        }
      );
      console.log(response.data);
      setReports(response.data);
    } catch (error) {
      console.error(error);
      console.log("error has occured");
    }
  };

  const fetchRejectedData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/login/teamleader/rejected-reports-submitted-to-me",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.jwt}`,
          },
        }
      );
      console.log(response.data);
      setReports(response.data);
    } catch (error) {
      console.error(error);
      console.log("error has occured");
    }
  };

  const approveReport = async (reportid) => {
    setLoading(true);
    const values = { reportid: reportid };
    const payload = JSON.stringify(values);
    console.log(payload);
    try {
      const response = await axios.put(
        "http://localhost:9090/login/teamleader/approve-report",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.jwt}`,
          },
        }
      );
      console.log(response.data);
      toast.success(response.data);
      setLoading(false);
      fetchPendingData();
    } catch (error) {
      console.error(error);
      console.log("error has occured");
    }
  };

  const rejectReport = async () => {
    setLoading(true);
    const values = {
      reportid: reportIdForRejecting,
      remark: remarkForRejecting,
    };
    const payload = JSON.stringify(values);
    console.log(payload);
    try {
      const response = await axios.put(
        "http://localhost:9090/login/teamleader/reject-report",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.jwt}`,
          },
        }
      );
      console.log(response.data);
      toast.success(response.data);
      setLoading(false);
      // setRemarkForRejecting("Please revise and resubmit");
      fetchPendingData();
    } catch (error) {
      console.error(error);
      console.log("error has occured");
    }
  };

  const handleLogout = () => {
    auth.logout();
    nav("/teamleader-login");
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
            to="/teamleader-dashboard"
          >
            <div className="sidebar-brand-text mx-3">Teamleader</div>
          </Link>

          <hr className="sidebar-divider my-0 bg-white" />

          <li className="nav-item active">
            <Link className="nav-link" to="/teamleader-dashboard">
              <i className="fas fa-fw fa-tachometer-alt"></i>{" "}
              <span>Dashboard</span>
            </Link>
          </li>

          <hr className="sidebar-divider p-0 bg-white" />

          <div className="sidebar-heading">Interfaces</div>

          <li className="nav-item">
            <Link className="nav-link" to="/teamleader-all-reports">
              <i className="fas fa-fw fa-table"></i>{" "}
              <span>Productivity Review</span>
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
              <i className="fas fa-fw fa-sign-out-alt"></i> <span>Logout</span>
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
                <div className="col-md-3">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={fetchAllData}
                    style={{ width: "190px" }}
                  >
                    All
                  </button>
                </div>
                <div className="col-md-3">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={fetchPendingData}
                    style={{ width: "190px" }}
                  >
                    Pending
                  </button>
                </div>
                <div className="col-md-3">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={fetchApprovedData}
                    style={{ width: "190px" }}
                  >
                    Approved
                  </button>
                </div>
                <div className="col-md-3">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={fetchRejectedData}
                    style={{ width: "190px" }}
                  >
                    Rejected
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
                        <th scope="col">Report ID</th>
                        <th scope="col">TP ID</th>
                        <th scope="col">Name</th>
                        <th scope="col" className="px-5">
                          Date
                        </th>
                        <th scope="col" style={{ width: "300px" }}>
                          Task Description
                        </th>
                        <th scope="col">Duration</th>
                        <th scope="col">Remark</th>
                        <th scope="col">Status</th>
                        <th scope="col">Approve</th>
                        <th scope="col">Reject</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {reports.map((report, index) => (
                        <tr>
                          <td>{report.reportid}</td>
                          <td>{report.tpid}</td>
                          <td>{report.username}</td>
                          <td>{report.date}</td>
                          <td>{report.taskdescription}</td>
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
                          <td>
                            <button
                              type="submit"
                              class="btn btn-success"
                              style={{ width: "130px" }}
                              onClick={() => approveReport(report.reportid)}
                              disabled={report.status !== "PENDING"}
                            >
                              {loading && rid === report.reportid && (
                                <i className="fa fa-spin">
                                  <i className="bi bi-arrow-clockwise fs-6" />
                                </i>
                              )}{" "}
                              {loading && rid === report.reportid
                                ? "Approving..."
                                : "Approve"}
                            </button>
                          </td>
                          <td>
                            <button
                              type="submit"
                              class="btn btn-danger"
                              style={{ width: "130px" }}
                              onClick={() =>
                                setReportIdForRejecting(report.reportid)
                              }
                              disabled={report.status !== "PENDING"}
                              data-toggle="modal"
                              data-target="#closeReportModal"
                            >
                              {loading && rid === report.reportid && (
                                <i className="fa fa-spin">
                                  <i className="bi bi-arrow-clockwise fs-6" />
                                </i>
                              )}{" "}
                              {loading && rid === report.reportid
                                ? "Rejecting..."
                                : "Reject"}
                            </button>
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
        id="closeReportModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Give remark/reason for rejecting
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
            <form>
              <div className="modal-body text-left">
                <select
                  className="form-control"
                  style={{ height: "50px" }}
                  onChange={(e) => setRemarkForRejecting(e.target.value)}
                >
                  {tlRemarks.map((tlRemark) => (
                    <option value={tlRemark}>{tlRemark}</option>
                  ))}
                </select>
              </div>
              <div class="modal-footer">
                <button
                  class="btn btn-primary"
                  type="submit"
                  data-dismiss="modal"
                  onClick={() => rejectReport()}
                >
                  Submit
                </button>
              </div>
            </form>
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

export default TeamLeaderAllReports;
