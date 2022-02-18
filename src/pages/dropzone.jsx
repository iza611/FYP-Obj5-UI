import React, { Component } from "react";
import Dropzone from 'react-dropzone';

class DropzoneComponent extends Component {
    state = { 
        fileDir: ""
     } 
    
    render() { 
        return (
            <>
                <Dropzone onDrop={ (acceptedFiles) => {
                        let file_dir = acceptedFiles[0].path;
                        let dir = "error"
                        if(this.props.acceptedType === "FOLDER") {
                            file_dir = file_dir.slice(0, file_dir.length);
                            const cut_char_idx = file_dir.lastIndexOf('/');
                            const folder_dir = file_dir.slice(0, cut_char_idx+1);
                            dir = folder_dir;
                        }
                        else {
                            dir = file_dir;
                        }
                        
                        this.setState({fileDir: dir});
                        this.props.setDir(dir);
                        } }
                        noClick={true} >

                    {({getRootProps, getInputProps, isDragActive}) => (
                    <section>
                        <div className={this.determineFormat(isDragActive)} {...getRootProps()}>
                            <input {...getInputProps()} />
                            {this.determineText(isDragActive)}
                        </div>
                    </section>
                    )}

                </Dropzone>
            </>
          );
    }

    determineText = (isDragActive) => {
        if(this.state.fileDir === ""){
            return (
                isDragActive ? 
                <p className="dropzone-input">drop the {this.props.acceptedType} here ...</p> :
                <p className="dropzone-input">drag and drop the {this.props.acceptedType} here</p>
            );
        }
        else {
            return ( 
                isDragActive ? 
                <p className="dropzone-input">drop the {this.props.acceptedType} here ...</p> :
                <p className="dropzone-input">{this.state.fileDir}</p>
                );
        }
    }

    determineFormat = (isDragActive) => {
        if(this.state.fileDir === ""){
            return isDragActive ? "dropzone": "dropzone";
        }
        else {
            return isDragActive ? "dropzone": "dropzone-filled";
        }
    }
}
 
export default DropzoneComponent;