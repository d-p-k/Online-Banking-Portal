import React from "react";
import Card from "./Card";
import Sdata from "./Sdata";
import "./Landing.css";

function Service() {
  return (
    <body className="bg-gradient-primary py-5">
      <div className="mb-5">
        <h2 className="text-center text-light font-weight-bold">
          Our Services
        </h2>
      </div>
      <div className="container-fluid mb-5">
        <div className="row">
          <div className="col-10 mx-auto">
            <div className="row gy-4">
              {Sdata.map((val, ind) => {
                return (
                  <Card
                    key={ind}
                    imgsrc={val.imgsrc}
                    title={val.title}
                    description={val.description}
                    more={val.more}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default Service;
