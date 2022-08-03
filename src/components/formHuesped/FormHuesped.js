import React, { useState } from 'react';
import axios from 'axios';
import { Formulario, Label, ContenedorTerminos, ContenedorBotonCentrado, Boton, MensajeExito, MensajeError } from './../formHuesped/Formulario';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import '../formHuesped/FormHuesped.css'
import logHotelia from '../assets/img/LogoHotelia.png';
import Input from './../assets/components/imputs';
import Select from './../assets/components/imputs';

const App = () => {
    const [nombre, cambiarNombre] = useState({ campo: '', valido: null });
    const [apellido, cambiarApellido] = useState({ campo: '', valido: null });
    const [tipodoc, cambiarTipodoc] = useState({ campo: '', valido: null });
    const [genero, cambiarGenero] = useState({ campo: '', valido: null });
    const [documento, cambiarDocumento] = useState({ campo: '', valido: null });
    const [fecha, cambiarFecha] = useState({ campo: '', valido: null });
    const [correo, cambiarCorreo] = useState({ campo: '', valido: null });
    const [telefono, cambiarTelefono] = useState({ campo: '', valido: null });
    const [archivo, cambiarArchivo] = useState({ campo: '', valido: null });
    const [passw, cambiarPassw] = useState({ campo: '', valido: null });
    const [terminos, cambiarTerminos] = useState(false);
    const [formularioValido, cambiarFormularioValido] = useState(null);

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

    // const url = "https://app-hoteliakuepa.herokuapp.com/users";
    // const url =  "https://hoteliakuepa.herokuapp.com/users";
    const url = "https://app-hoteliacamnath.herokuapp.com/users";

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post(url, data);
        if (response.status === 201) {
            console.log('formulario enviado');
        } else {
            console.log('formulario no enviado');
        }
    }

    const expresiones = {
        nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        documento: /^\d{7,14}$/, // 7 a 14 numeros.
        // fecha: /^\d{7,14}$/, // 7 a 14 numeros.
        // fecha: /^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$/,
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        telefono: /^\d{7,14}$/, // 7 a 14 numeros.
        passw: /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/, // Letras y espacios, pueden llevar acentos.
    }

    const onChangeTerminos = (e) => {
        cambiarTerminos(e.target.checked);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (

            nombre.valido === 'true' &&
            apellido.valido === 'true' &&
            tipodoc.valido === 'true'  &&
            genero.valido === 'true'  &&
            documento.valido === 'true' &&
            fecha.valido === 'true' &&
            correo.valido === 'true' &&
            telefono.valido === 'true' &&
            passw.valido === 'true' &&
            terminos
        ) {
            cambiarFormularioValido(true);
            cambiarNombre({ campo: '', valido: null });
            cambiarApellido({ campo: '', valido: null });
            cambiarTipodoc({ campo: '', valido: null });
            cambiarGenero({ campo: '', valido: null });
            cambiarDocumento({ campo: '', valido: null });
            cambiarFecha({ campo: '', valido: null });
            cambiarCorreo({ campo: '', valido: null });
            cambiarPassw({ campo: '', valido: null });
            cambiarTelefono({ campo: '', valido: null });


        } else {
            cambiarFormularioValido(false);
        }
    }

    return (

        <main className='contact-P'>

            <div className='formAll'>
                <div align="center"><img src={logHotelia} width='100%' alt='logHotelia' className='logHotelia' /></div>
                <Formulario action="" onSubmit={onSubmit} handleSubmit={handleSubmit}>

                    <Input
                        estado={nombre}
                        cambiarEstado={cambiarNombre}
                        tipo="text"
                        label="Nombre"
                        placeholder="Ana Virtuosa"
                        name="usuario"
                        leyendaError="Por favor ingrese su nombre."
                        onChange={handleChange}
                        value={data.nombre}
                        expresionRegular={expresiones.nombre}
                    />
                    <Input
                        estado={apellido}
                        cambiarEstado={cambiarApellido}
                        tipo="text"
                        label="Apellido"
                        placeholder="Virtuosa"
                        name="usuario"
                        leyendaError="Por favor ingrese su apellido."
                        onChange={handleChange}
                        value={data.apellido}
                        expresionRegular={expresiones.apellido}
                    />
                    <Select
                        name="pais"
                        id="pais"
                        class="pais"
                        estado={tipodoc}
                        // cambiarEstado={cambiarTipodoc}
                        // onChange={handleChange}
                        // value={data.paisorigen}
                        // expresionRegular={expresiones.tipodoc}
                        
                        label="País de origen">
                        <option value="selec">Seleccione su país de origen</option>
                        <option value="AF">Afganistán</option>
                        <option value="AL">Albania</option>
                        <option value="DE">Alemania</option>
                        <option value="AD">Andorra</option>
                        <option value="AO">Angola</option>
                        <option value="AI">Anguilla</option>
                        <option value="AQ">Antártida</option>
                        <option value="AG">Antigua y Barbuda</option>
                        <option value="AN">Antillas Holandesas</option>
                        <option value="SA">Arabia Saudí</option>
                        <option value="DZ">Argelia</option>
                        <option value="AR">Argentina</option>
                        <option value="AM">Armenia</option>
                        <option value="AW">Aruba</option>
                        <option value="AU">Australia</option>
                        <option value="AT">Austria</option>
                        <option value="AZ">Azerbaiyán</option>
                        <option value="BS">Bahamas</option>
                        <option value="BH">Bahrein</option>
                        <option value="BD">Bangladesh</option>
                        <option value="BB">Barbados</option>
                        <option value="BE">Bélgica</option>
                        <option value="BZ">Belice</option>
                        <option value="BJ">Benin</option>
                        <option value="BM">Bermudas</option>
                        <option value="BY">Bielorrusia</option>
                        <option value="MM">Birmania</option>
                        <option value="BO">Bolivia</option>
                        <option value="BA">Bosnia y Herzegovina</option>
                        <option value="BW">Botswana</option>
                        <option value="BR">Brasil</option>
                        <option value="BN">Brunei</option>
                        <option value="BG">Bulgaria</option>
                        <option value="BF">Burkina Faso</option>
                        <option value="BI">Burundi</option>
                        <option value="BT">Bután</option>
                        <option value="CV">Cabo Verde</option>
                        <option value="KH">Camboya</option>
                        <option value="CM">Camerún</option>
                        <option value="CA">Canadá</option>
                        <option value="TD">Chad</option>
                        <option value="CL">Chile</option>
                        <option value="CN">China</option>
                        <option value="CY">Chipre</option>
                        <option value="VA">Ciudad del Vaticano (Santa Sede)</option>
                        <option value="CO">Colombia</option>
                        <option value="KM">Comores</option>
                        <option value="CG">Congo</option>
                        <option value="CD">Congo, República Democrática del</option>
                        <option value="KR">Corea</option>
                        <option value="KP">Corea del Norte</option>
                        <option value="CI">Costa de Marfíl</option>
                        <option value="CR">Costa Rica</option>
                        <option value="HR">Croacia (Hrvatska)</option>
                        <option value="CU">Cuba</option>
                        <option value="DK">Dinamarca</option>
                        <option value="DJ">Djibouti</option>
                        <option value="DM">Dominica</option>
                        <option value="EC">Ecuador</option>
                        <option value="EG">Egipto</option>
                        <option value="SV">El Salvador</option>
                        <option value="AE">Emiratos Árabes Unidos</option>
                        <option value="ER">Eritrea</option>
                        <option value="SI">Eslovenia</option>
                        <option value="ES" selected>España</option>
                        <option value="US">Estados Unidos</option>
                        <option value="EE">Estonia</option>
                        <option value="ET">Etiopía</option>
                        <option value="FJ">Fiji</option>
                        <option value="PH">Filipinas</option>
                        <option value="FI">Finlandia</option>
                        <option value="FR">Francia</option>
                        <option value="GA">Gabón</option>
                        <option value="GM">Gambia</option>
                        <option value="GE">Georgia</option>
                        <option value="GH">Ghana</option>
                        <option value="GI">Gibraltar</option>
                        <option value="GD">Granada</option>
                        <option value="GR">Grecia</option>
                        <option value="GL">Groenlandia</option>
                        <option value="GP">Guadalupe</option>
                        <option value="GU">Guam</option>
                        <option value="GT">Guatemala</option>
                        <option value="GY">Guayana</option>
                        <option value="GF">Guayana Francesa</option>
                        <option value="GN">Guinea</option>
                        <option value="GQ">Guinea Ecuatorial</option>
                        <option value="GW">Guinea-Bissau</option>
                        <option value="HT">Haití</option>
                        <option value="HN">Honduras</option>
                        <option value="HU">Hungría</option>
                        <option value="IN">India</option>
                        <option value="ID">Indonesia</option>
                        <option value="IQ">Irak</option>
                        <option value="IR">Irán</option>
                        <option value="IE">Irlanda</option>
                        <option value="BV">Isla Bouvet</option>
                        <option value="CX">Isla de Christmas</option>
                        <option value="IS">Islandia</option>
                        <option value="KY">Islas Caimán</option>
                        <option value="CK">Islas Cook</option>
                        <option value="CC">Islas de Cocos o Keeling</option>
                        <option value="FO">Islas Faroe</option>
                        <option value="HM">Islas Heard y McDonald</option>
                        <option value="FK">Islas Malvinas</option>
                        <option value="MP">Islas Marianas del Norte</option>
                        <option value="MH">Islas Marshall</option>
                        <option value="UM">Islas menores de Estados Unidos</option>
                        <option value="PW">Islas Palau</option>
                        <option value="SB">Islas Salomón</option>
                        <option value="SJ">Islas Svalbard y Jan Mayen</option>
                        <option value="TK">Islas Tokelau</option>
                        <option value="TC">Islas Turks y Caicos</option>
                        <option value="VI">Islas Vírgenes (EEUU)</option>
                        <option value="VG">Islas Vírgenes (Reino Unido)</option>
                        <option value="WF">Islas Wallis y Futuna</option>
                        <option value="IL">Israel</option>
                        <option value="IT">Italia</option>
                        <option value="JM">Jamaica</option>
                        <option value="JP">Japón</option>
                        <option value="JO">Jordania</option>
                        <option value="KZ">Kazajistán</option>
                        <option value="KE">Kenia</option>
                        <option value="KG">Kirguizistán</option>
                        <option value="KI">Kiribati</option>
                        <option value="KW">Kuwait</option>
                        <option value="LA">Laos</option>
                        <option value="LS">Lesotho</option>
                        <option value="LV">Letonia</option>
                        <option value="LB">Líbano</option>
                        <option value="LR">Liberia</option>
                        <option value="LY">Libia</option>
                        <option value="LI">Liechtenstein</option>
                        <option value="LT">Lituania</option>
                        <option value="LU">Luxemburgo</option>
                        <option value="MK">Macedonia, Ex-República Yugoslava de</option>
                        <option value="MG">Madagascar</option>
                        <option value="MY">Malasia</option>
                        <option value="MW">Malawi</option>
                        <option value="MV">Maldivas</option>
                        <option value="ML">Malí</option>
                        <option value="MT">Malta</option>
                        <option value="MA">Marruecos</option>
                        <option value="MQ">Martinica</option>
                        <option value="MU">Mauricio</option>
                        <option value="MR">Mauritania</option>
                        <option value="YT">Mayotte</option>
                        <option value="MX">México</option>
                        <option value="FM">Micronesia</option>
                        <option value="MD">Moldavia</option>
                        <option value="MC">Mónaco</option>
                        <option value="MN">Mongolia</option>
                        <option value="MS">Montserrat</option>
                        <option value="MZ">Mozambique</option>
                        <option value="NA">Namibia</option>
                        <option value="NR">Nauru</option>
                        <option value="NP">Nepal</option>
                        <option value="NI">Nicaragua</option>
                        <option value="NE">Níger</option>
                        <option value="NG">Nigeria</option>
                        <option value="NU">Niue</option>
                        <option value="NF">Norfolk</option>
                        <option value="NO">Noruega</option>
                        <option value="NC">Nueva Caledonia</option>
                        <option value="NZ">Nueva Zelanda</option>
                        <option value="OM">Omán</option>
                        <option value="NL">Países Bajos</option>
                        <option value="PA">Panamá</option>
                        <option value="PG">Papúa Nueva Guinea</option>
                        <option value="PK">Paquistán</option>
                        <option value="PY">Paraguay</option>
                        <option value="PE">Perú</option>
                        <option value="PN">Pitcairn</option>
                        <option value="PF">Polinesia Francesa</option>
                        <option value="PL">Polonia</option>
                        <option value="PT">Portugal</option>
                        <option value="PR">Puerto Rico</option>
                        <option value="QA">Qatar</option>
                        <option value="UK">Reino Unido</option>
                        <option value="CF">República Centroafricana</option>
                        <option value="CZ">República Checa</option>
                        <option value="ZA">República de Sudáfrica</option>
                        <option value="DO">República Dominicana</option>
                        <option value="SK">República Eslovaca</option>
                        <option value="RE">Reunión</option>
                        <option value="RW">Ruanda</option>
                        <option value="RO">Rumania</option>
                        <option value="RU">Rusia</option>
                        <option value="EH">Sahara Occidental</option>
                        <option value="KN">Saint Kitts y Nevis</option>
                        <option value="WS">Samoa</option>
                        <option value="AS">Samoa Americana</option>
                        <option value="SM">San Marino</option>
                        <option value="VC">San Vicente y Granadinas</option>
                        <option value="SH">Santa Helena</option>
                        <option value="LC">Santa Lucía</option>
                        <option value="ST">Santo Tomé y Príncipe</option>
                        <option value="SN">Senegal</option>
                        <option value="SC">Seychelles</option>
                        <option value="SL">Sierra Leona</option>
                        <option value="SG">Singapur</option>
                        <option value="SY">Siria</option>
                        <option value="SO">Somalia</option>
                        <option value="LK">Sri Lanka</option>
                        <option value="PM">St Pierre y Miquelon</option>
                        <option value="SZ">Suazilandia</option>
                        <option value="SD">Sudán</option>
                        <option value="SE">Suecia</option>
                        <option value="CH">Suiza</option>
                        <option value="SR">Surinam</option>
                        <option value="TH">Tailandia</option>
                        <option value="TW">Taiwán</option>
                        <option value="TZ">Tanzania</option>
                        <option value="TJ">Tayikistán</option>
                        <option value="TF">Territorios franceses del Sur</option>
                        <option value="TP">Timor Oriental</option>
                        <option value="TG">Togo</option>
                        <option value="TO">Tonga</option>
                        <option value="TT">Trinidad y Tobago</option>
                        <option value="TN">Túnez</option>
                        <option value="TM">Turkmenistán</option>
                        <option value="TR">Turquía</option>
                        <option value="TV">Tuvalu</option>
                        <option value="UA">Ucrania</option>
                        <option value="UG">Uganda</option>
                        <option value="UY">Uruguay</option>
                        <option value="UZ">Uzbekistán</option>
                        <option value="VU">Vanuatu</option>
                        <option value="VE">Venezuela</option>
                        <option value="VN">Vietnam</option>
                        <option value="YE">Yemen</option>
                        <option value="YU">Yugoslavia</option>
                        <option value="ZM">Zambia</option>
                        <option value="ZW">Zimbabue</option>
                    </Select>

                    <Input
                        estado={documento}
                        cambiarEstado={cambiarDocumento}
                        tipo="text"
                        label="N° de documento"
                        placeholder="10152334281"
                        name="documento"
                        leyendaError="Ingrese su documento puede contener numeros y letras"
                        onChange={handleChange}
                        value={data._id}
                        expresionRegular={expresiones.documento}
                    />
                    <Select
                        estado={tipodoc}
                        cambiarEstado={cambiarTipodoc}
                        onChange={handleChange}
                        value={data.tipodoc}
                        expresionRegular={expresiones.tipodoc}
                        label="Tipo de documento"
                        class="frm-tipodoc">
                        <option value="selec">Seleccione un tipo de documento</option>
                        <option value="cc">Cedula de ciudadania</option>
                        <option value="ce">Cedula de extranjeria</option>
                        <option value="ps">Pasaporte</option>
                    </Select>
                    <Input
                        estado={fecha}
                        cambiarEstado={cambiarFecha}
                        tipo="date"
                        label="Fecha de nacimiento"
                        placeholder="12/08/1889"
                        name="date"
                        leyendaError="Por favor ingrese una fecha de nacimiento correcta."
                        onChange={handleChange}
                        value={data.fnacimiento}
                        expresionRegular={expresiones.fecha}
                    />
                    <Select
                        label="Género"
                        onChange={handleChange}
                        value={data.genero}
                        estado={genero}
                        cambiarEstado={cambiarGenero}
                        expresionRegular={expresiones.genero}
                        class="frm-genero">
                        <option value="selec">Seleccione su genero</option>
                        <option value="hom">Masculino</option>
                        <option value="muj">Femenino</option>
                        <option value="sinG">Sin genero</option>
                        <option value="NoRs">Prefiero no responder</option>
                    </Select>
                    <Input
                        estado={correo}
                        cambiarEstado={cambiarCorreo}
                        tipo="email"
                        label="Correo Electrónico"
                        placeholder="virtuosa@correo.com"
                        name="correo"
                        leyendaError="Por favor ingrese el correo electrónico que usa con mayor frecuencia."
                        onChange={handleChange}
                        value={data.email}
                        expresionRegular={expresiones.correo}
                    />
                    <Input
                        estado={telefono}
                        cambiarEstado={cambiarTelefono}
                        onChange={handleChange}
                        value={data.telefono}
                        tipo="number"
                        label="Teléfono de contacto"
                        placeholder="4491234567"
                        name="telefono"
                        leyendaError="El telefono solo puede contener numeros y el maximo son 14 dígitos."
                        expresionRegular={expresiones.telefono}
                    />
                    <Input
                        estado={passw}
                        cambiarEstado={cambiarPassw}
                        onChange={handleChange}
                        value={data.password}
                        tipo="password"
                        label="Contraseña"
                        placeholder="*********"
                        // pattern=".{6,10}"
                        name="passw"
                        leyendaError="Ingrese una contraseña minimo de 6 caracteres maximo 10."
                        expresionRegular={expresiones.contraseña}
                    />
                    <Input
                        estado={passw}
                        cambiarEstado={cambiarPassw}
                        tipo="password"
                        onChange={handleChange}
                        value={data.password}
                        label="Confirme su contraseña"
                        // pattern=".{6,10}"
                        placeholder="*********"
                        name="passw"
                        leyendaError="Ingrese nuevamente su contraseña."
                        expresionRegular={expresiones.contraseña}
                    />
                    <Input
                        estado={archivo}
                        cambiarEstado={cambiarArchivo}
                        label="Adjunte archivo (opcional)"
                        tipo="file"
                        name='archivo'
                        id='idarchivo'
                    />

                    <Label>
                        <input
                            type="checkbox"
                            name="terminos"
                            id="terminos"
                            checked={terminos}
                            onChange={onChangeTerminos}
                        />
                        Acepto los Terminos y Condiciones
                    </Label>

                    {formularioValido === false && <MensajeError>
                        <p>
                            <FontAwesomeIcon icon={faExclamationTriangle} />
                            <b>Error:</b> Por favor rellena el formulario correctamente.
                        </p>
                    </MensajeError>}
                    <ContenedorBotonCentrado>
                        <Boton type="submit">Enviar</Boton>
                        {formularioValido === true && <MensajeExito>Formulario enviado exitosamente!</MensajeExito>}
                    </ContenedorBotonCentrado>

                </Formulario>
            </div>
        </main>
    );
}

export default App;