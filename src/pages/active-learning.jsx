import React, { Component } from 'react';
import { Link } from "react-router-dom";
import img from "../animals/ena24/6198.jpg";
import fox from "./../animals/fox-silhouette.svg";

class ActiveLearningPage extends Component {
    state = {  } 
    render() { 
        return (
            <>
                <img className="img" width="400px" alt="icon" src={fox}/>
                <div className="button-div loading-content">
                    <Link className="button-link" to="/results">next</Link>
                </div>
            </>
        );
    }
}
 
export default ActiveLearningPage;