import React from 'react'
const ErrorPage = () => {
  return (
    // Error page hecho con TailwindCSS
    <>
    <div className='flex items-center justify-center h-screen'>
      <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col'>
        <h1 className='text-gray-700 text-2xl font-bold mb-4'>
          Error 404
        </h1>
        <p className='text-gray-700 text-base mb-4'>
          La página que buscas no existe.
        </p>


        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-5'
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Volver a la página principal
        </button>
      </div>

    </div>
    </>
  )
}

export default ErrorPage