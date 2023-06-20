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
// import { data, states } from './makeData';

const Example = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  const fetchDanes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/danes');
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
      const response = await axios.post('http://localhost:8080/danes', values);
      setTableData([...tableData, response.data]);
      setCreateModalOpen(false);
    } catch (error) {
      console.error('Error al agregar un dan:', error);
    }
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      try {
        const response = await axios.put(
          `http://localhost:8080/danes/${row.original._id}`,
          values
        );
        tableData[row.index] = response.data;
        setTableData([...tableData]);
        exitEditingMode();
      } catch (error) {
        console.error('Error al actualizar un dan:', error);
      }
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    async (row) => {
      if (
        !window.confirm(`¿Estás seguro de que quieres eliminar el dan?`)
      ) {
        return;
      }
      try {
        await axios.delete(`http://localhost:8080/danes/${row.original._id}`);
        tableData.splice(row.index, 1);
        setTableData([...tableData]);
      } catch (error) {
        console.error('Error al eliminar un dan:', error);
      }
    },
    [tableData]
  );

  const getCommonEditTextInputProps = useCallback(
    (cell) => {
      return {
        error: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === 'email'
              ? validateEmail(event.target.value)
              : cell.column.id === 'age'
              ? validateAge(+event.target.value)
              : validateRequired(event.target.value);
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
      },
      {
        accessorKey: 'fechaNacimiento',
        header: 'Fecha de Nacimiento',
        mantineEditTextInputProps: ({ cell }) => ({
          ...getCommonEditTextInputProps(cell),
        }),
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

  const validateRequired = (value) => !!value.length;
  const validateEmail = (email) =>
    !!email.length &&
    email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  const validateAge = (age) => age >= 18 && age <= 50;

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
        editingMode="modal"
        enableColumnOrdering
        enableEditing={true}
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '16px' }}>
            <Tooltip withArrow position="left" label="Editar">
              <ActionIcon onClick={() => table.setEditingModalOpen(row)}>
                <IconEdit />
              </ActionIcon>
            </Tooltip>
            <Tooltip withArrow position="right" label="Eliminar">
              <ActionIcon color="darkred" onClick={() => handleDeleteRow(true,row)}>
                <IconTrash />
              </ActionIcon>
            </Tooltip>
            <Tooltip withArrow position="right" label="Promocionar">
              <ActionIcon color="darkred" onClick={() => handlePromoteRow(row)}>
                <IconPlus />
              </ActionIcon>
            </Tooltip>
            <Tooltip withArrow position="right" label="Sensei">
              <ActionIcon color="darked" onClick={() => setMasInfoModalOpen(true,row)}>
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
    </>
  );
};

export const CreateNewDanModal = ({ open, columns, onClose, onSubmit }) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ''] = '';
      return acc;
    }, {})
  );

  const handleSubmit = () => {
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog opened={open}
      sx={{
        width: '500px'
      }}
    >
      <Title ta="center">Agregar Nuevo Dan</Title>
      <form onSubmit={(e) => e.preventDefault()}>
        <Stack
          sx={{
            width: '100%',
            display: 'grid',
            gap: "14px",
            gridTemplateColumns: 'repeat(3, 1fr)',
            
          }}
        >
          {columns.map((column) => (
            <TextInput
              key={column.accessorKey}
              label={column.header}
              name={column.accessorKey}
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          ))}
        </Stack>
      </form>
      <Flex
        sx={{
          padding: '20px',
          width: '100%',
          justifyContent: 'flex-center',
          gap: '16px',
        }}
      >
        <Button onClick={onClose} variant="subtle">
          Cancelar
        </Button>
        <Button color="teal" onClick={handleSubmit} variant="filled">
          Agregar Nuevo Dan
        </Button>
      </Flex>
    </Dialog>
  );
};

export default Example;
