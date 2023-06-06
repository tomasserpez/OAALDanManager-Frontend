import React, { useEffect, useState } from 'react';
import { useTable, useGlobalFilter } from 'react-table';

import { getDanes, deleteDan, updateDan } from '../features/apiCalls';

const DanList = () => {
  const [danes, setDanes] = useState([]);
  const [globalFilter, setFilterValue] = useState('');
  const [expandedRowId, setExpandedRowId] = useState(null);

  const generateUniqueKey = (prefix) => {
    return `${prefix}-${new Date().getTime()}`;
  };

  const ArrayDanes = [
    "Shodan",
    "Nidan",
    "Sandan",
    "Yodan",
    "Godan",
    "Rokudan",
    "Nanadan",
    "Hachidan"
  ];

  useEffect(() => {
    const fetchDanes = async () => {
      const danesData = await getDanes();
      setDanes(danesData);
      location.refresh();
    };

    fetchDanes();
  }, []);

  const handleDelete = async (id) => {
    // Tiene que preguntar si estamos seguros de que queremos borrar el alumno
    const deleteConfirm = window.confirm(
      '¿Estás seguro de que quieres borrar el alumno?'
    );
    if (deleteConfirm) {
      await deleteDan(id);
      const updatedDanes = danes.filter((d) => d.id !== id);
      setDanes(updatedDanes);
      alert("El dan ha sido promocionado correctamente.");
      location.refresh();
    }
  };

  const handleEdit = (id) => {
    console.log(id);
  };

  const handlePromotion = (dan) => {
    const index = ArrayDanes.indexOf(dan.NroDan);
    if (index >= 7) {
      alert("No se puede promocionar un dan que ya está en la posición máxima");
    } else {
      const promotionConfirm = window.confirm(
        '¿Estás seguro de que quieres a ' + dan.NombreApellido + ' promocionar de' + dan.NroDan + ' a ' + ArrayDanes[index + 1] +  '?'
      );
      if (promotionConfirm) {
        const newDan = {
          ...dan,
          NroDan: ArrayDanes[index + 1]
        };
        updateDan(newDan);
        const updatedDanes = danes.map((d) => (d.id === newDan.id ? newDan : d));
        setDanes(updatedDanes);
        alert("El dan ha sido promocionado correctamente.");
      }
    }
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
        Header: 'Dojo al que responde',
        accessor: 'QueDojoPertenece',
      },
      {
        Header: 'Fecha del último examen',
        accessor: 'FechaUltimoExamen',
      },
      {  
        Header: 'Provincia',
        accessor: 'Provincia',
      },
      {
        Header: 'Acciones',
        Cell: ({ row }) => (
          <div className="flex flex-row">
            <button
              onClick={() => handleDelete(row.original.id)}
              key={generateUniqueKey('delete')}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 m-1  rounded mr-2"
            >
              Eliminar
            </button>
            <button
              key={generateUniqueKey('edit')}
              onClick={() => handleEdit(row.original.id)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-1 rounded"
            >
              Editar
            </button>
          </div>
        ),
      },
      {
        Header: 'Promocionar',
        Cell: ({ row }) => (
          <div>
            <button
              key={generateUniqueKey('promotion')} // Generar key única
              onClick={() => handlePromotion(row.original)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold text-2xl py-2 px-4 rounded"
              >
                +
              </button>
          </div>
        ),
      }
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
              <th className="px-4 py-2 bg-gray-100"></th> {/* Espacio para el botón "Mostrar" */}
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
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="px-4 py-2 border-b border-gray-200"
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                  <td className="px-4 py-2 border-b border-gray-200">
                    <button
                      onClick={() => handleExpand(row.original.id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded"
                    >
                      {isExpanded ? 'Ocultar' : 'Mostrar'}
                    </button>
                  </td>
                </tr>
                {isExpanded && (
                  <tr key={`${generateUniqueKey('tr')}`}>
                    <td colSpan={columns.length + 1}>
                      <div className="text-left p-5">
                        <p>
                          <strong>Número de miembro: </strong>{' '}
                          {row.original.NroMiembro}
                        </p>
                        <p>
                          <strong>Nacionalidad: </strong>{' '}
                          {row.original.Nacionalidad}
                        </p>
                        <p>
                          <strong>Fecha de Nacimiento: </strong>{' '}
                          {row.original.FechaNacimiento}
                        </p>
                        <p>
                          <strong>Número de AF: </strong>{' '}
                          {row.original.NroAF}
                        </p>
                        <p>
                          <strong>Fecha del proximo examen: </strong>{' '}
                          {row.original.FechaProximoExamen}
                        </p>
                        <p>
                          <strong>Contacto: </strong>
                        </p>
                        <ul className="pl-5">
                          <li>
                            <strong>Teléfono: </strong>{' '}
                            {row.original.Telefono}
                          </li>
                          <li>
                            <strong>Email: </strong> {row.original.Email}
                          </li>
                        </ul>
                        <p>
                          <strong>Direccion: </strong>{' '}
                          {row.original.Direccion}
                        </p>
                        <p>
                          <strong>Codigo Postal: </strong>{' '}
                          {row.original.CodigoPostal}
                        </p>
                        <p>
                          <strong>Tipo de Alumno: </strong>
                          {row.original.TipoDeAlumno}
                        </p>
                        <p>
                          <strong>Observación: </strong>{' '}
                          {row.original.Observacion}
                        </p>
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
