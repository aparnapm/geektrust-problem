import React from 'react';
import './App.css';
import Header from  '../header/Header.js';
import ProblemStatement from '../problemStatement/ProblemStatement';
import {Button} from 'react-bootstrap';
function App() {
  return (
    <div className="App">
      <Header />
      <Button className="begin">Begin Game</Button>
      <ProblemStatement />
      
    </div>
  );
}

export default App;
