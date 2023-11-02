import React, {useState} from "react";
import axios from "axios";

const Login = () => {

    //Mensaje de error y exito
    const [errorMessage, setErrorMessage] = useState({});




    const renderErrorMessage = (name) =>
        name === errorMessage.name && (
            <div className="error">{errorMessage.message}</div>
        );

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            setErrorMessage({})
            let { uname, pass } = document.forms[0];
            let data = {
                "username": uname.value,
                "password": pass.value,
                "email": "tomasserpez@gmail.com"
            }
            const response = await axios.post(import.meta.env.VITE_AUTH + '/signin',
                data
                )


            localStorage.setItem('token', response.data.token);
            location.reload();
        }
        catch (e) {
            setErrorMessage({name: "uname", message: "Nombre de usuario o contraseña incorrecto."})
        }

    }

    return (
        <>
            <div className="flex justify-center items-center bg-blue-200 h-screen w-screen flex-col">

                <img
                    src="https://aikidoargentina.org/wp-content/uploads/2022/08/logo_160x160-C.png"
                    className="w-48 mb-10"

                />

                <p className="font-bold text-red-600 mb-5 text-xl ">{renderErrorMessage("uname")}</p>


                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-md font-bold mb-2">Nombre de usuario:</label>

                        <input className="shadow appearance-none  bg-gray-50 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="uname" required />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-md font-bold mb-2">Contraseña:</label>
                        <input className="shadow appearance-none  bg-gray-50 border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" name="pass" required />
                    </div>
                    <div className="flex items-center justify-between">
                        <input value="Entrar" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit"  />
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;