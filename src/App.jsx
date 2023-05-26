import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Imports de la app
import DanList from "./components/DanList";

function App() {

  return (
    <>
      <p>OAAL DAN MANAGER 🥋</p>
      <div><DanList /></div>
    </>
  )
}

export default App
