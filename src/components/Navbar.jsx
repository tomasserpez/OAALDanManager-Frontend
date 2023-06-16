import React, { useState } from 'react'

const Navbar = () => {
  // Determinamos si estamos parados en CREAR/EDITAR o en Listar
  const handleRedirect = () => {
    // si estamos en /crear el boton debe decir "Volver" y redirigirnos a la pantalla de inicio
    if (window.location.pathname === '/') {
      window.location.href = '/crear'
    }
    else{
      window.location.href = '/'
    }
  }

  return (
    <>
      <nav 
        className="flex items-center justify-center flex-wrap p-6 shadow-md mb-10 md:justify-between" 
      >
        <div className="items-center flex-shrink-0 text-white mr-6 hidden lg:mr-72 md:block">
          <img src="https://aikidoargentina.org/wp-content/uploads/2022/08/logo_160x160-C.png" alt="logo" className="w-100 h-10 mr-2" />
        </div>
        {/* El boton para dar de alta que se vea a la derecha en lg */}
        <div className="mt-4 lg:mt-0">
          <button className="inline-flex items-center bg-amber-500 border-0 py-2 px-4 text-white hover:bg-amber-600 focus:outline-none rounded hover:animate-pulse"
          onClick={() => handleRedirect()}>
            {window.location.pathname === '/' ? 'Crear' : 'Volver'}
          </button>
        </div>
      </nav>
    </>
  )
}

export default Navbar
