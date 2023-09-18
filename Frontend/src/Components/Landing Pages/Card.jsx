import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Landing.css";

function Card(props) {
  let modalId;

  if (props.title === "Savings Account") modalId = "savings";
  else if (props.title === "Transaction Management") modalId = "transaction";
  else if (props.title === "Loan Management") modalId = "loan";
  else if (props.title === "Locker Management") modalId = "locker";
  else if (props.title === "Credit Card Management") modalId = "credit";
  else if (props.title === "Gift Card Management") modalId = "gift";

  return (
    <>
      <div className="col-md-4 col-10 mx-auto">
        <div className="card">
          <img src={props.imgsrc} className="card-img-top" alt="Invalid" />
          <div className="card-body">
            <h5 className="card-title font-weight-bold">{props.title}</h5>
            <p className="card-text">{props.description}</p>
            <NavLink
              className="btn btn-primary"
              data-toggle="modal"
              data-target={`#${modalId}`}
            >
              Know More
            </NavLink>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id={modalId}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog"
          style={{ maxWidth: "60%" }}
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {props.title}
              </h5>
              <button
                className="close"
                type="button"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body text-left">{props.more}</div>
            <div className="modal-footer">
              <Link className="btn btn-primary" data-dismiss="modal">
                Okay
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
