import React, { Component } from "react";
import { Link } from "react-router-dom";
import './../animations/loading.css';

class LoadingPage extends Component {
  state = { 
    loading: true
   } 
  render() { 
    return (
      <>
      <div>
          <label class="switch">
            <input type="checkbox" onChange={this.handleCheckbox}/>
          </label>
          {/* <span className="a-la-button loading-child">{text()}</span> */}
          {this.content()}
          
      </div>
      </>
    );
  }

  handleCheckbox = () => {
    this.setState({loading: !this.state.loading})
  }

  content = () => {
    if (this.state.loading) {
      return (
        <div class="lds-roller loading-child">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        );
    }
    else {
      return (
        <div className="loading-child">
            <Link className="button-link" to="/activelearning">next</Link>
        </div>
      );
    }
  }
}
 
export default LoadingPage;

// function text() {
//   if (loading) {
//     return ("Please wait, Ela is loading your data and preparing for learning...");
//   }
//   else {
//     return ("Loading completed!");
//   }
// }