import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Component/Home';
// import Screen from './Component/Screen.js';
function App() {
  return (
   <div className='align-items-center'> 
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/home/*" element={<Home/>}/>
   </Routes>
   
   </div>
  );
}

export default App;