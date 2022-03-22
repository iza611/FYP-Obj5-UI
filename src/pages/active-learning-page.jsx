import React, { Component } from 'react';
import { Link } from "react-router-dom";

class ActiveLearningPage extends Component {
    state = {
        noQueries: this.props.params.queries,
        noQueriesReceived: 0,
        currentQuery: 1,
        round: this.props.params.round,
        noRounds: this.props.params.rounds
    }

    render() {
        return (
            <>
                <div className='section1'>
                    <div style={{ padding: "4px" }}></div>
                    <div className="a-la-button-dark">Active Learning ~ <span style={{ fontWeight: "900" }}>Round {this.state.round}</span></div>

                    {this.renderAppropriateCounter()}

                </div>

                <div style={{ border: "1px black solid" }}></div>

                <div className='section2'>
                    <div className='section2-inside'>
                        <div>
                            <img height={"auto"} width={"auto"} alt="icon" src={this.getImage()} style={{ border: "3px black solid", maxHeight: "330px", maxWidth: "570px" }} />
                        </div>

                        <div style={{ marginTop: "20px" }}>
                            {this.renderSpecies()}
                        </div>
                    </div>
                </div>

                <div style={{ border: "1px black solid" }}></div>

                <div className='section3'>
                    <div style={{ margin: "10px" }}>
                        {this.renderSubmitButton()}
                    </div>
                </div>
            </>
        );
    }

    componentDidMount = () => {
        fetch(`http://localhost:8000/queries/annotations/${this.state.round}`)
            .then(res => res.text())
            .then((data) => {
                let dataConverted = data.slice(2, data.length - 2)
                dataConverted = dataConverted.split("\",\"")
                console.log("dataConverted:", dataConverted)
                this.setState({ queryIds: dataConverted });
                let dataSize = dataConverted.length;
                this.setState({ noQueriesReceived: dataSize });
            })
            .catch((error) => {
                console.log(error);
            });

        fetch('http://localhost:8000/species/names')
            .then(res => res.json())
            .then((data) => {
                this.setState({ speciesRaw: data });
                let dataConverted = data.map((s) => [0, s]);
                // dataConverted.push([0, 'other / undefind']);
                this.setState({ species: dataConverted });
            })
            .catch((error) => {
                console.log(error);
            });

    }

    getImage = () => {
        if (this.state.queryIds !== undefined) {
            return (
                "http://localhost:8000/" +
                this.state.queryIds[(this.state.currentQuery - 1)] +
                ".jpg");
        }
    }

    renderAppropriateCounter = () => {
        if (this.state.noQueriesReceived < 0) {
            return (
                <div style={{ display: "inline-flex", marginTop: "10px" }}>
                    {this.renderChecks()}
                </div>
            )
        }
        else {
            return (
                <div style={{ paddingTop: "10px" }}>
                    <span className='a-la-button-dark'>
                        {this.state.currentQuery + " / " + this.state.noQueriesReceived}
                    </span>
                </div>
            )
        }
    }

    renderChecks = () => {
        const seq = Array(this.state.noQueriesReceived).fill().map((element, index) => index + 1);
        return (
            seq.map((idx) => {
                if (idx < this.state.currentQuery) {
                    return <i className="gg-check-o" key={idx}></i>;
                }
                if (idx === this.state.currentQuery) {
                    if (this.state.species !== undefined) {
                        let selected = this.state.species.find(s => s[0] === 1);
                        if (selected === undefined) {
                            return <i className="gg-shape-circle" key={idx}></i>;
                        }
                        else {
                            return <i className="gg-check-o" key={idx}></i>;
                        }
                    }
                    return <i className="gg-shape-circle" key={idx}></i>;
                }
                else {
                    return <i className="gg-shape-circle" key={idx}></i>;
                }
            })
        )
    }

    renderSpecies = () => {
        if (this.state.species !== undefined) {
            return (
                this.state.species.map((s) => {
                    return (
                            <span className={this.isClicked(s)}
                            onClick={() => this.select(s)}
                            key={Math.random()} style={{padding:"0px", margin:"7px"}}>
                            {s[1] + " "}
                            </span>
                        
                    );
                })
            );
        }

    }

    renderSubmitButton = () => {
        const lastRound = this.state.round === this.state.noRounds;
        const isLastInRound = this.state.currentQuery === this.state.noQueriesReceived;
        const currentRound = parseInt(this.state.round);

        let label = undefined;
        if (this.state.species !== undefined) {
            const selected = this.state.species.find(s => s[0] === 1);
            if (selected !== undefined) {
                label = selected[1];
            }
        };

        if (isLastInRound === false) {
            if (label === undefined) {
                return (
                    <div className="section3-inside">
                        <button className='button-link-disabled' style={{ cursor: "default" }}>
                            {/* Submit label {"&"} Go to the next queried image &#8250; */}
                            Submit &#8250;
                        </button>
                    </div>

                )
            }
            else {
                console.log(label);
                return (
                    <div className="section3-inside">
                        <button onClick={() => this.nextClicked(label)} className='button-link'>
                            {/* Submit label {"&"} Go to the next queried image &#8250; */}
                            Submit &#8250;
                        </button>
                    </div>
                )
            }
        }

        if (isLastInRound === true && lastRound === false) {
            if (label === undefined) {
                return (
                    <div className="section3-inside">
                        <button className="button-link-disabled" style={{ cursor: "default" }}>
                            {/* Submit Round {currentRound + " &"} Go to the Round {currentRound + 1} &#8250;&#8250; */}
                            Next Round &#8250;
                        </button>
                    </div>
                )
            }

            else {
                console.log(label);
                return (
                    <div className="section3-inside">
                        <Link onClick={() => this.sendLabel(label)} className="button-link"
                            to={`/loading/activelearning/null/null/${this.state.speciesRaw}/${this.state.noRounds}/${this.state.noQueries}/${currentRound + 1}`}>
                            {/* Submit Round {currentRound + " &"} Go to the Round {currentRound + 1} &#8250;&#8250; */}
                            Next Round &#8250;
                        </Link>
                    </div>
                )
            }
        }

        if (isLastInRound === true && lastRound === true) {
            if (label === undefined) {
                return (
                    <div className="section3-inside">
                        <button className="button-link-disabled" style={{ cursor: "default" }}>
                            {/* Submit {"&"} Finish labelling */}
                            Finish &#8250;
                        </button>
                    </div>
                )
            }
            else {
                console.log(label);
                return (
                    <div className="section3-inside">
                        <Link onClick={() => this.sendLabel(label)} className="button-link"
                            to={`/loading/results/null/null/null/null/null/null`}>
                            {/* Submit {"&"} Finish labelling */}
                            Finish &#8250;
                        </Link>
                    </div>
                )
            }
        }
    }

    isClicked = (s) => {
        if (s[0] === 0) {
            return 'species-not-clicked'
        }
        if (s[0] === 1) {
            return "species-clicked"
        }
    }

    select = (s) => {
        let speciesCleared = this.state.species.map((sp) => [0, sp]);
        let selectedOne = speciesCleared.map((spe) => {
            if (spe[1] === s) {
                return [1, spe[1][1]]

            }
            else {
                return [0, spe[1][1]];
            }
        });
        this.setState({ species: selectedOne });
    }

    nextClicked = (selected) => {
        this.sendLabel(selected);
        this.clearSpeciesArray();
        this.changeCurrentQuery();
    }

    sendLabel = (label) => {
        fetch(`http://localhost:8000/label`, {
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
        this.setState({ species: this.state.species.map((specie) => [0, specie[1]]) });
    }

    changeCurrentQuery = () => {
        this.setState({ currentQuery: this.state.currentQuery + 1 });
    }
}

export default ActiveLearningPage;