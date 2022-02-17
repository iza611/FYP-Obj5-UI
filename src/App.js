import './App.css';
// import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { HashRouter, Route, Routes } from 'react-router-dom'
import FrontPage from './pages/front-page';
import AboutPage from './pages/about';
import NavBar from './pages/navabar';
import NewDatasetPage from './pages/new-dataset-page'
import ExistingProjectPage from './pages/existing-project-page';
import LoadingPage from './pages/loading';
import Results from './pages/results';
import React, { Component } from 'react';

class App extends Component {
  state = { 
    serverMessage: "",
    serverMessage2: ""
   } 
  render() { 
    return (
      <HashRouter>

        <div className="App">

          <NavBar />

          <div>
            <button onClick={this.handleClick}>run node script</button>
            <span className='text-light'>{this.state.serverMessage}</span>
            <button onClick={this.handleClick2}>run node script2</button>
            <span className='text-light'>{this.state.serverMessage2}</span>
            <button onClick={this.handleClick3}>post msg</button>
          </div>

          <div className="content">
            <Routes>
              <Route path="/" element={<FrontPage />} />
              <Route path="/new" element={<NewDatasetPage />} />
              <Route path="/existing" element={<ExistingProjectPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/loading" element={<LoadingPage />} />
              <Route path="/results" element={<Results />} />
            </Routes>
          </div>

        </div>
      
      </HashRouter>
    );
  }

  handleClick = () => {
    console.log(window.testNodeModule);
    // window.testNodeModule.hello();

    fetch('http://localhost:8000/message')
    .then(res => res.json())
    .then((data) => {
      console.log(data);
      const message = data[0]['message'];
      console.log(message);
      this.setState({ serverMessage: message });
    })
    .catch((error) => {
      this.setState({ serverMessage: "error!!! probably something is blocking port 8000, kill it and restart ELA app!" });
    })
  }

  handleClick2 = () => {
    fetch('http://localhost:8000/test')
    .then(res => res.text())
    .then((data) => {
      console.log(data);
      this.setState({ serverMessage2: data });
    })
    .catch((error) => {
      this.setState({ serverMessage2: error});
    });
  }

  handleClick3 = () => {
    const imgDir = "/folder1/folde2/ena24";
    fetch('http://localhost:8000/posting', {
      method: 'PUT',
      body: imgDir
    })
    .then(res => res.text())
    .then((data) => {
      console.log('Success', data);
    })
    .catch((error) => {
      this.setState({ serverMessage2: error});
    });
  }
}
 
export default App;
