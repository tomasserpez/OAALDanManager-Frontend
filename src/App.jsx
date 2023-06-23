import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import  Tabla  from './components/Tabla';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Tabla />
    </>
  )
}

export default App
