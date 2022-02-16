import React from "react";

function NavBar() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-fixed-top">
    <div>
      <a href={"#"} className="navigation disabled">&#8249;</a>
      {/* <a href={"#"} className="navigation disabled">&#8250;</a> */}
    </div>
    <div>
      <h4 className='text-light navbar-text'>Easy Labelling Assistant</h4>
    </div>
    <div className='nav-txt'>
      <span className='text-light demo'>Demo</span>
    </div>
  </nav>
    
  );
}

export default NavBar;
