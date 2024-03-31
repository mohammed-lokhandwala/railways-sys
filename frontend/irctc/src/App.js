import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TrainList from './TrainList';
import TrainDetail from './TrainDetail';
import Login from './Login';
import Signup from './Signup';
import { useCookies } from 'react-cookie';

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/login" element={  <Login />} />
        <Route path="/" element={<Signup />} />
        <Route
          path="/trainlist"
          element={<TrainList /> }
        />
        <Route
          path="/train/:id"
          element={ <TrainDetail /> }
        />
      </Routes>
    </Router>
  );
}

export default App;
