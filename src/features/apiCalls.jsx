import axios from "axios";


const urlApi = "http://localhost:8080/api/danes/"

// Obtenemos todos los danes
export const getDanes = async () => {
  try{
    const res = await axios.get(urlApi);
    return res.data;
  } catch(err){
    console.log(err);
    return err;
  }
};

// Obtenemos un dan por ID
export const getDanById = async (id) => {
  try{
    const res = await axios.get(urlApi + id);
    return res.data;
  } catch(err){
    return {error: err.message}
  }
};
// Obtenemos un dan por DNI
export const getDanByDni = async (dni) => {
  try{
    const res = await axios.get(urlApi + "dni/" + dni);
    return res.data;
  } catch(err){
    return {error: err.message}
  }
};

// Creamos un dan
export const createDan = async (dan) => {
  try{
    const res = await axios.post(urlApi, dan);
    return res.data;
  } catch(err){
    console.log(err);
    return {error: err}
  }
};

// Actualizamos un dan
export const updateDan = async (id, dan) => {
  try{
    const res = await axios.put(urlApi + id, dan);
    return res.data;
  } catch(err){
    return{
      error:err,
    };
  }
};

// Borramos un dan
export const deleteDan = async (id) =>{
  try{
    const res = await axios.delete(urlApi + id);
    return res.data;
  } catch(err){
    return {
      error: err
    };
  }
};
