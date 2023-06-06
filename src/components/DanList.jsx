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
  

  const ArrayDanes = ["Shodan", "Nidan", "Sandan", "Yodan","Godan","Rokudan", "Nanadan", "Hachidan"];
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
  
  const handlePromotion = (dan) => {
    const index = ArrayDanes.indexOf(dan.NroDan);
    if (index >= 7) {
      alert("No se puede promocionar un dan que ya está en la posición máxima");
    } else {
      const updatedDan = { ...dan };
      updatedDan.NroDan = ArrayDanes[index + 1];
      updateDan(updatedDan.id, updatedDan)
        .then(() => {
          setDanes((prevDanes) => {
            const danIndex = prevDanes.findIndex((d) => d.id === dan.id);
            const updatedDanes = [...prevDanes];
            updatedDanes.splice(danIndex, 1);
            updatedDanes.splice(danIndex, 0, updatedDan);
            return updatedDanes;
          });
          alert("El alumno ha sido promocionado correctamente.");
        })
        .catch((error) => {
          console.log("Error al promocionar al alumno: ", error);
          alert("Ha ocurrido un error al promocionar al alumno.");
        });
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
        Header: 'Tipo de Alumno',
        accessor: 'TipoDeAlumno',
      },
      {
        Header: 'Acciones',
        Cell: ({ row }) => (
          <div>
            <button
              onClick={() => handleDelete(row.original.id)}
              key={generateUniqueKey('delete')} // Generar key única
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Eliminar
            </button>
            <button
              key={generateUniqueKey('edit')} // Generar key única
              onClick={() => handleEdit(row.original.id)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
      
    ],[]
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
            <React.Fragment key={`${generateUniqueKey('row')}-${row.original.id}`}> {/* Asignar una key única al fragmento */}
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
                      'QueDojoPertenece',
                      'FechaUltimoExamen',
                      'TipoDeAlumno',
                      'Acciones',
                      'Promocionar',
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
                <tr key={`${generateUniqueKey('tr')}`}>
                  <td colSpan={columns.length + 1}>
                    {/* Renderizar información oculta */}
                    <div className="text-left">
                      <p><strong>Número de miembro:</strong> {row.original.NroMiembro}</p>
                      <p><strong>Nacionalidad:</strong> {row.original.Nacionalidad}</p>
                      <p><strong>Fecha de Nacimiento:</strong> {row.original.FechaNacimiento}</p>
                      <p><strong>Número de AF:</strong> {row.original.NroAF}</p>
                      <p><strong>Fecha del proximo examen:</strong> {row.original.FechaProximoExamen}</p>
                      <p><strong>Contacto:</strong></p>
                      <ul className="pl-2">
                        <li><strong>Teléfono:</strong> {row.original.Telefono}</li>
                        <li><strong>Email:</strong> {row.original.Email}</li>
                      </ul>
                      <p><strong>Direccion:</strong> {row.original.Direccion}</p>
                      <p><strong>Codigo Postal:</strong> {row.original.CodigoPostal}</p>
                      <p><strong>Observación:</strong> {row.original.Observacion}</p>
                      {/* Agrega aquí el resto de los campos ocultos */}
                    </div>
                  </td>
                </tr>
                
              )}
              </React.Fragment>

            </>
          );
        })}
      </tbody>
    </table>
  </div>
);

  
};

export default DanList;
