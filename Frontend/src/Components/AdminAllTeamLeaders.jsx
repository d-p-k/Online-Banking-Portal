import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../Utility/AuthProvider";
import axios from "axios";
import "./AllCss.css";
import { ToastContainer, toast } from "react-toastify";

function AdminAllTeamLeaders() {
  const [loading, setLoading] = useState(false);

  const [userid, setUserId] = useState(null);
  const [teamleaders, setTeamleaders] = useState([]);

  const [formData, setFormData] = useState({
    userid: "",
    username: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleEdit = (employee) => {
    setFormData({
      userid: employee.id,
      username: employee.username,
      email: employee.email,
      phone: employee.phone,
      address: employee.address,
    });
  };

  const auth = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    auth.logout();
    nav("/admin-login");
    console.log("logout clicked");
  };

  useEffect(() => {
    fetchAllTeamleaders();
  }, []);

  const fetchAllTeamleaders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/login/admin/all-teamleaders",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.jwt}`,
          },
        }
      );
      console.log(response.data);
      setTeamleaders(response.data);
    } catch (error) {
      console.error(error);
      console.log("error has occured");
    }
  };

  const editProfile = () => {
    const payload = JSON.stringify(formData);
    console.log(payload);
    axios
      .put("http://localhost:9090/login/admin/edit-user", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.jwt}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.includes("successfully")) toast.success(res.data);
        else toast.error(res.data);
        fetchAllTeamleaders();
      })
      .catch((res) => console.log(res));
  };

  const deleteTeamleader = (userid) => {
    setLoading(true);
    const values = { userid: userid };
    const payload = JSON.stringify(values);
    console.log(payload);
    axios
      .put("http://localhost:9090/login/admin/delete-teamleader", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.jwt}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        fetchAllTeamleaders();
        toast.success(res.data);
        setLoading(false);
      })
      .catch((res) => console.log(res));
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
              <i className="fas fa-fw fa-users fs-6"></i>{" "}
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
              <p className="display-6 pb-1">All Team Leaders</p>

              <div style={{ maxHeight: "500px", overflowY: "auto" }}>
                <table className="table table-bordered shadow p-3 bg-body-tertiary rounded">
                  <thead
                    className="table-secondary"
                    style={{
                      position: "sticky",
                      zIndex: "1",
                      top: 0,
                    }}
                  >
                    <tr>
                      <th scope="col">S. No.</th>
                      <th scope="col">User ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Address</th>
                      <th scope="col">Edit</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamleaders.map((teamleader, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{teamleader.id}</td>
                        <td>{teamleader.username}</td>
                        <td>{teamleader.email}</td>
                        <td>{teamleader.phone}</td>
                        <td>{teamleader.address}</td>
                        <td>
                          <button
                            type="submit"
                            class="btn btn-success"
                            style={{ width: "130px" }}
                            onClick={() => handleEdit(teamleader)}
                            data-toggle="modal"
                            data-target="#editTeamLeaderModal"
                          >
                            Edit
                          </button>
                        </td>
                        <td>
                          <button
                            type="submit"
                            class="btn btn-danger"
                            style={{ width: "130px" }}
                            onClick={() => setUserId(teamleader.id)}
                            data-toggle="modal"
                            data-target="#deleteTeamleaderModal"
                          >
                            {loading && userid === teamleader.id && (
                              <i className="fa fa-spin">
                                <i className="bi bi-arrow-clockwise fs-6" />
                              </i>
                            )}{" "}
                            {loading && userid === teamleader.id
                              ? "Deleting...."
                              : "Delete"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* -------------Code Ends------------ */}
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="editTeamLeaderModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Edit Profile
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
              <div className="modal-body text-left">
                <label>Name</label>
                <input
                  className="form-control mb-3"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
                <label>Email</label>
                <input
                  className="form-control mb-3"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <label>Phone No</label>
                <input
                  className="form-control mb-3"
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
                <label>Address</label>
                <input
                  className="form-control mb-3"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>
              <div class="modal-footer">
                <button
                  class="btn btn-secondary"
                  type="button"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  class="btn btn-primary"
                  type="submit"
                  data-dismiss="modal"
                  onClick={() => editProfile()}
                >
                  Submit
                </button>
              </div>
            </div>
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

      <div
        class="modal fade"
        id="deleteTeamleaderModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Are you sure?
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
              Select "Yes" below if you want to delete this employee.
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-secondary"
                type="button"
                data-dismiss="modal"
              >
                No
              </button>
              <Link
                class="btn btn-primary"
                data-dismiss="modal"
                onClick={() => deleteTeamleader(userid)}
              >
                Yes
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AdminAllTeamLeaders;
