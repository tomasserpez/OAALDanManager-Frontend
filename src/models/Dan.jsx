import { createDan, getDanes, getDanById, updateDan, deleteDan } from '../features/apiCalls';

class Dan {
  constructor(id, NombreApellido, NroDan, NroMiembro, FechaUltimoExamen, FechaProximoExamen, FechaNacimiento, Nacionalidad, Direccion, NroAF, dni){
    this.id = id;
    this.NombreApellido = NombreApellido;
    this.NroDan = NroDan;
    this.NroMiembro = NroMiembro;
    this.FechaUltimoExamen = FechaUltimoExamen;
    this.FechaProximoExamen = FechaProximoExamen;
    this.FechaNacimiento = FechaNacimiento;
    this.Nacionalidad = Nacionalidad;
    this.Direccion = Direccion;
    this.NroAF = NroAF;
    this.Observacion = "";
    this.TipoDeAlumno = "";
    this.dni = dni;
  }

  // CREATE UPDATE DELETE
  static async create(newData) {
    try{
      const createdDan = await createDan(newData);
      return new Dan(
        createdDan.id,
        createdDan.NombreApellido,
        createdDan.NroDan,
        createdDan.NroMiembro,
        createdDan.FechaUltimoExamen,
        createdDan.FechaProximoExamen,
        createdDan.FechaNacimiento,
        createdDan.Nacionalidad,
        createdDan.Direccion,
        createdDan.NroAF,
        createdDan.Observacion,
        createdDan.TipoDeAlumno,
        createdDan.dni
      );
    } catch (error){
      console.log(error);
      throw error;
    }
  }

  async update(updatedData){
    try{
      const updatedDan = await updateDan(this.id, updatedData);
      this.NombreApellido = updatedDan.NombreApellido;
      this.NroDan = updatedDan.NroDan;
      this.NroMiembro = updatedDan.NroMiembro;
      this.FechaUltimoExamen = updatedDan.FechaUltimoExamen;
      this.FechaProximoExamen = updatedDan.FechaProximoExamen;
      this.FechaNacimiento = updatedDan.FechaNacimiento;
      this.Nacionalidad = updatedDan.Nacionalidad;
      this.Direccion = updatedDan.direccion;
      this.NroAF = updatedDan.NroAF;
      this.Observacion = updatedDan.Observacion;
      this.TipoDeAlumno = updatedDan.TipoDeAlumno;
      this.dni = updatedDan.dni;
      return this;
    } catch(error){
      console.log(error);
      throw error;
    }
  }

  async delete(){
    try{
      await deleteDan(this.id);
    }catch(error){
      console.log(error);
      throw error;
    }
  }


// KINDA WEIRD BUT OK IG
  // GET
  static async getAll() {
    try {
      const danesData = await getDanes();
      return danesData.map(dan => new Dan(
        dan.id,
        dan.NombreApellido,
        dan.NroDan,
        dan.NroMiembro,
        dan.FechaUltimoExamen,
        dan.FechaProximoExamen,
        dan.FechaNacimiento,
        dan.Nacionalidad,
        dan.Direccion,
        dan.NroAF,
        dan.Observacion,
        dan.TipoDeAlumno,
        dan.dni
      ));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  static async getById(id) {
    try {
      const danData = await getDanById(urlApi, id);
      return new Dan(
        danData.id,
        danData.NombreApellido,
        danData.NroDan,
        danData.NroMiembro,
        danData.FechaUltimoExamen,
        danData.FechaProximoExamen,
        danData.FechaNacimiento,
        danData.Nacionalidad,
        danData.Direccion,
        danData.NroAF,
        danData.Observacion,
        danData.TipoDeAlumno,
        danData.dni
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };


}



export default Dan;
