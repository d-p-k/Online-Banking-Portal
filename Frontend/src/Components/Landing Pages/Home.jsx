import React from "react";
import { NavLink } from "react-router-dom";
import "./Landing.css";
import home from "../img/home.jpg";

function Home() {
  return (
    <body className="bg-gradient-primary py-5">
      <section id="header" className="d-flex align-items-center">
        <div className="container-fluid ">
          <div className="row justify-content-center">
            <div className="col-10 mx-auto">
              <div className="row">
                <div className="col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex justify-content-center text-justify flex-column">
                  <h1>
                    Grow Your Business With <br />
                    <strong className="brand-name">Apex Banking</strong>
                  </h1>
                  <h3 className="my-3">
                    We are the team of talented professionals.
                  </h3>
                  <div className="mt-3">
                    <NavLink to="/service" className="btn-get-started">
                      Get Started
                    </NavLink>
                  </div>
                </div>
                <div className="col-lg-6 order-1 order-lg-2 header-img">
                  <img className="img rounded" src={home} alt="home img" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </body>
  );
}

export default Home;
