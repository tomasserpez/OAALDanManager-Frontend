import React, { useEffect, useState } from 'react';
import { getDanes, deleteDan } from '../features/apiCalls';
import { useTable, useGlobalFilter } from "react-table";
import regeneratorRuntime from "regenerator-runtime";

import GlobalFilter from './GlobalFilter';

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

  const columns = [
    {
      Header: 'Nombre y Apellido',
      accessor: 'NombreApellido',
    },
    {
      Header: "DNI",
      accessor: 'dni',
    },
    {
      Header: "Acciones",
      Cell: ({row}) => (
        <>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleDelete(row.original.id)}
        >
        Eliminar
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
        Editar
        </button>
        </>
      )
    }
  ];

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable({ columns, data: danes}, useGlobalFilter);
  const { globalFilter } = state;

  return(
    <>
      <h1> Listado de danes </h1>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <div className="mt-2 flex flex-col">
        <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
          <div  className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200" {...getTableProps()}>
        <thead className="bg-gray-100">
         {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
               {...column.getHeaderProps()}
               className="px-6 py-5 text-left text-20 font-medium text-gray-400 uppercase rounded-sm tracking-wider"
              >
              {column.render('Header')}
              </th>
            ))}
          </tr>
        ))} 
        </thead>
        <tbody className="bg-white divide-y divide-gray-200" {...getTableBodyProps()}>
                  {rows.map((row)=>{
                    prepareRow(row);
                    return(
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      ))}
                    </tr>
                    );
                  })}
        </tbody>
      </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DanList;