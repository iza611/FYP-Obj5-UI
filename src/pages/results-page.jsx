import React, { Component } from "react";

class Results extends Component {
  state = {}

  getImage = (metric) => {
    let link = ""

    switch (metric) {
      case "accuracy":
        link = "http://localhost:8000/accuracy.png";
        break;

      case "conf-matrix":
        link = "http://localhost:8000/conf_matrix.png";
        break;

      case "loss":
        link = "http://localhost:8000/loss.png"
        break;

      case "precision":
        link = "http://localhost:8000/precision.png"
        break;

      case "sensitivity":
        link = "http://localhost:8000/sensitivity.png"
        break;

      case "no-images":
        link = "http://localhost:8000/no_images.png"
        break;

      default:
        link = "https://cdn.pixabay.com/photo/2020/11/30/18/14/smpte-color-bars-5791787_1280.png"
        break;
    }

    return link;
  }

  getEmbeddingsError = () => {
    const link = "https://cdn.pixabay.com/photo/2020/11/30/18/14/smpte-color-bars-5791787_1280.png";
    return link;
  }

  render() {
    return (
      <>
        <div style={{ paddingTop: "10px" }}>
          <div className="a-la-button-dark" style={{ marginBottom: "30px" }}>
            Training completed!
          </div>
        </div>

        <div className="a-la-button-dark">
          Results:
        </div>

        <div className="container" style={{ marginTop: "10px" }}>
          <div className="row" >
            <div className="col-sm a-la-button">accuracy:</div>
            <div className="col-sm a-la-button">confusion matrix:</div>
          </div>
        </div>

        <div style={{ marginTop: "10px", display: "inline-flex" }}>
          <a href={this.getImage("accuracy")} target="_blank" rel="noreferrer" className="result-img">
            <img width="267px" alt="result" src={this.getImage("accuracy")} />
          </a>
          <div style={{ width: "17px" }} />
          <a href={this.getImage("conf-matrix")} target="_blank" rel="noreferrer" className="result-img">
            <img width="267px" alt="result" src={this.getImage("conf-matrix")} />
          </a>
        </div>

        <div className="container" style={{ marginTop: "10px" }}>
          <div className="row">
            <div className="col-sm a-la-button result-link">
              <a href={this.getImage("loss")} target="_blank" rel="noreferrer" className="result-link-text">loss &#8250;</a>
            </div>
            <div className="col-sm a-la-button result-link">
              <a href={this.getImage("precision")} target="_blank" rel="noreferrer" className="result-link-text">precision &#8250;</a>
            </div>
          </div>
        </div>

        <div className="container" style={{ marginTop: "10px" }}>
          <div className="row">
            <div className="col-sm a-la-button result-link">
              <a href={this.getImage("sensitivity")} target="_blank" rel="noreferrer" className="result-link-text">sensitivity &#8250;</a>
            </div>
            <div className="col-sm a-la-button result-link">
              <a href={this.getImage("no-images")} target="_blank" rel="noreferrer" className="result-link-text">no. images &#8250;</a>
            </div>
          </div>
        </div>

        <div className="container" style={{ marginTop: "10px" }}>
          <div className="row">
            <div className="col-sm a-la-button result-link">
              <a href={this.getEmbeddingsError()} target="_blank" rel="noreferrer" className="result-link-text-disabled">3D embeddings visualisation &#8250;</a>
            </div>
          </div>
        </div>

        <div className="a-la-button-dark" style={{ marginTop: "30px" }}>
          Now you can:
        </div>

        <div>
          <button className="button-link-disabled" style={{ margin: "10px" }}>Improve by labelling more images &#8250;</button>
        </div>

      </>
    );
  }
}

export default Results;