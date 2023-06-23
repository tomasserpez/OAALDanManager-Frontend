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
  } from '@mantine/core';


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
              <TextInput
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                value={values[column.accessorKey] || ''}
                onChange={(e)=>
                  setValues({...values, [e.target.name]: e.target.value})
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
          Guardar Cambios
        </Button>
        </Flex>
      </Dialog>
    )
  }