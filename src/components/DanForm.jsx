import React, { useState } from 'react';
import { createDan, updateDan } from '../features/apiCalls';

const DanForm = ({ handleSubmitForm, initialValues }) => {
    const [NombreApellido, setNombreApellido] = useState('');
    const [NroDan, setNroDan] = useState('');
    const [NroMiembro, setNroMiembro] = useState('');
    const [FechaUltimoExamen, setFechaUltimoExamen] = useState('');
    const [FechaProximoExamen, setFechaProximoExamen] = useState('');
    const [FechaNacimiento, setFechaNacimiento] = useState('');
    const [Nacionalidad, setNacionalidad] = useState('');
    const [Direccion, setDireccion] = useState('');
    const [NroAF, setNroAF] = useState('');
    const [observacion, setObservacion] = useState('');
    const [TipoDeAlumno, setTipoDeAlumno] = useState('');
    const [dni, setDni] = useState('');
    const [Telefono, setTelefono] = useState('');
    const [Email, setEmail] = useState('');
    const [CodigoPostal, setCodigoPostal] = useState('');
    const [QueDojoPertenece, setQueDojoPertenece] = useState('');
    const [Provincia, setProvincia] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validaciónes...

        // Funcion del componente padre...
        handleSubmitForm({
            NombreApellido,
            NroDan,
            NroMiembro,
            FechaUltimoExamen,
            FechaProximoExamen,
            FechaNacimiento,
            Nacionalidad,
            Direccion,
            NroAF,
            observacion,
            TipoDeAlumno,
            dni,
            Telefono,
            Email,
            CodigoPostal,
            QueDojoPertenece,
            Provincia
        });
    };

        
    return (
        <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nombreApellido">
                    Nombre y Apellido
                </label>
                <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-nombreApellido"
                    type="text"
                    placeholder="Juan Perez"
                    value={NombreApellido}
                    onChange={(e) => setNombreApellido(e.target.value)}
                    required
                />
            </div>
            <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nroDan">
                    Nro Dan
                </label>
                <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-nroDan"
                    value={NroDan}
                    onChange={(e) => setNroDan(e.target.value)}
                    required
                >
                    <option value="">Seleccionar</option>
                    <option value="Shodan">Shodan</option>
                    <option value="Nidan">Nidan</option>
                    <option value="Sandan">Sandan</option>
                    <option value="Yodan">Yodan</option>
                    <option value="Godan">Godan</option>
                    <option value="Rokudan">Rokudan</option>
                    <option value="Nanadan">Nanadan</option>
                    <option value="Hachidan">Hachidan</option>
                </select>
            </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nroMiembro">
                    Nro Miembro
                </label>
                <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-nroMiembro"
                    type="text"
                    placeholder="123456"
                    value={NroMiembro}
                    onChange={(e) => setNroMiembro(e.target.value)}
                    required
                />
            </div>
            <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-fechaUltimoExamen">
                    Fecha del último examen
                </label>
                <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-fechaUltimoExamen"
                    type="date"
                    placeholder="YYYY-MM-DD"
                    value={FechaUltimoExamen}
                    onChange={(e) => setFechaUltimoExamen(e.target.value)}
                    required
                />
            </div>
        </div>
        {initialValues.id && (
            <>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-tipoDeAlumno">
                    Tipo de Alumno
                </label>
                <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-tipoDeAlumno"
                    type="text"
                    placeholder="A"
                    value={TipoDeAlumno}
                    onChange={(e) => setTipoDeAlumno(e.target.value)}
                />
                </div>
                <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-observacion">
                    Observación
                </label>
                <textarea
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-observacion"
                placeholder="Ingrese una observación"
                value={observacion}
                onChange={(e) => setObservacion(e.target.value)}
                ></textarea>
                </div>
            </div>
            </>
        )}
        <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-fechaProximoExamen">
                    Fecha del próximo examen
                </label>
                <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-fechaProximoExamen"
                    type="date"
                    placeholder="YYYY-MM-DD"
                    value={FechaProximoExamen}
                    onChange={(e) => setFechaProximoExamen(e.target.value)}
                />
            </div>
            <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-fechaNacimiento">
                    Fecha de Nacimiento
                </label>
                <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-fechaNacimiento"
                    type="date"
                    placeholder="YYYY-MM-DD"
                    value={FechaNacimiento}
                    onChange={(e) => setFechaNacimiento(e.target.value)}
                    required
                />
            </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nacionalidad">
                    Nacionalidad
                </label>
                <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-nacionalidad"
                    type="text"
                    placeholder="Argentina"
                    value={Nacionalidad}
                    onChange={(e) => setNacionalidad(e.target.value)}
                    required
                />
            </div>
            <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-direccion">
                    Dirección
                </label>
                <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-direccion"
                    type="text"
                    placeholder="Calle 123"
                    value={Direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    required
                />
            </div>

        </div>
        <div className="flex flex-wrap -mx-3 mb-6">            
            <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-provincia">
                Provincia
                </label>
                <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-provincia"
                    type="text"
                    placeholder="Tucuman"
                    value={Provincia}
                    onChange={(e) => setProvincia(e.target.value)}
                    required
                />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-nroAF">
                    Nro AF
                </label>
                <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-nroAF"
                    type="text"
                    placeholder="123456"
                    value={NroAF}
                    onChange={(e) => setNroAF(e.target.value)}
                    required
                />
            </div>
            {initialValues.id && (
            <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-dni">
                DNI
                </label>
                <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-dni"
                type="text"
                placeholder="12345678"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                required
                />
            </div>
            )}
        </div>
            <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-telefono">
                Teléfono
                </label>
                <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-telefono"
                type="text"
                placeholder="+54 9 1234-5678"
                value={Telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
                />
            </div>
            <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
                Email
                </label>
                <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-email"
                type="email"
                placeholder="ejemplo@gmail.com"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </div>
            </div>
        <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-codigoPostal">
                Código Postal
            </label>
            <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-codigoPostal"
                type="text"
                placeholder="1234"
                value={CodigoPostal}
                onChange={(e) => setCodigoPostal(e.target.value)}
                required
            />
            </div>
            <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-queDojoPertenece">
                Que Dojo Pertenece
            </label>
            <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-queDojoPertenece"
                type="text"
                placeholder="Aikikai Dojo"
                value={QueDojoPertenece}
                onChange={(e) => setQueDojoPertenece(e.target.value)}
                required
            />
            </div>
        </div>
        <div className="flex justify-center">
            <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            >
            Guardar
            </button>
        </div>
        </form>
    );
};

export default DanForm;
