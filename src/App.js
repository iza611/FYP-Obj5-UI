import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom'
import FrontPage from './pages/front-page';
import AboutPage from './pages/about-page';
import NavBar from './components/navabar';
import StartTrainingPage from './pages/start-training-page'
import ExistingModelPage from './pages/existing-model-page';
import Results from './pages/results-page';
import React, { Component } from 'react';
import LicenseText from './components/photo-license';
import ActiveLearningWrapper from './wrappers/active-learning-wrapper';
import LoadingWrapper from './wrappers/loading-wrapper';

class App extends Component {

  render() {
    return (
      <HashRouter>

        <div className="App">

          <NavBar />

          <div className="content">
            <Routes>
              <Route path="/" element={<FrontPage />} />
              <Route path="/new" element={<StartTrainingPage />} />
              <Route path="/existing" element={<ExistingModelPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/loading/:page/:imgDir/:lblDir/:speciesOrSaveDir/:rounds/:queries/:round" element={<LoadingWrapper />} />
              <Route path="/activelearning/:rounds/:queries/:round" element={<ActiveLearningWrapper />} />
              <Route path="/results" element={<Results />} />
            </Routes>
          </div>

          <LicenseText />

        </div>

      </HashRouter>
    )
  }

}

export default App;
