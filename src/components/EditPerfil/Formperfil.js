import "../../assets/css/Formperfil.css";
import Swal from "sweetalert2";
import Input from "../ImputForm/Inputs";
import {useState, useEffect} from "react";
import {MensajeError} from "../FormPerfil/Formularios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import Cookies from 'universal-cookie';

let Formperfil=(userId)=>{

    const url="http://localhost:4000/users";
    
    const cookies = new Cookies();

    userId = cookies.get('_id');

    const getData=async()=>{
        const response=axios.get(`${url}/${userId}`);
        return response;
    }

    const [list,setList]=useState([]);
    const [upList, setUpList]=useState(false);
    const [email, cambiarEmail] = useState({campo: '', valido: null});
    const [telefono, cambiarTelefono] = useState({campo: '', valido: null});
    const [formularioValido,cambiarFormularioValido]= useState(null);

    const expresiones = {
		correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
		telefono: /^\d{7,14}$/ // 7 a 14 numeros.
	}

    const actualizarDatos=async(e)=>{
        e.preventDefault();

        if (
            email.valido === 'true' &&
		    telefono.valido === 'true') {

                const response=await axios.put(`${url}/${userId}`,{
                    id: userId,
                    tipodoc: cookies.get('tipodoc'),
                    numdoc: cookies.get('numdoc'),
                    nombre: cookies.get('nombre'),
                    apellido: cookies.get('apellido'),
                    fnacimiento: cookies.get('fnacimiento'),
                    genero: cookies.get('genero'),
                    email:email.campo,
                    telefono:telefono.campo,
                    paisorigen: cookies.get('paisorigen'),
                    password: cookies.get('password'),
                    tipouser: cookies.get('tipouser'),
                    img:cookies.get('img')
                });

                if (response.status===200) {

                    cambiarEmail({campo: '', valido: null});
                    cambiarTelefono({campo: '', valido: null});
                    cambiarFormularioValido(true);
        
                    Swal.fire(
                    'Información actualizada',
                    'Su información de perfil ha sido actualizada correctamente!',
                    'success'
                    )
        
                    setUpList(!upList); 

                    cookies.set('email', response.email, {path: "/perfil"});
                    cookies.set('telefono', response.telefono, {path: "/perfil"});
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
        
        <section className="form-modify-profile">
            <p className="tbienvenida-f">DATOS DE CONTACTO</p>
                <form action="" onSubmit={actualizarDatos}>

                <div className="form-sections-profile">
                    <div className="form-sections-profile">
                        <Input
                        className="editinput"
                        label="Correo electrónico"
                        tipo="email"
                        name="email"
                        estado={email}
                        cambiarEstado={cambiarEmail}
                        expresionRegular={expresiones.correo}
                        leyendaError="Por favor ingrese un correo valido por ejemplo: correo@hotelia.com"
                        placeholder={cookies.get('email')}/>
                    </div>
                    <div className="form-sections-profile">
                        <Input
                        className="editinput"
                        label="Télefono de contacto"
                        tipo="number"
                        name="telefono"
                        estado={telefono}
                        cambiarEstado={cambiarTelefono}
                        expresionRegular={expresiones.telefono}
                        leyendaError="Por favor ingrese su número de contacto de 7 a 10 numeros."
                        placeholder={cookies.get('telefono')}/>
                    </div>
                </div>

                {formularioValido===false && <MensajeError>
                <p> <FontAwesomeIcon icon={faExclamationTriangle}/>
                <b>Error:</b> Por favor diligenciar el formulario correctamente.</p>
                </MensajeError>}
                
                <div className="form-profile-button">
                    <button type="submit" className="general-button">ACTUALIZAR</button>
                </div>
            </form>
        </section>
    )
}

export default Formperfil;