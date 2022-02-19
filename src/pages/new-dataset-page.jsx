import React, { Component } from "react";
import { Link } from "react-router-dom";
import DropzoneComponent from './dropzone';
import SpeciesAdding from "./species-adding";

class NewDatasetPage extends Component  {
  state = {
    imgDir: "",
    lblDir: "",
    species: ["dog", "cat"],
    speciesError: ""
  }

  render() { 
    return (
      <>
        <div style={{paddingTop:"10px"}}>
          <div className="a-la-button-dark">Load a new dataset and start labelling. After labelling 30% images ELA will learn how to regognise animals and label the remaining images for you! You can then check the results, further improve the accuracy, download labelled images or save the model for future labelling.</div>
        </div>
        <div style={{border:"1px black solid", marginTop:"10px"}}></div>

        <p></p>
        <div className="a-la-button">Please upload a <span style={{textDecoration: "underline"}}>folder</span> with images to be labelled:</div>
        <p></p>
        <DropzoneComponent acceptedType={ "FOLDER" } setDir={(dir) => this.setFolderDir(dir)} />
        {/* <span>{ this.state.imgDir }</span> */}
        <p></p>
        <div className="a-la-button">Please upload a <span style={{textDecoration: "underline"}}>file</span> with labels for testing and evaluating model: (this will be optional in a non-demo verisons)</div>
        <p></p>
        <DropzoneComponent acceptedType={ "FILE" } setDir={(dir) => this.setFileDir(dir)}/>
        {/* <span>{ this.state.lblDir }</span> */}
        <p></p>
        <div className="a-la-button">Specify what species are in the database:</div>
        <p></p>
        <SpeciesAdding species={this.state.species} 
                       speciesError={this.state.speciesError} 
                       onFormSubmit={this.addNewSpecie} 
                       onLabelClicked={(s) => this.removeSpecie(s)} />

        <div className="button-div">
          <Link onClick={this.handleClick} className={this.activateWhenFilled()} to="/loading">next</Link>
        </div>
      </>
    );
  }

  setFolderDir = (dir) => {
    this.setState({imgDir:dir})
  }

  setFileDir = (dir) => {
    this.setState({lblDir:dir})
  }

  addNewSpecie = (event) => {
    const newSpecie = event.target[0].value;
    let speciesCopy = this.state.species.map((specie) => specie);
    if (speciesCopy.includes(newSpecie)) {
        this.setState({speciesError:"\"" + newSpecie + "\" is already added to the list"});
    }
    else{
        this.setState({speciesError:""})
        speciesCopy.push(newSpecie);
        this.setState({species: speciesCopy});
        const form = document.getElementById("species-form");
        form.reset();
    }
  }

  removeSpecie = (s) => {
      this.setState({species: this.state.species.filter((specie) => specie !== s)})
  }

  activateWhenFilled = () => {
    if(this.state.imgDir !== "" && this.state.lblDir !== "" && this.state.species.length !== 0){
      return "button-link"
    }
    else {
      return "button-link disabled"
    }
  }

  handleClick() {
    // contact with server
  }

}

export default NewDatasetPage;