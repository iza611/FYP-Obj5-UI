/* eslint-disable react/no-unescaped-entities */
import React from 'react';

function LicenseText() {
    return (
    <div className="license-text">

      {/* <div> */}
        <span className="text-light font-weight-bold">Background image: </span>
        <a
          href="https://pixabay.com/photos/forest-trees-woods-nature-outdoors-1868028/"
          className="link-light"
          target="_blank"
          rel="noreferrer noopener"
        >
          Pixbay
        </a>
        <span className="text-light">
          , Licensed under Pixbay License; {" "}
        </span>
      {/* </div> */}

      {/* <div> */}
        <span className="text-light font-weight-bold">Icons: </span>
        <a
          href="https://www.vecteezy.com/free-vector/animal-svg"
          className="link-light"
          target="_blank"
          rel="noreferrer noopener"
        >
          "Fox silhouette" by Nouri Atchabao
        </a>
        <span className="text-light">
          , Licensed under Vecteezy License Agreement, Converted to .svg
        </span>
      {/* </div> */}

    </div>
    
  );
};

export default LicenseText;