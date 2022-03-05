import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-fixed-top">
    <div>
      <span className='text-dark demo'>Demo</span>
      {/* <a href={"#"} className="navigation">&#8249;</a> */}
      {/* <a href={"#"} className="navigation disabled">&#8250;</a> */}
      {/* <Link className="navbar-back" to="/">&#8249; Back to menu</Link> */}
    </div>
    <div>
      <h4 className='text-light navbar-text'>Easy Labelling Assistant</h4>
    </div>
    <div className='nav-txt'>
      {/* <span className='text-dark demo'>eluwina</span> */}
      <span className='text-light demo'>Demo</span>
    </div>
  </nav>
    
  );
}

export default NavBar;
