import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import './../animations/loading.css';

class LoadingPage extends Component {
  state = {
    loading: true,
    imgDir: this.props.params.imgDir.replace(/QcJkC/g, "/").replace(/HK3JE/g, " "),
    lblDir: this.props.params.lblDir.replace(/QcJkC/g, "/").replace(/HK3JE/g, " "),
    species: this.props.params.species.split(","),
    queries: this.props.params.queries
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
    // console.log(this.props.params);
    if (this.props.params.page === 'activelearning') {
      const bodyText = this.stateToJson();
      fetch('http://localhost:8000/start-training', {
        method: 'POST',
        body: bodyText
      })
        .then(res => res.text())
        .then((data) => {
          console.log('Success', data);
          this.setState({ loading: false });
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (this.props.params.page === 'results') {
      fetch('http://localhost:8000/finish-training')
        .then(res => res.text())
        .then((data) => {
          console.log('Success', data);
          this.setState({ loading: false });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  stateToJson = () => {
    const imgDirJson = "\"" + this.state.imgDir + "\"";
    const lblDirJson = "\"" + this.state.lblDir + "\"";
    const species = this.state.species;
    const queries = "\"" + this.state.queries + "\"";

    let speciesJson = species.map((specie) => "\"" + specie + "\"");
    speciesJson.slice(0, speciesJson.length); // remove last comma
    speciesJson = "[" + speciesJson + "]";

    const json = "{" +
      "\"imagesDirectory\":" + imgDirJson + "," +
      "\"labelsDirectory\":" + lblDirJson + "," +
      "\"species\":" + speciesJson + "," +
      "\"noQueries\":" + queries +
      "}";

    return json;
  }

  content = () => {
    if (this.state.loading) {
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
      if (this.props.params.page === 'activelearning') {
        return (
          <Navigate to={"/activelearning" + "/" + this.props.params.rounds + "/" + this.props.params.queries + "/" + this.props.params.round} />
        );
      }
      else {
        return (
          <Navigate to={"/results"} />
        );
      }
    };
  }
}

export default LoadingPage;