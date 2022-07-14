import './App.css';
import React from 'react'
import Hello from './components/hello';
import Greet from './components/Greet';

function App() {
  return (
    <React.Fragment>
      <Hello name="Ahmad Farhan"/>
      <Greet/>
    </React.Fragment>
  );
}

export default App;
