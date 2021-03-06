/* eslint-disable no-useless-concat */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import DropzoneComponent from './dropzone';
import SpeciesAdding from "./species-adding";

class NewDatasetPage extends Component {
  state = {
    imgDir: "",
    lblDir: "",
    species: [],
    speciesError: ""
  }

  render() {
    return (
      <>
        <div style={{ paddingTop: "10px" }}>
          <div className="a-la-button-dark">Load a new dataset and start labelling. After labelling 30% images ELA will learn how to regognise animals and label the remaining images </div>
        </div>
        {/* <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Dropdown Button
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}
        <div>
          <input id="no-rounds"
            className='species-input'
            style={{ width: "100px", border: "1px darkgoldenrod solid" }}
            placeholder="no. rounds"></input>
          <input id="no-queries"
            className='species-input'
            style={{ width: "100px", border: "1px darkgoldenrod solid" }}
            placeholder="no. queries"></input>

        </div>
        <div style={{ border: "1px black solid", marginTop: "10px" }}></div>

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
        {/* <span>{ this.state.imgDir }</span> */}
        <p></p>
        <div className="a-la-button">Please upload a <span style={{ textDecoration: "underline" }}>file</span> with labels for testing and evaluating model: (this will be optional in a non-demo verisons)</div>
        <p></p>
        <DropzoneComponent acceptedType={"FILE"} setDir={(dir) => this.setFileDir(dir)} />
        
        {/* <span>{ this.state.lblDir }</span> */}
        {/* <p></p>
        <div className="a-la-button">Specify what species are in the database:</div>
        <p></p>
        <SpeciesAdding species={this.state.species}
          speciesError={this.state.speciesError}
          onFormSubmit={this.addNewSpecie}
          onLabelClicked={(s) => this.removeSpecie(s)} /> */}

        <div className="button-div">
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

  // addNewSpecie = (event) => {
  //   event.preventDefault();
  //   const newSpecie = event.target[0].value;
  //   let speciesCopy = this.state.species.map((specie) => specie);
  //   if (speciesCopy.includes(newSpecie)) {
  //     this.setState({ speciesError: "\"" + newSpecie + "\" is already added to the list" });
  //   }
  //   else {
  //     this.setState({ speciesError: "" })
  //     speciesCopy.push(newSpecie);
  //     this.setState({ species: speciesCopy });
  //     const form = document.getElementById("species-form");
  //     form.reset();
  //   }
  // }

  // removeSpecie = (s) => {
  //   this.setState({ species: this.state.species.filter((specie) => specie !== s) })
  // }

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
          next
        </Link>
      );
    }
    else {
      return (
        <Link className="button-link-disabled"
          to={"/new"}>
          next
        </Link>
      );
    };
  }
}

export default NewDatasetPage;