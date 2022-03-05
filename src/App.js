import './App.css';
// import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { HashRouter, Route, Routes } from 'react-router-dom'
import FrontPage from './pages/front-page';
import AboutPage from './pages/about';
import NavBar from './pages/navabar';
import NewDatasetPage from './pages/new-dataset-page'
import ExistingProjectPage from './pages/existing-project-page';
import Results from './pages/results';
import React, { Component } from 'react';
import LicenseText from './pages/photo-license';
import ActiveLearningWrapper from './pages/active-learning-wrapper';
import LoadingWrapper from './pages/loading-wrapper';

const electron = window.require('electron');
const { ipcRenderer } = electron;
const loadBalancer = window.require('electron-load-balancer');

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

          {/* <div>
            <button onClick={this.handleClick}>run node script</button>
            <span className='text-light'>{this.state.serverMessage}</span>
            <button onClick={this.handleClick2}>run node script2</button>
            <span className='text-light'>{this.state.serverMessage2}</span>
            <button onClick={this.handleClick3}>post msg</button>
            <button onClick={this.handleClick4}>run python script</button>
            <button onClick={this.handleClick5}>get node module dir</button>
            <button onClick={this.handleClick6}>start active learning (py script)</button>
            <button onClick={this.handleClick7}>test ipc</button>
            <button onClick={this.handleClick8}>test non-module server(from folder)</button>
            <button onClick={this.handleClick9}>run exe file</button>
          </div> */}

          <div className="content">
            <Routes>
              <Route path="/" element={<FrontPage />} />
              <Route path="/new" element={<NewDatasetPage />} />
              <Route path="/existing" element={<ExistingProjectPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/loading/:page/:imgDir/:lblDir/:speciesOrSaveDir/:rounds/:queries/:round" element={<LoadingWrapper />} />
              <Route path="/activelearning/:rounds/:queries/:round" element={<ActiveLearningWrapper />} />
              <Route path="/results" element={<Results />} />
            </Routes>
          </div>

          <LicenseText />

        </div>

      </HashRouter>
    );
  }

  changePg = (page) => {
    this.setState({ nextPgAfterLoading: page });
  }

  changeQueryIds = (ids) => {
    this.setState({ queryIds: ids });
  }

  handleClick = () => {
    // console.log(window.testNodeModule);
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
        this.setState({ serverMessage2: error });
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
        this.setState({ serverMessage2: error });
      });
  }

  handleClick4 = () => {
    console.log('no kurła')
    fetch('http://localhost:8000/run/python/script')
      .then(res => res.text())
      .then((data) => {
        console.log(data);
        console.log('no kurła');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleClick5 = () => {
    fetch('http://localhost:8000/module/dir')
      .then(res => res.text())
      .then((dir) => {
        console.log(dir);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleClick6 = () => {
    console.log('wtf');
    fetch('http://localhost:8000/start/active/learning')
      .then(res => res.text())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleClick7 = () => {
    ipcRenderer.send('testIpc', {
      number: 25,
    })
  }

  handleClick8 = () => {
    fetch('http://localhost:8001/test123')
      .then(res => res.text())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        this.setState({ serverMessage2: error });
      });
  }

  handleClick9 = () => {
    fetch('http://localhost:8000/run/exe')
      .then(res => res.text())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        this.setState({ serverMessage2: error });
      });
  }
}

export default App;
