import React, { Component } from 'react';

class SpeciesAdding extends Component {
    state = { 
        error:""
     } 
    render() { 
        return (
            <div>
                <form className="form-inline" onSubmit={this.props.onFormSubmit} id="species-form">
                {this.props.species.map((s) => <span className='species' onClick={() =>this.props.onLabelClicked(s)} key={Math.random()}>{s+" "}</span>)}
                    <input className='species-input' style={{width:"100px"}}></input>
                </form>
                <span className={this.isError()} style={{margin:"5px"}}>{this.props.speciesError}</span>
            </div>
        );
    }

    isError = () => {
        if(this.props.speciesError === ""){
            return "text-danger"
        }
        else {
            return "text-danger a-la-button"
        }
    }
}
 
export default SpeciesAdding;