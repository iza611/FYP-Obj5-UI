import flow1 from "./../images/flow1.png";
import flow2 from "./../images/flow2.png";
import { Link } from "react-router-dom";

const margin = "20px";

function About() {
    return (
      <div>
        <div style={{paddingTop:margin}}>
          <div className="a-la-button">This Application provides solution to decrease amount of 
            time spent on labelling camera Trap images.</div>
        </div>
        <div className="a-la-button" style={{marginTop:margin}}>With this application you can very easily train your own 
          AI to make predictions of animals captured on Camera Trap 
          Images.</div>
        <div className="a-la-button" style={{marginTop:margin}}>Thanks to applying so called Active Learning you need to 
          label much less images to train the model. The flow goes as 
          follows:</div>
        <img width="577px" alt="icon" src={flow1} />
        <div className="a-la-button" style={{marginTop:margin}}>Then you can use the trained model to make predictions. 
          Model can be also further improved by labelling more images. 
          </div>
        <div className="a-la-button" style={{marginTop:margin}}>In this demo version testing flow is implemented:</div>
        <img width="577px" alt="icon" src={flow2} />
        <div className="a-la-button" style={{marginTop:margin}}>This flow produces model performance results, such as 
          accuracy after each round or confusion matrix.</div>
        <div style={{marginTop:margin}}>
          <Link className="button-link" to="/">Back</Link>
        </div>
      </div>
    );
  }
  
  export default About;