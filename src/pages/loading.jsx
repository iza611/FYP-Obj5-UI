import React from "react";
import { Link } from "react-router-dom";

function LoadingPage() {
  return (
    <>
      <div>
          loading
      </div>

      <div className="button-div">
          <Link className="button-link" to="/results">next</Link>
        </div>
    </>
  );
}

export default LoadingPage;