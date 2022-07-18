import './App.css';
import React from 'react'
import ToDoList from './components/ToDoList';

function App() {
  return (
    <React.Fragment>
      <div className='main-container'>
        <h1>Action Items</h1>
        <ToDoList/>
      </div>
    </React.Fragment>
  );
}

export default App;
