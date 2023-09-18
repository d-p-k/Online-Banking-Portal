import React from "react";
import { NavLink } from "react-router-dom";
import "./Landing.css";
import about from "../img/about.jpg";

function About() {
  return (
    <body className="bg-gradient-primary py-5">
      <section id="header" className="d-flex align-items-center">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-10 mx-auto">
              <div className="row">
                <div className="col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex text-justify flex-column">
                  <h1>
                    About
                    <br />
                    <strong className="brand-name">Apex Banking</strong>
                  </h1>
                  <h6 className="my-3 text-light">
                    Welcome to our banking website! We are dedicated to
                    providing you with exceptional financial services and a
                    seamless online banking experience. Our website serves as a
                    comprehensive platform where you can conveniently manage
                    your accounts, access a wide range of banking services, and
                    stay informed about the latest financial updates.
                    <br />
                    <br />
                    At our core, we prioritize your financial well-being and aim
                    to empower you to make informed decisions about your money.
                    Whether you are an individual, a small business owner, or a
                    corporate entity, we have tailored solutions to meet your
                    unique needs.
                  </h6>
                  <div className="mt-3">
                    <NavLink to="/contact" className="btn-get-started">
                      Contact Now
                    </NavLink>
                  </div>
                </div>
                <div className="col-lg-6 order-1 order-lg-2 header-img">
                  <img className="img rounded" src={about} alt="about img" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </body>
  );
}

export default About;
