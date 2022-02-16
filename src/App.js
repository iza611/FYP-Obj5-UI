import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import FrontPage from './pages/front-page';
import AboutPage from './pages/about';
import NavBar from './pages/navabar';
import NewDatasetPage from './pages/new-dataset-page'
import ExistingProjectPage from './pages/existing-project-page';
import LoadingPage from './pages/loading';
import Results from './pages/results';
import React, { Component } from 'react';
// import accessFile from './simple-script';

class App extends Component {
  state = {  } 
  render() { 
    return (
      <Router>

        <div className="App">
          <NavBar />

          <div>
            <button onClick={this.handleClick}>run js script</button>
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
      
      </Router>
    );
  }

  handleClick() {
    console.log('clicked')
    window.test();

    // const filename = '/Users/ozogiz01/OneDrive - StepStone Group/Desktop/Metadata (non-human images only).json'
    window.accessFile();
  }

}
 
export default App;
