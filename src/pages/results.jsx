import React from "react";
import confMatrix from "./../animals/results/conf_matrix.png";
import acc from "./../animals/results/accuracy.png";

function Results() {
  return (
    <>
      <div style={{paddingTop:"10px"}}>
          <div className="a-la-button-dark" style={{marginBottom:"30px"}}>
            Training completed!
          </div>
      </div>

      {/* <div style={{border:"1px black solid", marginBottom:"10px"}}></div> */}

      <div className="a-la-button-dark">
            Results:
      </div>

      <div className="container" style={{marginTop:"10px"}}>
        <div className="row" >
          {/* <div className="col-sm a-la-button" style={{backgroundColor:"rgb(180, 180, 180)"}}>accuracy:</div> */}
          {/* <div className="col-sm a-la-button" style={{backgroundColor:"rgb(180, 180, 180)"}}>confusion matrix:</div> */}
          <div className="col-sm a-la-button">accuracy:</div>
          <div className="col-sm a-la-button">confusion matrix:</div>
        </div>
      </div>

      <div style={{marginTop:"10px", display:"inline-flex"}}>
        <a href="https://picsum.photos/1000/600" target="_blank" rel="noreferrer" className="result-img">
          <img width="267px" alt="result" src={acc}/>
        </a>
        <div style={{width:"17px"}} />
        <a href="https://picsum.photos/1000/600" target="_blank" rel="noreferrer" className="result-img">
          <img width="267px" alt="result" src={confMatrix}/>
        </a>
      </div>

      <div className="container" style={{marginTop:"10px"}}>
        <div className="row">
          <div className="col-sm a-la-button result-link">
            <a href="https://picsum.photos/1000/600" target="_blank" rel="noreferrer" className="result-link-text">loss &#8250;</a>
          </div>
          <div className="col-sm a-la-button result-link">
            <a href="https://picsum.photos/1000/600" target="_blank" rel="noreferrer" className="result-link-text">precision &#8250;</a>
          </div>
        </div>
      </div>

      <div className="container" style={{marginTop:"10px"}}>
        <div className="row">
          <div className="col-sm a-la-button result-link">
            <a href="https://picsum.photos/600/600" target="_blank" rel="noreferrer" className="result-link-text">sensitivity &#8250;</a>
          </div>
          <div className="col-sm a-la-button result-link">
            <a href="https://picsum.photos/600/600" target="_blank" rel="noreferrer" className="result-link-text">no. images &#8250;</a>
          </div>
        </div>
      </div>

      <div className="container" style={{marginTop:"10px"}}>
        <div className="row">
          <div className="col-sm a-la-button result-link">
            <a href="https://picsum.photos/600/600" target="_blank" rel="noreferrer" className="result-link-text">3D embeddings visualisation &#8250;</a>
          </div>
        </div>
      </div>

      {/* <div style={{border:"1px black solid", marginTop:"10px"}}></div> */}
      
      <div className="a-la-button-dark" style={{marginTop:"30px"}}>
            Now you can:
      </div>

      <div>
        <button className="button-link">Download the trained model</button>
        <button className="button-link" style={{margin:"10px"}}>Download labelled images</button>
      </div>

      <div>
        <button className="button-link">Label more images {"&"} improve model</button>
      </div>

    </>
  );
}

export default Results;