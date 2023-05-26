import React, { useEffect, useState } from 'react';
import { getDanes, deleteDan } from '../features/apiCalls';

const DanList = () => {
  const [danes, setDanes] = useState([]);

  useEffect(() => {
    const fetchDanes = async () => {
      const danesData = await getDanes();
      setDanes(danesData);
    };

    fetchDanes();
  },[]);

  const handleDelete = async (id) => {
    await deleteDan(id);
    // Actualizar listado de danes luego de la eliminación de uno...
    const danesData = await getDanes();
    setDanes(danesData);
  };


  return(
    <>
      <h1> Listado de todos los danes </h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre y Apellido
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {danes.map((dan) => (
          <tr key={dan.id}>
            <td className="px-6 py-4 whitespace-nowrap">{dan.NombreApellido}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleDelete(dan.id)}
              >
                Eliminar
              </button>
           </td>
         </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DanList;
