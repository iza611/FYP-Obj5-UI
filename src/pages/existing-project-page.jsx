import React, { Component } from "react";
import { Link } from "react-router-dom";
import wip from "./../animals/work-in-progress.png"

class ExistingProjectPage extends Component  {
  state = {
    imgDir: "",
    lblDir: ""
  }

  render() { 
    return (
      <>
        <div>
        load existing project
        </div>

        <div className="button-div">
          <form onSubmit={this.handleSubmitImg}>
          {/* <form> */}
            <label>
              Project directory: {" "}
              <input type="text" onChange={this.handleChangeImg}/>
            </label>
            <input className="button" type="submit" value="Submit" />
          </form>
         </div>

         <p>{this.state.imgDir}</p>

        <div className="button-div">
          <Link className="button-link disabled" to="/loading">next</Link>
        </div>

        <img width={"200px"} src={wip} alt="wip"/>
        <div>
        <a href="https://www.flaticon.com/free-icons/work-in-progress" title="work in progress icons">Work in progress icons created by Freepik - Flaticon</a>
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

export default ExistingProjectPage;