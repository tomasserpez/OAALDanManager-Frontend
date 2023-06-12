import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getDanById, updateDan } from '../features/apiCalls';

import Navbar from '../components/Navbar';
import DanForm from '../components/DanForm';



const Update = () => {

  const { id } = useParams();
  const [ initialValues, setInitialValues ] = useState({
    NombreApellido: '-',
    NroDan: '',
    NroMiembro: '-',
    FechaUltimoExamen: '',
    FechaProximoExamen: '',
    FechaNacimiento: '',
    Nacionalidad: '',
    Direccion: '',
    NroAF: '-',
    Observacion: '-',
    TipoDeAlumno: '-',
    dni: '-',
    Telefono: '',
    Email: '',
    CodigoPostal: '',
    QueDojoPertenece: '',
    Provincia: ''
  });

  useEffect(() => {
    const fetchDan = async () => {
      try {
        const dan = await getDanById(id);
        setInitialValues(dan);
      }
      catch (err) {
        window.alert("Error al obtener el Dan");
        console.log(err);
      }
  };

    fetchDan();
}, [id]);

const handleSubmitForm = async (e) => {
  e.preventDefault();
  try{
    const updateConfirmation = window.confirm("¿Estás seguro de que deseas actualizar el Dan?");
    if (updateConfirmation) {
      await updateDan(id, initialValues);
      window.alert("Dan actualizado con éxito");
    }else{
      window.alert("El dan no se ha actualizado.");
    }
  }
  catch(error){
    window.alert("Error al actualizar el Dan");
    console.log(err);
  }
}

  return (
    <>
      <Navbar />
      <div
        className="flex flex-col items-center justify-center"
      >
      <DanForm 
        handleSubmitForm={handleSubmitForm}
        initialValues={initialValues} 
      />
      </div>
    </>
  )
}

export default Update