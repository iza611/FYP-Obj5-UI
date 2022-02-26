import React from "react";
import { Link } from "react-router-dom";
import fox from "./../animals/fox-silhouette.svg";
import "./front-page.css";

function FrontPage() {
      return (
            <React.Fragment>
                  <img className="img" width="400px" alt="icon" src={fox} />
                  {/* <h1 className="text-light txt">Easy Labelling Assistant</h1> */}
                  <div style={{ marginTop: "40px" }}>
                        <div className="button-div">
                              <Link className="button-link" to="/new">Train new model</Link>
                        </div>
                        <div className="button-div">
                              <Link className="button-link-disabled" to="/existing">Use existing model</Link>
                        </div>
                        <div className="button-div">
                              <Link className="button-link-disabled" to="/about">About</Link>
                        </div>
                  </div>
            </React.Fragment>

      );
}

export default FrontPage;
