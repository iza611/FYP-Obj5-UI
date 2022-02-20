import React, { Component } from 'react';
import { Link } from "react-router-dom";
// import img1 from "../animals/ena24/6198.jpg";
// import img2 from "../animals/ena24/6283.jpg";
// import img3 from "../animals/ena24/7004.jpg";
// import img4 from "../animals/ena24/8150.jpg";
// import img5 from "../animals/ena24/8869.jpg";
// import img6 from "../animals/ena24/9229.jpg";

class ActiveLearningPage extends Component {
    state = { 
        noQueries: 1,
        currentQuery: 1,
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
                        <img height={"auto"} width={"auto"} alt="icon" src={this.getImage()} style={{marginTop:"10px", border:"3px black solid", maxHeight:"330px", maxWidth:"570px"}}/>
                    </div>

                    <div style={{marginTop:"20px"}}>
                        <span className='a-la-button'>
                            identify specie/s on the image above:
                        </span>
                    </div>

                    <div style={{margin:"20px"}}>
                        {this.renderSpecies()}
                    </div>
                </div>

                {/* <div style={{border:"1px black solid", marginTop:"10px"}}></div> */}

                <div className='section3'>
                    <div style={{margin:"10px"}}>
                        {this.renderSubmitButton()}
                    </div>
                </div>
            </>
        );
    }

    componentDidMount = () => {
        fetch('http://localhost:8000/query-ids/0')
        .then(res => res.text())
        .then((data) => {
            // console.log(data);
            let dataConverted = data.slice(2, data.length-2)
            dataConverted = dataConverted.split("\",\"")
            // console.log(dataConverted);
            this.setState({queryIds: dataConverted});
            let dataSize = dataConverted.length;
            this.setState({noQueries: dataSize});
         })
         .catch((error) => {
             console.log(error);
            });

        fetch('http://localhost:8000/species')
        .then(res => res.json())
        .then((data) => {
            let dataConverted = data.map((s)=>[0,s]);
            dataConverted.push([0, 'other / undefind']);
            console.log(dataConverted);
            this.setState({species: dataConverted});
        })
        .catch((error) => {
            console.log(error);
        });
        
    }

    getImage = () => {
        if(this.state.queryIds !== undefined) {
            return (
                "http://localhost:8000/" + 
                this.state.queryIds[(this.state.currentQuery-1)] + 
                ".jpg");
        }
    }

    renderChecks = () => {
        const seq = Array(this.state.noQueries).fill().map((element, index) => index + 1);
        return (
            seq.map((idx) => {
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
        if(this.state.species !== undefined) {
            return(
                this.state.species.map((s) => {
                    // console.log(s)
                    return (
                        <span className={this.isClicked(s)} 
                              onClick={() => this.select(s)} 
                              key={Math.random()}>
                        {s[1]+" "}
                        </span>
                    );
                })
            );
        }
        
    }

    renderSubmitButton = () => {
        const isLast = this.state.currentQuery === this.state.noQueries;

        if(this.state.species === undefined){
            // species not yet fetched 
            const button = isLast? 
                    <button className="button-link-disabled"
                    style={{cursor:"default"}}>
                        submit
                    </button>
                    :
                    <button className='button-link-disabled'
                    style={{cursor:"default"}}>
                        submit {"&"} go to the next image {">"}
                    </button>;
                return button;
        }
        else {
            //fetched
            let selected = this.state.species.find(s => s[0] === 1);
            if(selected === undefined){
                // not selected yet
                const button = isLast? 
                    <button className="button-link-disabled"
                    style={{cursor:"default"}}>
                        submit
                    </button>
                    :
                    <button className='button-link-disabled'
                    style={{cursor:"default"}}>
                        submit {"&"} go to the next image {">"}
                    </button>;
                return button;
            }
            else {
                // selected
                selected = selected[1];

                const button = isLast? 
                    <Link onClick={() => this.sendLabel(selected)} 
                    className="button-link" 
                    to="/loading/results/null/null/null">
                        submit
                    </Link>
                    :
                    <button onClick={() => this.nextClicked(selected)} 
                    className='button-link'>
                        submit {"&"} go to the next image {">"}
                    </button>;
                return button;
            }
        }
    }

    isClicked = (s) => {
        if(s[0] === 0){
            return 'species-not-clicked'
        }
        if(s[0] === 1){
            return "species-clicked"
        }
    }

    select = (s) => {
        let speciesCleared = this.state.species.map((sp)=>[0,sp]);
        let selectedOne = speciesCleared.map((spe) => {
            if(spe[1]===s) {
                return [1, spe[1][1]]
                
            }
            else {
                return [0, spe[1][1]];
            }
        });
        this.setState({species: selectedOne});
    }

    nextClicked = (selected) => {  
        this.sendLabel(selected);
        this.clearSpeciesArray();

        this.changeCurrentQuery();

        this.checkAsLabelled();
    }

    sendLabel = (label) => {
        console.log(label);
        fetch('http://localhost:8000/label/0', {
            method: 'POST',
            body: label
        })
        .then(res => res.text())
        .then((data) => {
            console.log('Success', data);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    clearSpeciesArray = () => {
        this.setState({species: this.state.species.map((specie) => [0, specie[1]])});
    }

    changeCurrentQuery = () => {
        this.setState({currentQuery: this.state.currentQuery+1});
    }

    checkAsLabelled = () => {

    }
}
 
export default ActiveLearningPage;