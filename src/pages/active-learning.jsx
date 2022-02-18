import React, { Component } from 'react';
import { Link } from "react-router-dom";
import img1 from "../animals/ena24/6198.jpg";
import img2 from "../animals/ena24/6283.jpg";
import img3 from "../animals/ena24/7004.jpg";
import img4 from "../animals/ena24/8150.jpg";
import img5 from "../animals/ena24/8869.jpg";
import img6 from "../animals/ena24/9229.jpg";

class ActiveLearningPage extends Component {
    state = { 
        noQueries: 6,
        currentQuery: 1,
        species: [[0, "dog"], [0, "cat"]],
        imgsMock: [img1, img2, img3, img4, img5, img6],
        currentImgMock: img1
     } 

    render() { 
        return (
            <>
                <div className='section1'>
                    <div style={{paddingTop:"10px"}}>
                        <span className='a-la-button'>
                            {this.state.currentQuery + " / " + this.state.noQueries}
                        </span>
                    </div>

                    <div style={{display:"inline-flex", marginTop:"10px"}}>
                        {this.renderChecks()}
                    </div>
                </div>

                <div style={{border:"1px black solid"}}></div>

                <div className='section2'>
                    <div>
                        <img height="300px" alt="icon" src={this.state.currentImgMock} style={{marginTop:"10px", border:"3px black solid"}}/>
                    </div>

                    <div style={{marginTop:"10px"}}>
                        <span className='a-la-button'>
                            identify specie/s on the image above:
                        </span>
                    </div>

                    <div style={{margin:"10px"}}>
                        {this.renderSpecies()}
                    </div>
                </div>

                <div style={{border:"1px black solid", marginTop:"10px"}}></div>

                <div className='section3'>
                    <div style={{margin:"10px"}}>
                        {this.renderSubmitButton()}
                    </div>
                </div>
            </>
        );
    }

    renderChecks = () => {
        const seq = Array(this.state.noQueries).fill().map((element, index) => index + 1);
        return (
            seq.map((idx) => {
                console.log(idx);
                if(idx<this.state.currentQuery) {
                    return <i className="gg-check-o" key={idx}></i>;
                }
                else {
                    return <i className="gg-shape-circle" key={idx}></i>;
                }
            })
        )
    }

    renderSpecies = () => {
        return(
            this.state.species.map((s) => 
            <span className={this.isClicked(s)} 
                  onClick={() => this.select(s)} 
                  key={Math.random()}>
            {s[1]+" "}
            </span>)
        );
    }

    renderSubmitButton = () => {
        if(this.state.currentQuery === this.state.noQueries) {
            return (
                <Link className="button-link" to="/loading">SUBMIT ALL</Link>
            )
        }
        else {
            return (
                <button onClick={this.nextClicked} className='button-link'>submit {"&"} go to the next image {">"}</button>
            );
        };
    }

    isClicked = (s) => {
        if(s[0] === 0){
            return 'species'
        }
        if(s[0] === 1){
            return "species-clicked"
        }
    }

    select = (s) => {
        this.setState({species: this.state.species.map((specie) => {
            if(specie === s){

                 if(specie[0] === 0) {
                    return [1, specie[1]]
                 }
                 if(specie[0] === 1) {
                    return [0, specie[1]]
                 }
            }
            else {
                return specie
            }
        })})
    }

    nextClicked = () => {  
        this.sendLabels()
        this.clearSpeciesArray()

        this.changeCurrentQuery()
        this.requestNextImg()

        this.checkAsLabelled()
    }

    sendLabels = () => {
        // send to server in future
    }

    clearSpeciesArray = () => {
        this.setState({species: this.state.species.map((specie) => [0, specie[1]])});
    }

    changeCurrentQuery = () => {
        this.setState({currentQuery: this.state.currentQuery+1});
    }

    requestNextImg = () => {
        // request from server in future
        this.setState({currentImgMock: this.state.imgsMock[this.state.currentQuery]});
    }

    checkAsLabelled = () => {

    }
}
 
export default ActiveLearningPage;