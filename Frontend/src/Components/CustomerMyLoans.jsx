import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Utility/AuthProvider";
import axios from "axios";

function CustomerMyLoans() {
  const [loans, setLoans] = useState([]);
  const auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9090/loan/customer/loan/my-loans",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.jwt}`,
            },
          }
        );
        console.log(response.data);
        setLoans(response.data);
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
            <Link className="nav-link" to="/customer-my-loans">
              <i className="fas fa-fw fa-chart-area"></i> <span>My Loans</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/customer-apply-loan">
              <i className="fas fa-fw fa-chart-area"></i>{" "}
              <span>Apply For Loan</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/customer-loan-payment">
              <i className="fas fa-fw fa-lock"></i> <span>Loan Payment</span>
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
              <p className="display-6 pb-1">My Loans</p>
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
                      <th scope="col">Loan Type</th>
                      <th scope="col">Loan Amount</th>
                      <th scope="col">EMI/Month</th>
                      <th scope="col">Start Date</th>
                      <th scope="col">End Date</th>
                      <th scope="col">Duration</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {loans.map((loan, index) => (
                      <tr>
                        <td>{loan.loantype}</td>
                        <td>
                          <i class="bi bi-currency-rupee"></i>
                          {loan.loanamount}
                        </td>
                        <td>
                          <i class="bi bi-currency-rupee"></i>
                          {loan.monthlyemi}
                        </td>
                        <td>{loan.statedate}</td>
                        <td>{loan.enddate}</td>
                        <td>{loan.duration} Months</td>
                        <td>{loan.status}</td>
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

export default CustomerMyLoans;
