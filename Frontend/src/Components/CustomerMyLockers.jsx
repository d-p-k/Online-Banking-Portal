import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Utility/AuthProvider";
import axios from "axios";

function CustomerMyLockers() {
  const [lockers, setLockers] = useState([]);
  const auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9090/locker/customer/locker/my-lockers",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.jwt}`,
            },
          }
        );
        console.log(response.data);
        setLockers(response.data);
      } catch (error) {
        console.error(error);
        console.log("error has occured");
      }
    };

    fetchData();
  }, []);

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
            <Link className="nav-link" to="/customer-my-lockers">
              <i class="bi bi-database-lock"></i> <span>My Lockers</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/customer-apply-for-locker">
              <i class="bi bi-file-lock"></i> <span>Apply For Locker</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/customer-locker-payment">
              <i class="bi bi-building-lock"></i> <span>Locker Payment</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/customer-close-locker">
              <i class="bi bi-file-lock-fill"></i> <span>Close Locker</span>
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
              <p className="display-6 pb-1">My Lockers</p>
              <div
                style={{
                  maxHeight: "500px",
                  overflowY: "auto",
                }}
              >
                <table className="table table-bordered shadow p-3 mb-5 bg-body-tertiary rounded">
                  <thead
                    className="table-secondary"
                    style={{
                      position: "sticky",
                      zIndex: "1",
                      top: "0",
                    }}
                  >
                    <tr>
                      <th scope="col">Locker Type</th>
                      <th scope="col">Loan Location</th>
                      <th scope="col">Locker Size</th>
                      <th scope="col">Locker Price</th>
                      <th scope="col">Locker Status</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {lockers.map((locker, index) => (
                      <tr>
                        <td>{locker.lockertype}</td>
                        <td>{locker.lockerlocation}</td>
                        <td>{locker.lockersize}</td>
                        <td>
                          <i class="bi bi-currency-rupee"></i>
                          {locker.lockerprice}
                        </td>
                        <td>{locker.lockerstatus}</td>
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
    </div>
  );
}

export default CustomerMyLockers;
