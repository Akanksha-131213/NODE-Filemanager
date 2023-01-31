import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Component/Home';
import Screen from './Component/Screen';

function App() {
  return (
   <div>
    
    
   <Routes>
    <Route exact path="/" element={<Screen/>}/>
    <Route path="/home/*" element={<Home/>}/>
   </Routes>
   </div>
  );
}

export default App;