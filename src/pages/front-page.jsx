import React from "react";
import { Link } from "react-router-dom";
import fox from "./../animals/fox-silhouette.svg";
import "./front-page.css"
import LicenseText from './photo-license';

function FrontPage() {
  return (
      <React.Fragment>
          <img className="img" width="400px" alt="icon" src={fox} />
          {/* <h1 className="text-light txt">Easy Labelling Assistant</h1> */}
          <div className="button-div">
                <Link className="button-link" to="/new">Load new dataset</Link>
          </div>
          <div className="button-div">
                <Link className="button-link" to="/existing">Open existing project</Link>
          </div>
          <div className="button-div">
                <Link className="button-link" to="/about">About</Link>
          </div>
          <div>
              <LicenseText />
          </div>
      </React.Fragment>
    
  );
}

export default FrontPage;
