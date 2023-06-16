import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import DanForm from '../components/DanForm';
import { createDan } from '../features/apiCalls';

const Create = () => {

  const [initialValues, setInitialValues] = useState({
    NombreApellido: '',
    NroDan: '',
    NroMiembro: '',
    FechaUltimoExamen: '',
    FechaProximoExamen: '',
    FechaNacimiento: '',
    Nacionalidad: '',
    Direccion: '',
    NroAF: '',
    Observacion: '-',
    TipoDeAlumno: '-',
    dni: '',
    Telefono: '',
    Email: '',
    CodigoPostal: '',
    QueDojoPertenece: '',
    Provincia: ''
  });

  const handleSubmitForm = async (formValues) => {
    try{
      const confirmCreation = window.confirm("Estas seguro de que quiere crear este dan?");
      if(confirmCreation){
        await createDan(formValues);
        alert("Dan creado con exito");
      }else{
        alert("Dan no creado");
      }
    }catch(err){
      alert("Error al crear el dan");
      console.log(err);
    }

    location.reload();
  };



  return (
    <div>
      <Navbar />
      <div
        className="flex flex-col items-center justify-center"
      >
        <DanForm
          handleSubmitForm={handleSubmitForm}
          initialValues={initialValues}
        />
      </div>
    </div>
  );
};

export default Create;
