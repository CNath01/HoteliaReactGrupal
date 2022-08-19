import "../assets/css/Editarcontrasena.css";
import Swal from "sweetalert2";
import Input from "../components/ImputForm/Inputs";
import {useState, useEffect} from "react";
import {MensajeError} from "../components/FormPerfil/Formularios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';
import Cookies from 'universal-cookie';
import axios from "axios";

let EditarContrasena=(userId,userPassword)=>{

    const url="http://localhost:4000/users";

    const cookies = new Cookies();

    userId = cookies.get('_id');
    userPassword= cookies.get('password');

    console.log(userPassword);
    const getData=async()=>{
        const response=axios.put(`${url}/${userId}`);
        return response;
    }

    const [contraseniaActual, cambiarContraseniaActual] = useState({campo: '', valido: null});
	const [contrasenianueva, cambiarContraseniaNueva] = useState({campo: '', valido: null});
    const [contraseniaNueva2, cambiarContraseniaNueva2] = useState({campo: '', valido: null});
    const [formularioValido,cambiarFormularioValido]= useState(null);
    const [list,setList]=useState([]);
    const [upList, setUpList]=useState(false);

    const expresion = {
		password: /^.{4,12}$/, // 4 a 12 digitos.
	}

    const validarContrasenia2=()=>{
        if(contrasenianueva.campo.length>0){
        if(contrasenianueva.campo!==contraseniaNueva2.campo){
            cambiarContraseniaNueva2((prevState)=>{
            return{...prevState,valido:'false'}
            });
        }else{
            cambiarContraseniaNueva2((prevState)=>{
            return{...prevState,valido:'true'}
            });
        }
        }
    }

    const changePassword=async(e)=>{
        e.preventDefault();

        if (
            userPassword===contraseniaActual.campo &&
            contraseniaActual.valido === 'true' &&
            contrasenianueva.valido === 'true' &&
            contraseniaNueva2.valido === 'true') {

                const response=await axios.get(`${url}/${userId}`,{
                    id: userId,
                    password: contrasenianueva.campo,
                });

                if (response.status===200) {

                    cambiarContraseniaActual({campo: '', valido: null});
                    cambiarContraseniaNueva({campo: '', valido: null});
                    cambiarContraseniaNueva2({campo: '', valido: 'null'});
                    cambiarFormularioValido(true);

                    setUpList(!upList);

                    Swal.fire(
                        'Contraseña actualizada',
                        'Su contraseña ha sido actualizada correctamente!',
                        'success'
                    )

                    // Cierre de sesión usuario
                    cookies.remove('_id', {path: "/login"});
                    cookies.remove('tipodoc', {path: "/login"});
                    cookies.remove('numdoc', {path: "/login"});
                    cookies.remove('nombre', {path: "/login"});
                    cookies.remove('apellido', {path: "/login"});
                    cookies.remove('fnacimiento', {path: "/login"});
                    cookies.remove('genero', {path: "/login"});
                    cookies.remove('email', {path: "/login"});
                    cookies.remove('telefono', {path: "/login"});
                    cookies.remove('password', {path: "/login"});
                    cookies.remove('tipouser', {path: "/login"});
                    cookies.remove('img', {path: "/login"});
                    window.location.href='./login';
                }
        } else{
            cambiarFormularioValido(false);
        }
    }

    useEffect(()=>{
        getData().then((response)=>{
            setList(response.data);
        })
    },[upList]);

    console.log(list);

    return(

        <section className="password-section">
            <p className="tbienvenida-f">EDITAR CONTRASEÑA</p>

            <form action="" onSubmit={changePassword} className="form-change-password">
                <div className="passw">
                    <Input
                    label="Contraseña actual"
                    tipo="password"
                    name="contraseniaActual"
                    estado={contraseniaActual}
                    cambiarEstado={cambiarContraseniaActual}
                    expresionRegular={expresion.password}
                    leyendaError="La contraseña tiene que ser de 4 a 12 dígitos."/>
                </div>
                <div className="passw">
                    <Input
                    label="Contraseña nueva"
                    tipo="password"
                    name="contrasenianueva"
                    estado={contrasenianueva}
                    cambiarEstado={cambiarContraseniaNueva}
                    expresionRegular={expresion.password}
                    leyendaError="La contraseña tiene que ser de 4 a 12 dígitos."/>
                </div>
                <div className="passw">
                    <Input
                    label="Confirmar contraseña nueva"
                    tipo="password"
                    name="contraseniaNueva2"
                    estado={contraseniaNueva2}
                    cambiarEstado={cambiarContraseniaNueva2}
                    funcion={validarContrasenia2}
                    leyendaError="Ambas contraseñas deben ser iguales."/>
                </div>

                {formularioValido===false && <MensajeError>
                <p>
                <FontAwesomeIcon icon={faExclamationTriangle}/>
                <b>Error:</b> Por favor diligenciar el formulario correctamente o validar la digitación de su contraseña actual.</p>
                </MensajeError>}

                <div className="form-password-button">
                    <button type="submit" className="general-button">ACTUALIZAR</button>
                </div>
            </form>
        </section>
    )
}

export default EditarContrasena;