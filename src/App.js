import React, { useEffect } from 'react';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { gapi } from 'gapi-script';
import ClientId from './common/Client';
import Home from './components/Home';

const App = () => {

  useEffect(() => {
      function run() {
        gapi.client.init({
          clientId: ClientId,
          scope: ""
        });
      }

      gapi.load('client: auth2', run);
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
