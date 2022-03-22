import React from "react";
import { Link } from "react-router-dom";
import fox from "./../images/fox-silhouette.svg";

function FrontPage() {
      return (
            <React.Fragment>
                  <img className="img" width="400px" alt="icon" src={fox} />
                  {/* <h1 className="text-light txt">Easy Labelling Assistant</h1> */}
                  <div style={{ marginTop: "60px" }}>
                        <div className="button-div">
                              <Link className="button-link" to="/new">Start training</Link>
                        </div>
                        <div className="button-div" style={{ marginTop: "20px" }}>
                              <Link className="button-link-disabled" to="/existing">Use existing model</Link>
                        </div>
                        <div className="button-div" style={{ marginTop: "20px" }}>
                              <Link className="button-link" to="/about">About</Link>
                        </div>
                  </div>
            </React.Fragment>

      );
}

export default FrontPage;
