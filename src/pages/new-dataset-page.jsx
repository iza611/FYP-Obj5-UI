import React, { Component } from "react";
import { Link } from "react-router-dom";

class NewDatasetPage extends Component  {
  state = {
    imgDir: "",
    lblDir: ""
  }

  render() { 
    return (
      <>
        <div>
        load new dataset
        </div>

        <div className="button-div">
          <form onSubmit={this.handleSubmitImg}>
          {/* <form> */}
            <label>
              Images directory: {" "}
              <input type="text" onChange={this.handleChangeImg}/>
            </label>
            <input className="button" type="submit" value="Submit" />
          </form>
         </div>

         <p>{this.state.imgDir}</p>

         <div className="button-div">
          <form onSubmit={this.handleSubmitLbl}>
          {/* <form> */}
            <label>
              Labels directory: {" "}
              <input type="text" onChange={this.handleChangeLbl}/>
            </label>
            <input className="button" type="submit" value="Submit" />
          </form>
         </div>

         <p>{this.state.lblDir}</p>

        <div className="button-div">
          <Link className="button-link" to="/loading">next</Link>
        </div>
      </>
    );
  }

  handleChangeImg = (event) => {
    const whatisthis = event.target.value
    console.log(whatisthis)
    this.setState({imgDir:whatisthis})
  }

  handleSubmitImg = (event) => {
    console.log(this.state.imgDir)
    console.log("submitted directory, sent to node?")
  }

  handleChangeLbl = (event) => {
    const whatisthis = event.target.value
    console.log(whatisthis)
    this.setState({lblDir:whatisthis})
  }

  handleSubmitLbl = (event) => {
    console.log(this.state.lblDir)
    console.log("submitted directory, sent to node?")
  }

}

export default NewDatasetPage;