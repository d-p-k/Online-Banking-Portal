import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Utility/AuthProvider";
import axios from "axios";
import "./AllCss.css";
import { ToastContainer, toast } from "react-toastify";

function EmployeeAllCustomers() {
  const [loading, setLoading] = useState(false);

  const [userid, setUserId] = useState(null);
  const [customers, setCustomers] = useState([]);

  const [formData, setFormData] = useState({
    userid: "",
    username: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleEdit = (customer) => {
    setFormData({
      userid: customer.id,
      username: customer.username,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
    });
  };

  const auth = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    auth.logout();
    nav("/employee-login");
    console.log("logout clicked");
  };

  useEffect(() => {
    fetchAllCustomers();
  }, []);

  const fetchAllCustomers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/login/employee/all-customers",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.jwt}`,
          },
        }
      );
      console.log(response.data);
      setCustomers(response.data);
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
        fetchAllCustomers();
      })
      .catch((res) => console.log(res));
  };

  const deleteCustomer = (userid) => {
    setLoading(true);
    const values = { userid: userid };
    const payload = JSON.stringify(values);
    console.log(payload);
    axios
      .put("http://localhost:9090/login/employee/delete-customer", payload, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.jwt}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        fetchAllCustomers();
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
            to="/employee-dashboard"
          >
            <div className="sidebar-brand-text mx-3">Employee</div>
          </Link>

          <hr className="sidebar-divider my-0 bg-white" />

          <li className="nav-item active">
            <Link className="nav-link" to="/employee-dashboard">
              <i className="fas fa-fw fa-tachometer-alt"></i>{" "}
              <span>Dashboard</span>
            </Link>
          </li>

          <hr className="sidebar-divider p-0 bg-white" />

          <div className="sidebar-heading">Interfaces</div>

          <li className="nav-item">
            <Link className="nav-link" to="/employee-all-accounts">
              <i className="fas fa-fw fa-chart-area"></i> <span>Accounts</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/employee-all-customers">
              <i className="fas fa-fw fa-chart-area"></i> <span>Customers</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/employee-show-all-transactions">
              <i className="fas fa-fw fa-lock"></i> <span>Transactions</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/employee-all-loans">
              <i className="fas fa-fw fa-chart-area"></i> <span>Loans</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/employee-all-lockers">
              <i className="fas fa-fw fa-table"></i> <span>Lockers</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/employee-all-credit-cards">
              <i className="fas fa-fw fa-table"></i> <span>Credit Cards</span>
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
              <p className="display-6 pb-1">All Customers</p>

              <div
                style={{
                  maxHeight: "500px",
                  overflowY: "auto",
                }}
              >
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
                    {customers.map((customer, index) => (
                      <tr>
                        <td>{customer.id}</td>
                        <td>{customer.username}</td>
                        <td>{customer.email}</td>
                        <td>{customer.phone}</td>
                        <td>{customer.address}</td>
                        <td>
                          <button
                            type="submit"
                            class="btn btn-success"
                            style={{ width: "130px" }}
                            onClick={() => handleEdit(customer)}
                            data-toggle="modal"
                            data-target="#editCustomerModal"
                          >
                            Edit
                          </button>
                        </td>
                        <td>
                          <button
                            type="submit"
                            class="btn btn-danger"
                            style={{ width: "130px" }}
                            onClick={() => setUserId(customer.id)}
                            data-toggle="modal"
                            data-target="#deleteCustomerModal"
                          >
                            {loading && userid === customer.id && (
                              <i className="fa fa-spin">
                                <i className="bi bi-arrow-clockwise fs-6" />
                              </i>
                            )}{" "}
                            {loading && userid === customer.id
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
        id="editCustomerModal"
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
        id="deleteCustomerModal"
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
              Select "Yes" below if you want to delete this customer.
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
                onClick={() => deleteCustomer(userid)}
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

export default EmployeeAllCustomers;
