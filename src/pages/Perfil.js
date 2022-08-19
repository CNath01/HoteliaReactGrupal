import "../assets/css/Perfil.css";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import imgPerfil from "../assets/img/fotoPerfil.jpg"
import DashUser from "../components/DashUser/DashUser"

let Perfil=()=>{

    const cookies = new Cookies();

    console.log('_id: '+ cookies.get('_id'));
    console.log('nombre: '+cookies.get('nombre'));
    console.log('apellido: '+cookies.get('apellido'));

    let fecha= new Date(cookies.get('fnacimiento'));
    let nacimientoFecha=fecha.toLocaleDateString();
    let imgR='http://localhost:4000';

    console.log(imgR)
    console.log(cookies.get('img'))

    return(
        
        <main>
            <DashUser/>
            <section className="all-content-profile">
                    <section className="content-Id">
                        <section className="image-profile">
                            {/* <img src={imgR+cookies.get('img')} class="rounded-circle" alt="imagen de perfil" /> */}
                            <img src={imgPerfil} class="rounded-circle" alt="imagen de perfil" />
                            <button className="general-button"><Link to="/cambiar-foto">EDITAR FOTO</Link></button>
                        </section>

                        <section className="user-data-profile">
                            <p className="tbienvenida">DATOS DE IDENTIFICACIÓN</p>
                            <div className="data-contentido">
                                <p className="tbsub">Nombres</p>
                                <p className="tbtext">{cookies.get('nombre')}</p>
                            </div>
                            <div className="data-contentido">
                                <p className="tbsub">Apellidos</p>
                                <p className="tbtext">{cookies.get('apellido')}</p>
                            </div>
                            <div className="data-contentido">
                                <p className="tbsub">Tipo de documento</p>
                                <p className="tbtext">{cookies.get('tipodoc')}</p>
                            </div>
                            <div className="data-contentido">
                            <p className="tbsub">Número de documento</p>
                                <p className="tbtext">{cookies.get('_id')}</p>
                            </div>
                        </section>
                    </section>

                    <section className="content-parttw">
                        <section className="content-Pprofile">
                            <p className="tbienvenida">DATOS PERSONALES</p>
                            <div className="data-contentido">
                                <p className="tbsub">Fecha de nacimiento</p>
                                <p className="tbtext">{nacimientoFecha}</p>
                            </div>
                            <div className="data-contentido">
                                <p className="tbsub">País de origen</p>
                                <p className="tbtext">{cookies.get('paisorigen')}</p>
                            </div>
                            <div className="data-contentido">
                                <p className="tbsub">Género</p>
                                <p className="tbtext">{cookies.get('genero')}</p>
                            </div>
                        </section>

                        <section className="content-contact">
                            <p className="tbienvenida">DATOS CONTACTO</p>
                            <div className="data-contentido">
                                <p className="tbsub">Correo</p>
                                <p className="tbtext">{cookies.get('email')}</p>
                            </div>
                            <div className="data-contentido">
                                <p className="tbsub">Teléfono de contacto</p>
                                <p className="tbtext">{cookies.get('telefono')}</p>
                            </div>
                            <div className="container-button">
                                <button className="general-button"><Link to="/editar-perfil">EDITAR CONTACTO</Link></button>
                            </div>
                        </section>

                        <section className="profile-password">
                            <p className="tbienvenida">DATOS SEGURIDAD</p>
                            <div>
                                <p className="tbsub">Contraseña</p>
                                <p className="tbtext">************</p>
                            </div>
                            <div className="container-button">
                                <button className="general-button"><Link to="/editar-contrasena">EDITAR CONTRASEÑA</Link></button>
                            </div>
                        </section>
                    </section>
            </section>   
        </main>
    )
}

export default Perfil;