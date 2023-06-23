import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { MantineReactTable } from 'mantine-react-table';
import {
  Box,
  Button,
  Dialog,
  Flex,
  Title,
  ActionIcon,
  Menu,
  Stack,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { IconTrash, IconEdit, IconPlus, IconArrowAutofitUp, IconUserPlus, IconInfoCircle } from '@tabler/icons-react';


import { CreateNewDanModal } from './CreateNewDanModal';
import { EditDanModal } from './EditDanModal';

const Tabla = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [selectedDan, setSelectedDan] = useState(null);


  const fetchDanes = async () => {
    try {
      const response = await axios.get('http://192.168.0.156:8080/danes');
      setTableData(response.data);
    } catch (error) {
      console.error('Error al obtener los danes:', error);
    }
  };

  useEffect(() => {
    fetchDanes();
  }, []);

  const handleCreateNewRow = async (values) => {
    try {
      const response = await axios.post('http://192.168.0.156:8080/danes', values);
      setTableData([...tableData, response.data]);
      alert("El dan ha sido creado correctamente.");
      setCreateModalOpen(false);
    } catch (error) {
      alert("Error al crear el dan.");
      console.error('Error al agregar un dan:', error);
    }
  };

  const handleEditRow = async ({
    values
  }) => {
    
    if(!window.confirm('¿Estas seguro que desea editar este dan?')){
      return;
    }
    try{
      console.log(values._id)
      const response = await axios.put(
        `http://localhost:8080/danes/${values._id}`,
        values
      );
      exitEditingMode();
      alert("El dan ha sido editado correctamente.");
      location.reload();
    }catch(err){
      alert("Error al editar el dan.");
      console.error('Error al actualizar un dan: ', err);
    }
  };

  const handleDeleteRow = useCallback(
    async (row) => {
      if (
        !window.confirm(`¿Estás seguro de que quieres eliminar el dan?`)
      ) {
        return;
      }
      try {
        await axios.delete(`http://192.168.0.156:8080/danes/${row.original._id}`);
        tableData.splice(row.index, 1);
        setTableData([...tableData]);
      } catch (error) {
        console.error('Error al eliminar un dan:', error);
      }
    },
    [tableData]
  );

  
  const handlePromotion = async (row) => {
    const index = row.original.nroDan;
    if (index >= 8) {
      alert("No se puede promocionar un dan que ya está en la posición máxima");
    } else {
      const promotionConfirm = window.confirm(
        '¿Estás seguro de que quieres a ' + row.original.nombreApellido + ' promocionar de' + row.original.nroDan + ' a ' + (row.original.nroDan + 1) +  '?'
      );
      if (promotionConfirm) {
        row.original.nroDan += 1;
          const response = await axios.put(
          `http://192.168.0.156:8080/danes/${row.original._id}`,
          row.original
        );
        tableData[row.index] = response.data;
        setTableData([...tableData]);
        alert("El dan ha sido promocionado correctamente.");
      }

    }
  };

  const getCommonEditTextInputProps = useCallback(
    (cell) => {
      return {
        error: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === 'email'
              ? validateEmail(event.target.value)
              : cell.column.id === 'edad'
              ? validateAge(+event.target.value)
              : validateRequired(event.target.value)
              ? cell.column.id === 'nroDan'
              : validateNroDan(event.target.value);
          if (!isValid) {
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} es obligatorio`,
            });
          } else {
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors]
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: '_id',
        header: '_id',
      },
      {
        accessorKey: 'nombre',
        header: 'Nombre',
        size: 140,
        mantineEditTextInputProps: ({ cell }) => ({
          ...getCommonEditTextInputProps(cell),
        }),
      },
      {
        accessorKey: 'apellido',
        header: 'Apellido',
        size: 140,
        mantineEditTextInputProps: ({ cell }) => ({
          ...getCommonEditTextInputProps(cell),
        }),
      },
      {
        accessorKey: 'fechaUltimoExamen',
        header: 'Fecha del Último Examen',
        mantineEditTextInputProps: ({ cell }) => ({
          ...getCommonEditTextInputProps(cell),
        }),
      },
      {
        accessorKey: 'nroDan',
        header: 'Nro. Dan',
        size: 80,
        mantineEditTextInputProps: ({ cell }) => ({
          ...getCommonEditTextInputProps(cell),
          type: 'number',
        }),
      },
      {
        accessorKey: 'sexo',
        header: 'Sexo',
        size: 80,
        mantineEditTextInputProps: ({ cell }) => ({
          ...getCommonEditTextInputProps(cell),
        }),
      },
      {
        accessorKey: 'nroMiembro',
        header: 'Nro. Miembro',
        size: 80,
        mantineEditTextInputProps: ({ cell }) => ({
          ...getCommonEditTextInputProps(cell),
          type: 'number',
        }),
      },
      {
        accessorKey: 'membership',
        header: 'Membership',
        size: 80,
        mantineEditTextInputProps: ({ cell }) => ({
          ...getCommonEditTextInputProps(cell),
          type: 'number',
        }),
      },
      {
        accessorKey: 'nroAF',
        header: 'Nro. AF',
        size: 80,
        mantineEditTextInputProps: ({ cell }) => ({
          ...getCommonEditTextInputProps(cell),
          type: 'number',
        }),
      },
      {
        accessorKey: 'fechaProximoExamen',
        header: 'Fecha del Próximo Examen',
        mantineEditTextInputProps: ({ cell }) => ({
          ...getCommonEditTextInputProps(cell),
        }),
        renderCell: ({ cell }) => (
          <DatePicker
            value={cell.value ? new Date(cell.value) : null}
            onChange={(date) =>
              cell.setters.setValue(date ? date.toISOString() : '')
            }
            placeholder="Seleccionar fecha"
          />
        ),
      },
      {
        accessorKey: 'fechaNacimiento',
        header: 'Fecha de Nacimiento',
        mantineEditTextInputProps: ({ cell }) => ({
          ...getCommonEditTextInputProps(cell),
        }),
        renderCell: ({ cell }) => (
          <DatePicker
            value={cell.value ? new Date(cell.value) : null}
            onChange={(date) =>
              cell.setters.setValue(date ? date.toISOString() : '')
            }
            placeholder="Seleccionar fecha"
          />
        ),
      },
      {
        accessorKey: 'nacionalidad',
        header: 'Nacionalidad',
        size: 120,
        mantineEditTextInputProps: ({ cell }) => ({
          ...getCommonEditTextInputProps(cell),
        }),
      },
      {
        accessorKey: 'dni',
        header: 'DNI',
        size: 100,
        mantineEditTextInputProps: ({ cell }) => ({
          ...getCommonEditTextInputProps(cell),
          type: 'number',
        }),
      },
      {
        accessorKey: 'queDojoPertenece',
        header: '¿A qué Dojo Pertenece?',
        size: 180,
        mantineEditTextInputProps: ({ cell }) => ({
          ...getCommonEditTextInputProps(cell),
        }),
      },
      {
        accessorKey: 'pais',
        header: 'País',
        size: 120,
        mantineEditTextInputProps: ({ cell }) => ({
          ...getCommonEditTextInputProps(cell),
        }),
      },
      {
        accessorKey: 'provincia',
        header: 'Provincia',
        size: 120,
        mantineEditTextInputProps: ({ cell }) => ({
          ...getCommonEditTextInputProps(cell),
        }),
      },
      {
        accessorKey: 'direccion',
        header: 'Dirección',
        size: 180,
        mantineEditTextInputProps: ({ cell }) => ({
          ...getCommonEditTextInputProps(cell),
        }),
      },
      {
        accessorKey: 'codigoPostal',
        header: 'Código Postal',
        size: 120,
        mantineEditTextInputProps: ({ cell }) => ({
          ...getCommonEditTextInputProps(cell),
        }),
      },
      {
        accessorKey: 'telefono',
        header: 'Teléfono',
        size: 120,
        mantineEditTextInputProps: ({ cell }) => ({
          ...getCommonEditTextInputProps(cell),
        }),
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 180,
        mantineEditTextInputProps: ({ cell }) => ({
          ...getCommonEditTextInputProps(cell),
          type: 'email',
        }),
      },
      {
        accessorKey: 'tipoAlumno',
        header: 'Tipo de Alumno',
        size: 140,
        mantineEditTextInputProps: ({ cell }) => ({
          ...getCommonEditTextInputProps(cell),
        }),
      },
      {
        accessorKey: 'observacion',
        header: 'Observación',
        size: 180,
        mantineEditTextInputProps: ({ cell }) => ({
          ...getCommonEditTextInputProps(cell),
        }),
      },
    ],
    [getCommonEditTextInputProps]
  );

  const setMasInfo = (row) =>{
    alert("Tipo de alumno: " + row.original.tipoAlumno + "\n" + "Observaciones:\n" + row.original.observacion);
  }

  const validateRequired = (value) => !!value.length;
  const validateEmail = (email) =>
    !!email.length &&
    email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  const validateAge = (age) => age >= 7 && age <= 90;
  const validateNroDan = (nroDan) => nroDan <= 8 && nroDan >= 1;
  
  return (
    <>
      <MantineReactTable
        displayColumnDefOptions={{
          'mrt-row-actions': {
            mantineTableHeadCellProps: {
              align: 'center',
            },
            size: 120,
          },
        }}

        initialState={{
          columnVisibility: {
            sexo: false,
            membership: false,
            nroAF: false,
            nroMiembro: false,
            fechaNacimiento: false,
            fechaProximoExamen: false,
            nacionalidad: false,
            provincia: false,
            direccion: false,
            codigoPostal: false,
            telefono: false,
            email: false,
            tipoAlumno: false,
            observacion: false
          },
          isFullScreen:true
        }}
        getSubRows={(originalRow) => originalRow.subRows}
        columns={columns}
        data={tableData}
        enableColumnOrdering
        enableEditing
        // onEditingRowCancel={handleCancelRowEdits}
        enableFullScreenToggle={false}
        renderRowActions={({ row }) => (
          <Box sx={{ display: 'flex', gap: '16px' }}>
            <Tooltip withArrow position="left" label="Editar">
              <ActionIcon onClick={() => {setEditModalOpen(true); setSelectedDan(row);} }>
                <IconEdit />
              </ActionIcon>
            </Tooltip>
            <Tooltip withArrow position="right" label="Eliminar">
              <ActionIcon color="darkred" onClick={() => handleDeleteRow(row)}>
                <IconTrash />
              </ActionIcon>
            </Tooltip>
            <Tooltip withArrow position="right" label="Promocionar">
              <ActionIcon color="darkred" onClick={() => handlePromotion(row)}>
                <IconPlus />
              </ActionIcon>
            </Tooltip>
            <Tooltip withArrow position="right" label="Sensei">
              <ActionIcon color="darked" onClick={() => setMasInfo(row)}>
                <IconInfoCircle />
              </ActionIcon>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button
            color="teal"
            onClick={() => setCreateModalOpen(true)}
            variant="filled"
          >
            Agregar Nuevo Dan
          </Button>
        )}
      />
      <CreateNewDanModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />

      <EditDanModal
        columns={columns}
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSubmit={handleEditRow}
        selectedDan={selectedDan}
        setSelectedDan={setSelectedDan}
      />
    </>
  );
};




export default Tabla;
