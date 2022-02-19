import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import './../animations/loading.css';

class LoadingPage extends Component {
  state = { 
    loading: true,
    imgDir: "",
    lblDir: "",
    species: ["dog", "cat"]
   } 

  render() { 
    return (
      <>
      <div>
          {/* <span className="a-la-button loading-child">{text()}</span> */}
          {this.content()}
      </div>
      </>
    );
  }

  componentDidMount = () => {
    const bodyText = this.stateToJson();

    fetch('http://localhost:8000/start-training', {
      method: 'POST',
      body: bodyText
    })
    .then(res => res.text())
    .then((data) => {
      console.log('Success', data);
      this.setState({loading:false});
    })
    .catch((error) => {
      console.log(error);
    });
  }

  stateToJson = () => {
    const imgDirJson = "\"" + this.state.imgDir + "\"";
    const lblDirJson = "\"" + this.state.lblDir + "\"";
    const species = this.state.species;

    let speciesJson = species.map((specie) => "\"" + specie + "\"");
    speciesJson.slice(0, speciesJson.length); // remove last comma
    speciesJson = "[" + speciesJson + "]";

    const json = "{" + 
    "\"imagesDirectory\":" + imgDirJson + "," +
    "\"labelsDirectory\":" + lblDirJson + "," +
    "\"species\":" + speciesJson +
    "}";

    return json;
  }

  content = () => {
    if(this.state.loading) {
      return (
        <div className="lds-roller loading-child">
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
        <Navigate to={"/" + this.props.nextPage.page} />
      );
    };
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