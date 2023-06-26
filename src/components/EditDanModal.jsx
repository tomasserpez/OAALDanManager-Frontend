import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { parse } from 'date-fns';
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


export const EditDanModal = ({ open, columns, selectedDan, onClose, onSubmit }) => {
    const [values, setValues] = useState(() =>
      columns.reduce((acc, column) => {
        acc[column.accessorKey ?? ''] = '';
        return acc;
      }, {})
    );
    
    useEffect(()=>{
        if(selectedDan){
            setValues(selectedDan.original);
        }
    }, [selectedDan]);

    const handleSubmit = () => {
        console.log(values._id)
        onSubmit(values);
        onClose()
    }
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
                value={values[column.accessorKey] || ''}
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
              value={values[column.accessorKey] || ''}
              onChange={(e)=>
                setValues({...values, [e.target.name]: e.target.value})
              }
          />
        </>
        );
      };

      if(dateFields.includes(column.accessorKey)){
        const fecha = new Date(values[column.accessorKey]);
        const fechaFormateada = (fechaCruda) => { parse(fechaCruda, 'yyyy-MM-dd', new Date()); }
        
        return(
          <>
            <DateInput
              value={fecha}
              label={column.header}
              onChange={(nuevaFecha) => 
                setValues({...values, [column.accessorKey]: parse(nuevaFecha, 'yyyy-MM-dd', new Date())})
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
              value={values[column.accessorKey]}
              label='Numero de Dan'
              onChange={nro => {setValues({...values, [column.accessorKey]: nro})}}
            />
          </>
        )
      }

      if(column.accessorKey == "tipoAlumno"){
        return(
          <>
            <Select
              data={[
                {value: "A", label: "A"},
                {value: "B", label: "B"},
                {value: "C", label: "C"},
                {value: "D", label: "D"},
              ]}
              label='Tipo de Alumno'
              placeholder='Seleccione que tipo de alumno es'
              value={values[column.accessorKey]}
              onChange={tipo => {setValues({...values, [column.accessorKey]: tipo})}}
            />
          </>
        )
      }

      if(column.accessorKey == "observacion"){
        return(
          <>
            <Textarea
              placeholder='Escriba las observaciones sobre el alumno'
              label='Observaciones'
              onChange={observacion => {setValues({...values, [column.accessorKey]: obsrevacion})}}
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
        <Title ta="center">Editar Dan</Title>
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
          Guardar Cambios
        </Button>
        </Flex>
      </Dialog>
    )
  }