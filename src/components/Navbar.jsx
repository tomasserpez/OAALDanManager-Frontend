import React, { useState } from 'react'

const Navbar = () => {
  // Definimos la variable y función de seteo que usaremos para determinar si el navbar está abierto o cerrado
  const [isOpen, setIsOpen] = useState(false);

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
          <button className="inline-flex items-center bg-amber-500 border-0 py-2 px-4 text-white hover:bg-amber-600 focus:outline-none rounded hover:animate-pulse">
            Dar de alta
          </button>
        </div>
      </nav>
    </>
  )
}

export default Navbar