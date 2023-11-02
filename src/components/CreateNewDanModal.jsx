import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
    Select,
    Textarea,
  } from '@mantine/core';

import { DateInput } from '@mantine/dates';
import { parse, format } from 'date-fns';

export const CreateNewDanModal = ({ open, columns, onClose, onSubmit }) => {
    const [values, setValues] = useState(() =>
      columns.reduce((acc, column) => {
        acc[column.accessorKey ?? ''] = '';
        return acc;
      }, {})
    );
  
    const handleSubmit = () => {
      setValues({...values, "_id": ''})
      onSubmit(values);
      onClose();
    };


    const renderColumna = (column) =>{
      
      let stringFields = ["nombre", "apellido", "sexo", "nacionalidad", "queDojoPertenece", "pais", "provincia", "direccion", "telefono", "codigoPostal", "email"];
      let numberFields = ["membership", "nroMiembro", "nroAF", "dni"];
      let dateFields = ["fechaUltimoExamen", "fechaProximoExamen", "fechaNacimiento"];
      if(stringFields.includes(column.accessorKey)){
        return(
          <>
            <TextInput
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                onChange={(e)=>
                  setValues({...values, [e.target.name]: e.target.value})
                }
            />
          </>
        )
      };
      if(numberFields.includes(column.accessorKey)){
        return(
        <>
          <TextInput
              key={column.accessorKey}
              label={column.header}
              type='number'
              name={column.accessorKey}
              onChange={(e)=>
                setValues({...values, [e.target.name]: e.target.value})
              }
          />
        </>
        );
      };

      if(dateFields.includes(column.accessorKey)){
        
        return(
          <>
            <DateInput
              label={column.header}
              onChange={(nuevaFecha) => 
                setValues({...values, [column.accessorKey]: format(nuevaFecha, 'yyyy-MM-dd')})
              }
              valueFormat='YYYY-MM-DD'
            />
          </>
        )
      }

      // nroDan tipoAlumno observacion
      if(column.accessorKey == "nroDan"){
        return(
          <>
            <Select
              data={[
                {value: 1, label: 1},
                {value: 2, label: 2},
                {value: 3, label: 3},
                {value: 4, label: 4},
                {value: 5, label: 5},
                {value: 6, label: 6},
                {value: 7, label: 7},
                {value: 8, label: 8},
              ]}
              placeholder='Seleccione numero de Dan'
              label='Numero de Dan'
              onChange={nro => {setValues({...values, [column.accessorKey]: nro})}}
            />
          </>
        )
      }

    }
  
    return (
      <Dialog opened={open}
        sx={{
          width:"100%"
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
              renderColumna(column)
            ))}
          </Stack>
        </form>
        <Flex
          sx={{
            padding: '10px',
            width: '100%',
            justifyContent: 'flex-center',
            gap: '16px',
          }}
        >
          <Button onClick={onClose} variant="subtle">
            Cancelar
          </Button>
          <Button color="teal" className="bg-teal-500" onClick={handleSubmit} variant="filled">
            Agregar Nuevo Dan
          </Button>
        </Flex>
      </Dialog>
    );
  };