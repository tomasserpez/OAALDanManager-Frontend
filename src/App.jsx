import { useState } from 'react'
import './App.css'
import  Tabla  from './components/Tabla';
import Login from './components/Login';

function App() {
  const [count, setCount] = useState(0)

  if(localStorage.getItem("token") != undefined){
      return (
          <>
                <Tabla />
          </>
      )
  }else{
      return (
          <>
                <Login />
          </>
      )
  }
}

export default App
