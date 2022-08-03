import React from "react";
import pfoto from '../assets/img/fotoPerfil.png';

function PerfilH() {
    return (
        <div className="TPerfil">
            <div className="Perfil-all">
                <div className="Perfilimg">
                    <h1> Hola Adrian!</h1>
                    <div align="center"><img src={pfoto} width='100%' alt='pfoto' className='pfoto' /></div>
                    <input className="boton" type="button" value="Actualizar foto"></input>
                </div>

                <div className="Perfildatos">
                    <div className="dUsuario">
                        <h3 className="titulodat">DATOS DEL USUSARIO</h3>
                        <div className="line"/>
                        
                        <div className="datosUs">
                            <div>
                                <p className="Subtx docu">No. de documento</p>
                                <p>A1142541F</p>

                                <p className="Subtx pais">País de origen</p>
                                <p>Bolivia</p>

                                <p className="Subtx gen">Género</p>
                                <p>Masculino</p>
                            </div>

                            <div>
                                <p className="Subtx nom">Nombres y apellidos</p>
                                <p>Adrian Alberto Saint</p>

                                <p className="Subtx fecha">Fecha de nacimiento</p>
                                <p>10/05/1889</p>

                                <p className="Subtx tdoc">Tipo de documento</p>
                                <p>Pasaporte</p>
                            </div>
                        </div>
                    </div>

                    <div className="dContacto">
                        <h3 className="titulodat">DATOS DE CONTACTO</h3>
                        <div className="line"/>

                        <div className="datosUs">
                            <div>
                                <p className="Subtx">Email</p>
                                <p>adriansaint@gmail.com</p>

                                <p className="Subtx">Teléfono de contacto</p>
                                <p>+57 3184300021</p>
                            </div>

                            <div>
                                <input className="boton" type="button" value="Actualizar datos"></input>
                            </div>
                        </div>
                    </div>
                        <input className="boton" type="button" value="Cambiar contraseña"></input>
                </div>
            </div>
        </div>
    );
}

export default PerfilH;