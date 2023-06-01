import React, { useEffect, useState } from 'react';
import { useTable, useGlobalFilter } from 'react-table';


import { getDanes, deleteDan } from '../features/apiCalls';


const DanList = () => {
  const [danes, setDanes] = useState([]);
  const [globalFilter, setFilterValue] = useState('');
  const [expandedRowId, setExpandedRowId] = useState(null);

  useEffect(() => {
    // Simulación de datos obtenidos de la API
    const fetchDanes = async () => {
      const danesData = await getDanes();
      setDanes(danesData);
    };

    fetchDanes();
  }, []);

  const handleDelete = async (id) => {
    await deleteDan(id);
    // Actualizar listado de danes luego de la eliminación de uno...
    const danesData = await getDanes();
    setDanes(danesData);
  };

  const handleEdit = (id) => {
    // Lógica para editar un dan por su ID
    // ...
    console.log(id);
  };

  const handleExpand = (id) => {
    setExpandedRowId((prevId) => (prevId === id ? null : id));
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Nombre y Apellido',
        accessor: 'NombreApellido',
      },
      {
        Header: 'DNI',
        accessor: 'dni',
      },
    {
      Header: 'Nro Dan',
      accessor: 'NroDan',
    },
    {
      Header: 'Nacionalidad',
      accessor: 'Nacionalidad',
    },
    {
      Header: 'Fecha del último examen',
      accessor: 'FechaUltimoExamen',
    },
    {
      Header: 'Tipo de Alumno',
      accessor: 'TipoDeAlumno',
    },
      {
        Header: 'Acciones',
        Cell: ({ row }) => (
          <div>
            <button
              onClick={() => handleDelete(row.original.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Eliminar
            </button>
            <button
              onClick={() => handleEdit(row.original.id)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Editar
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,  
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter
  } = useTable({ columns, data: danes }, useGlobalFilter);

  const handleFilterChange = (e) => {
    setGlobalFilter(e.target.value);
    setFilterValue(e.target.value);
  };

return (
  <div className="overflow-x-auto">
    <input
      value={globalFilter}
      onChange={handleFilterChange}
      placeholder="Buscar dan..."
      className="w-64 rounded-xl border p-2 mb-4"
    />
    <table {...getTableProps()} className="w-full">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                className="px-4 py-2 bg-gray-100 text-center text-gray-700 font-bold"
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          const isExpanded = row.original.id === expandedRowId;
          return (
            <>
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  if (
                    isExpanded &&
                    ![
                      'id',
                      'NombreApellido',
                      'dni',
                      'NroDan',
                      'Nacionalidad',
                      'Observacion',
                      'FechaUltimoExamen',
                      'TipoDeAlumno',
                      'Acciones',
                    ].includes(cell.column.id)
                  ) {
                    return null; // Ocultar las celdas no deseadas
                  }
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="px-4 py-2 border-b border-gray-200"
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
                <td>
                  <button
                    onClick={() => handleExpand(row.original.id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    {isExpanded ? 'Ocultar' : 'Mostrar'}
                  </button>
                </td>
              </tr>
              {isExpanded && (
                <tr key={`${row.original.id}-details`}>
                  <td colSpan={columns.length + 1}>
                    {/* Renderizar información oculta */}
                    <div className="text-left">
                      <p><strong>Número de miembro:</strong> {row.original.NroMiembro}</p>
                      <p><strong>Número de AF:</strong> {row.original.NroAF}</p>
                      <p><strong>Fecha del proximo examen:</strong> {row.original.FechaProximoExamen}</p>
                      <p><strong>Direccion:</strong> {row.original.Direccion}</p>
                      <p><strong>Observación:</strong> {row.original.Observacion}</p>
                      {/* Agrega aquí el resto de los campos ocultos */}
                    </div>
                  </td>
                </tr>
              )}
            </>
          );
        })}
      </tbody>
    </table>
  </div>
);

  
};

export default DanList;
