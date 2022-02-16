/* eslint-disable react/no-unescaped-entities */
import React from 'react';

function LicenseText() {
    return (
    <div className="license-text">
      <span className="text-dark">Image: </span>
      <a
        href="https://www.vecteezy.com/free-vector/animal-svg"
        className="link-dark"
        target="_blank"
        rel="noreferrer noopener"
      >
        "Fox silhouette" by Nouri Atchabao
      </a>
      <span className="text-dark">
        , Licensed under Vecteezy License Agreement, Converted to .svg
      </span>
    </div>
  );
};

export default LicenseText;