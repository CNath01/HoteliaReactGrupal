import React, { useState } from 'react';
import axios from 'axios';

import '../assets/css/FormReg.css';

import imagotypeWhite from '../assets/img/imagotype-white.png';

import {
    Label,
    RegistrationForm,
    ButtonContainer,
    SaveButton,
    SuccessMessage,
    ErrorMessage,
    Select,
    MenuItem,
    GroupInput,
    ContainerTerminos
} from '../assets/elements/RegistrationForm';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import Input from '../components/registrationForm/Input';
import countryArr from '../components/registrationForm/CountrySelect';
import TipoDoc from '../components/registrationForm/TipoDocSelect';
import Genero from '../components/registrationForm/GeneroSelect';
import { Link } from 'react-router-dom';
import ModalTyC from '../components/registrationForm/ModalTyC';

const Form = () => {

    const [selectedCountry, setSelectedCountry] = useState("");
    const selectCountryHandler = (value) => setSelectedCountry(value);
    const [nombre, cambiarNombre] = useState({ campo: "", valido: null });
    const [apellido, cambiarApellido] = useState({ campo: "", valido: null });
    const [numDocumento, cambiarNumDocumento] = useState({ campo: "", valido: null });
    const [correo, cambiarCorreo] = useState({ campo: "", valido: null });
    const [fecha, cambiarFecha] = useState({ campo: "", valido: null });
    const [telefono, cambiarTelefono] = useState({ campo: "", valido: null });
    const [password, cambiarPassword] = useState({ campo: "", valido: null });
    const [password2, cambiarPassword2] = useState({ campo: "", valido: null });
    const [terminos, cambiarTerminos] = useState(false);
    const [validForm, changeValidForm] = useState(null);

    const expressions = {
        textos: /^[a-zA-Z A\s]{1,50}$/, //Letras, min, mayus, tildadas,dieresis, espacios de 1 a 50 caracteres        
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        telefono: /^\d{7,14}$/, // 7 a 14 numeros.
        numdoc: /^\d{5,10}$/, // 5 a 10 numeros.
        password: /^(?=.*\d)(?=.*[#*$-+&!%@])(?=.*[A-Z])(?=.*[a-z]).{8,}$/,
        fecha: /^([0][1-9]|[12][0-9]|3[01])(\/|-)([0][1-9]|[1][0-2])\2(\d{4})$/
    };

    const validarPassword2 = () => {
        if (password.campo.length > 0) {
            if (password.campo !== password2.campo) {
                cambiarPassword2((prevState) => {
                    return { ...prevState, valido: 'false' }
                });
            } else {
                cambiarPassword2((prevState) => {
                    return { ...prevState, valido: 'true' }
                });
            }
        }
    }

    const onChangeTerminos = (e) => {
        cambiarTerminos(e.target.checked);
    };


    /*function calcularEdad(fecha) {
        var hoy = new Date();
        console.log(hoy);
        var cumpleanos = new Date(fecha);
        var edad = hoy.getFullYear() - cumpleanos.getFullYear();
        console.log(edad);
        var m = hoy.getMonth() - cumpleanos.getMonth();
        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--;
        }
        return edad;
    }
    
    var edad = calcularEdad(fecha.valido);
    if(edad >= 18){
        alert("Eres mayor de edad :D ");
    }else{
        alert("Eres menor de edad :( ");    
    }*/

    const [statusModal, changeStatusModal] = useState(false);


    const [data, setData] = useState({
        _id: "",
        nombre: "",
        apellido: "",
        img: "",
        tipodoc: "",
        email: "",
        genero: "",
        paisorigen: "",
        telefono: "",
        password: "",
        fnacimiento: ""
    })

    const handleChange = ({ target }) => {
        setData({
            ...data,
            [target.name]
                : target.value
        })
    }

    const url = "https://app-hoteliakuepa.herokuapp.com/users";

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            nombre.valido === 'true' &&
            apellido.valido === 'true' &&
            correo.valido === 'true' &&
            fecha.valido === 'true' &&
            telefono.valido === 'true' &&
            numDocumento.valido === 'true' &&
            password.valido === 'true' &&
            password2.valido === 'true' &&
            terminos

        ) {
            changeValidForm(true);
            cambiarNombre({ campo: '', valido: null });
            cambiarApellido({ campo: '', valido: null });
            cambiarCorreo({ campo: '', valido: null });
            cambiarFecha({ campo: '', valido: null });
            cambiarPassword({ campo: '', valido: null });
            cambiarPassword2({ campo: '', valido: null });
            cambiarTelefono({ campo: '', valido: null });
        } else {
            changeValidForm(false);
        }
        const response = await axios.post(url, data);
        if (response.status === 201) {
            console.log('formulario enviado');
        } else {
            console.log('formulario no enviado');
        }
    }
    return (
        <main className='containerForm'>
            <div className='ReturnContainer'>
                <Link to="/Hotelia/Login"> <i class="fa-solid fa-circle-arrow-left return"></i></Link>
            </div>
            <RegistrationForm action='' onSubmit={ handleSubmit}>
                <div className='headerForm'>
                    <img src={imagotypeWhite} alt="imagotypeWhite" />
                    <Link to="/Hotelia/Login"><i class="fa-solid fa-circle-arrow-left"></i></Link>
                </div>
                <h1 className='title-Form'>REGISTRO DE NUEVO USUARIO</h1>
                <div className='grid'>
                    <GroupInput>
                        <Label>Agregar Foto (opcional)</Label>
                        <input
                            className='file'
                            type="file"
                            name="img"
                            onChange={handleChange}
                        />
                    </GroupInput>
                    <Input
                        estado={nombre}
                        cambiarEstado={cambiarNombre}
                        type="text"
                        name="nombre"
                        label="Nombre"
                        placeholder="Karen Lucia"
                        errorLegend="El nombre solo puede contener letras y espacios."
                        regularPhrase={expressions.textos}
                        onChange={handleChange}
                    />
                    <Input
                        estado={apellido}
                        cambiarEstado={cambiarApellido}
                        type="text"
                        name="apellido"
                        label="Apellido"
                        placeholder="Lopez Perez"
                        errorLegend="El apellido solo puede contener letras y espacios."
                        regularPhrase={expressions.textos}
                        onChange={handleChange}
                    />
                    <TipoDoc
                    onChange={handleChange} />
                    <Input
                        estado={numDocumento}
                        cambiarEstado={cambiarNumDocumento}
                        type="text"
                        name="_id"
                        label="Número de documento"
                        placeholder="1234567890"
                        errorLegend="El número de documento solo puede contener números, mínimo 5 y máximo son 1O dígitos. "
                        regularPhrase={expressions.numdoc}
                        onChange={handleChange}
                    />
                    <Input
                        estado={correo}
                        cambiarEstado={cambiarCorreo}
                        type="email"
                        name="email"
                        label="Correo Electrónico"
                        placeholder="correo@dominio.com"
                        errorLegend="El correo solo puede contener letras, numeros, puntos, guiones y guion bajo."
                        regularPhrase={expressions.correo}
                        onChange={handleChange}
                    />
                    <Input
                        estado={fecha}
                        cambiarEstado={cambiarFecha}
                        type="date"
                        name="fnacimiento"
                        label="Fecha de nacimiento"
                        errorLegend="Ingresa tu fecha de nacimiento."
                        regularPhrase={expressions.fecha}
                        /*funcion ={calcularEdad}*/
                        onChange={handleChange}
                    />
                    <Genero 
                    onChange={handleChange}/>
                    <GroupInput>
                        <Label>País de origen</Label>
                        <div>
                            <Select
                                name="paisorigen"
                                value={selectedCountry}
                                onChange={[(e) => selectCountryHandler(e.target.value),handleChange]} 
                            >
                                <MenuItem>Selecciona una opción</MenuItem>
                                {!!countryArr?.length &&
                                    countryArr.map(({ label, value }) => (
                                        <MenuItem 
                                        key={value} 
                                        value={value} >
                                            {label}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </div>
                    </GroupInput>
                    <Input
                        estado={telefono}
                        cambiarEstado={cambiarTelefono}
                        type="text"
                        name="telefono"
                        label="Teléfono de contacto"
                        placeholder="1234567"
                        errorLegend="El teléfono solo puede contener números, mínimo 7 y máximo son 14 dígitos."
                        regularPhrase={expressions.telefono}
                        onChange={handleChange}
                    />
                    <Input
                        estado={password}
                        cambiarEstado={cambiarPassword}
                        type="password"
                        name="password"
                        label="Contraseña"
                        placeholder="1234567"
                        errorLegend="La contraseña debe terner mínimo 8 caractares donde sea 1 mayúscula, 1 minúscula, 1 número y 1 caracter especial "
                        regularPhrase={expressions.password}
                        onChange={handleChange}
                    />
                    <Input
                        estado={password2}
                        cambiarEstado={cambiarPassword2}
                        type="password"
                        name="password2"
                        label="Confirmar contraseña"
                        placeholder="1234567"
                        errorLegend="Ambas contraseñas deben ser iguales."
                        funcion={validarPassword2}
                    />
                    </div>
                    <ContainerTerminos>
                        <Label>
                            <input
                                type="checkbox"
                                name="terminos"
                                id="terminos"
                                checked={terminos}
                                onChange={onChangeTerminos}
                            />
                            Acepto los <span onClick={() => changeStatusModal(!statusModal)}>Términos y Condiciones</span>.
                        </Label>
                    </ContainerTerminos>

                {validForm === false && <ErrorMessage>
                    <p>
                        <FontAwesomeIcon icon={faExclamationTriangle} />
                        <b>Error: </b>Por favor diligencia el formulario correctamente.
                    </p>
                </ErrorMessage>}
                <ButtonContainer>
                    <SaveButton>GUARDAR</SaveButton>
                    {validForm === true && <SuccessMessage>Registraste tus datos correctamente.</SuccessMessage>}
                </ButtonContainer>
            </RegistrationForm>
            <ModalTyC
                status={statusModal}
                changeStatus={changeStatusModal}
            >
                lorem ipsum dolor sit amet, consectetur adipiscing  elit,lorem ipsum dolor sit amet, consectetur adipiscing elit,lorem ipsum dolor sit amet, consectetur adipiscing elit    ,lorem ipsum dolor sit amet,        consectetur adipiscing elit    ,lorem ipsum dolor sit amet,     consectetur adipiscing elit    ,lorem ipsum dolor sit amet, consectetur adipiscing elit    ,lorem ipsum dolor sit amet, consectetur adipiscing elit    ,lorem ipsum dolor sit amet, consectetur adipiscing elit    ,lorem ipsum dolor sit amet, consectetur adipiscing elit    ,lorem ipsum dolor sit amet, consectetur adipiscing elit    ,lorem ipsum dolor sit amet, consectetur adipiscing elit    ,lorem ipsum dolor sit amet, consectetur adipiscing elit    ,lorem ipsum dolor sit amet, consectetur adipiscing elit    ,lorem ipsum dolor sit amet, consectetur adipiscing elit    ,lorem ipsum dolor sit amet, consectetur adipiscing elit    ,lorem ipsum dolor sit amet, consectetur adipiscing elit    ,lorem ipsum dolor sit amet, consectetur adipiscing elit    ,lorem ipsum dolor sit amet.
                
                <button>ACEPTAR</button>
            </ModalTyC>
        </main >

    );
}



export default Form;