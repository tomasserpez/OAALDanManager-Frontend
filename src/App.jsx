import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
// Imports de la app
import Navbar from './components/Navbar';
import DanList from './components/DanList';


function App() {

  return (
    <>
      <Navbar />
      <DanList />
    </>
  )
}

export default App
