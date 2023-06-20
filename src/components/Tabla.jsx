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
import { IconTrash, IconEdit, IconPlus, IconArrowAutofitUp, IconUserPlus } from '@tabler/icons-react';
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
        accessorKey: '_id',
        header: 'ID',
        enableColumnOrdering: false,
        enableEditing: false,
        enableSorting: false,
        size: 80,
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
        columns={columns}
        data={tableData}
        editingMode="modal"
        enableColumnOrdering
        enableEditing
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '16px' }}>
            <Tooltip withArrow position="left" label="Editar">
              <ActionIcon onClick={() => table.setEditingRow(row)}>
                <IconEdit />
              </ActionIcon>
            </Tooltip>
            <Tooltip withArrow position="right" label="Eliminar">
              <ActionIcon color="darkred" onClick={() => handleDeleteRow(row)}>
                <IconTrash />
              </ActionIcon>
            </Tooltip>
            <Tooltip withArrow position="right" label="Promocionar">
              <ActionIcon color="darkred" onClick={() => handleDeleteRow(row)}>
                <IconPlus />
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
    <Dialog opened={open}>
      <Title ta="center">Agregar Nuevo Dan</Title>
      <form onSubmit={(e) => e.preventDefault()}>
        <Stack
          sx={{
            width: '100%',
            gap: '24px',
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
          justifyContent: 'flex-end',
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
