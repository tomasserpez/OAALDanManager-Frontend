import {useState} from "react";
import axios from "axios";

const Login = () => {

    //Mensaje de error y exito
    const [errorMessage, setErrorMessage] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [pwd, setPwd] = useState([])


    const renderErrorMessage = (name) =>
        name === errorMessage.name && (
            <div className="error">{errorMessage.message}</div>
        );

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            let { uname, pass } = document.forms[0];
            console.log(uname.value, pass.value)
            let data = {
                "username": uname.value,
                "password": pass.value,
                "email": "tomasserpez@gmail.com"
            }
            const response = await axios.post(import.meta.env.VITE_AUTH + '/signin',
                data
                )

            console.log(response.data.token)
            localStorage.setItem('token', response.data.token);
        }
        catch (e) {
            console.log(e);
        }

    }

    return (
        <>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label>Nombre de usuario:</label>
                        <input type="text" name="uname" required />
                        {renderErrorMessage("uname")}
                    </div>
                    <div className="input-container">
                        <label>Contraseña:</label>
                        <input type="password" name="pass" required />
                        {renderErrorMessage("pass")}
                    </div>
                    <div className="button-container">
                        <input type="submit" />
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;