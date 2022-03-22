/* eslint-disable no-useless-concat */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import DropzoneComponent from '../components/dropzone';
import SpeciesAdding from "../components/species-adding";

class StartTrainingPage extends Component {
  state = {
    imgDir: "",
    lblDir: "",
    species: ["Cat", "Dog"],
    speciesError: ""
  }

  render() {
    return (
      <>
        <div style={{ paddingTop: "10px" }}>
          <div className="a-la-button">Specify number of labelling rounds and number of queries in each round:</div>
        </div>

        <div style={{marginTop:"10px"}}>
          <input id="no-rounds"
            className='species-input'
            style={{ width: "100px", border: "1px darkgoldenrod solid" }}
            placeholder="no. rounds"></input>
          <input id="no-queries"
            className='species-input'
            style={{ width: "100px", border: "1px darkgoldenrod solid" }}
            placeholder="no. queries"></input>
        </div>

        <p></p>
        <div className="a-la-button">Please specify a <span style={{ textDecoration: "underline" }}>folder directory</span> where results can be saved:</div>
        <p></p>

        <div>
          <input id="directory"
            className='species-input'
            style={{ width: "500px", border: "1px darkgoldenrod solid" }}
            placeholder="/directory/to/folder/where/results/can/be/saved"></input>
        </div>

        <p></p>
        <div className="a-la-button">Please upload a <span style={{ textDecoration: "underline" }}>folder</span> with images to be labelled:</div>
        <p></p>

        <DropzoneComponent acceptedType={"FOLDER"} setDir={(dir) => this.setFolderDir(dir)} />

        <p></p>
        <div className="a-la-button">(Optional) Please upload a <span style={{ textDecoration: "underline" }}>file</span> with labels in <a href="https://github.com/Microsoft/CameraTraps/blob/main/data_management/README.md#coco-cameratraps-format" target="_blank" rel="noreferrer">COCO Camera Traps format</a> for testing and evaluating model: </div>
        <p></p>
        
        <DropzoneComponent acceptedType={"FILE"} setDir={(dir) => this.setFileDir(dir)} />
        
        {this.showSpecies()}

        <div className="button-div" style={{marginTop: "20px"}}>
          <Link className="button-link" to="/" style={{marginRight:"20px"}}>Back</Link>
          {this.activateWhenFilled()}
        </div>
      </>
    );
  }

  setFolderDir = (dir) => {
    const dirConverted = dir.replace(/\//g, "QcJkC").replace(/ /g, "HK3JE");
    console.log(dirConverted);
    this.setState({ imgDir: dirConverted })
  }

  setFileDir = (dir) => {
    const dirConverted = dir.replace(/\//g, "QcJkC").replace(/ /g, "HK3JE");
    console.log(dirConverted);
    this.setState({ lblDir: dirConverted })
  }

  showSpecies = () => {
    if(this.state.lblDir === "") {
      return (
        <div>
          <p></p>
          <div className="a-la-button">Specify what species are in the database:</div>
          <p></p>
          <SpeciesAdding species={this.state.species}
            speciesError={this.state.speciesError}
            onFormSubmit={this.addNewSpecie}
            onLabelClicked={(s) => this.removeSpecie(s)} />
        </div>
      )
    }
    else {
      return <div></div>
    }
  }

  addNewSpecie = (event) => {
    event.preventDefault();
    const newSpecie = event.target[0].value;
    let speciesCopy = this.state.species.map((specie) => specie);
    if (speciesCopy.includes(newSpecie)) {
      this.setState({ speciesError: "\"" + newSpecie + "\" is already added to the list" });
    }
    else {
      this.setState({ speciesError: "" })
      speciesCopy.push(newSpecie);
      this.setState({ species: speciesCopy });
      const form = document.getElementById("species-form");
      form.reset();
    }
  }

  removeSpecie = (s) => {
    this.setState({ species: this.state.species.filter((specie) => specie !== s) })
  }

  activateWhenFilled = () => {
    if (this.state.imgDir !== "" 
       && this.state.lblDir !== "" 
       && (this.state.species.length !== 0 || document.getElementById("directory").value !== "")
       && document.getElementById("no-queries").value !== "" 
       && document.getElementById("no-rounds").value !== "") {

        const dir = document.getElementById("directory").value;
        const dirConverted = dir.replace(/\//g, "QcJkC").replace(/ /g, "HK3JE").replace(/\\/g, "");

      return (
        <Link className="button-link"
          to={`/loading/activelearning/${this.state.imgDir}/${this.state.lblDir}/${dirConverted}/${document.getElementById("no-rounds").value}/${document.getElementById("no-queries").value}/1`}>
          Next
        </Link>
      );
    }
    else {
      return (
        <Link className="button-link-disabled"
          to={"/new"}>
          Next
        </Link>
      );
    };
  }
}

export default StartTrainingPage;