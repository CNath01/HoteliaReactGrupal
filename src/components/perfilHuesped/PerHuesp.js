import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Form, Modal} from 'react-bootstrap';
import HuesPerf from './HuespPerf';
import Swal from 'sweetalert2';
// import '../../components/elementos/Formulario.css';

function Cperfil(){

    // 1. definir el url al api al que me voy a conectar 
    const url ="https://hoteliakuepa.herokuapp.com/users/id";
    // 2. generar funcion asincrona
    const getData=async()=>{
        const response=axios.get(url);
        return response;
    }
    // 3. UseState para guardar la respuesta de la peticion guardarlo y ponerlo a dispocision del componente
    const [list,setList]=useState([]);

    const [upList,setUpList]=useState([false]);

    const [show, setShow]=useState(false);
    const handleClose=()=>{setShow(false);}
    const handleOpen=()=>{setShow(true);}

    const [dataModal, setDataModal] = useState({});

    const handleChangeModal=({target})=>{
        setDataModal ({...dataModal,[target.name]:target.value
        })
    }

    const handleSubmit=async(e)=>{
            e.preventDefault();
            const response=await axios.put(`${url}/${dataModal._id}`,dataModal);
            console.log(response);  
            if(response.status===200){
                Swal.fire(
                    'Cambios guardados!',
                    `<strong> ${response.data.nombre}</strong> sus datos ha sido actualizados exitosamente!`,
                    'success'
                )
                handleClose();
                setUpList(!upList);

            } else {
                Swal.fire(
                    'Error!',
                    'Hubo un problema al actualizar sus datos!',
                    'error'
                )
            }
        }
        
    // 4. sirve para ejecutar funciones desde el renderizado o cada vez que se renderiza un componente
    useEffect(()=>{
        getData().then((response)=>{
            setList(response.data);
        })
    },[upList])
    console.log(list);
    return(
        <Container>
            <table className='table table-striped'>
                <thead>
                    <th>No</th>
                    <th>Imagen</th>
                    <th>Nombre completo</th>
                    <th>Sinopsis</th>
                    <th>Genero</th>
                    <th>Estado</th>
                    <th>Capitulos</th>
                    <th>Año</th>
                    <th colSpan="2">Acciones</th>
                </thead>
                <tbody>
                {
                    list.map((dor,index)=>(                       
                        <HuesPerf
                        Key={index}
                        perfil={dor}
                        setUpist={setUpList}
                        upList={upList}
                        handleOpen={handleOpen}
                        handleClose={handleClose}
                        setDataModal={setDataModal}
                        />
                    ))
                }
                </tbody>
            </table>

            <Modal show={show} onHide={handleClose}>

                    <Modal.Header closeButton>
                        <Modal.Title>
                            Editar perfil
                        </Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={handleSubmit}>
                        <Modal.Body>

                            <Form.Group>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese su nombre completo"
                                    name="nombre"
                                    value={dataModal.nombre}
                                    onChange={handleChangeModal}/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese su apeliido completo"
                                    name="apellido"
                                    value={dataModal.apellido}
                                    onChange={handleChangeModal}/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>N° de documento</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese su documento puede contener numeros y letras"
                                    name="documento"
                                    value={dataModal._id}
                                    onChange={handleChangeModal}/>
                            </Form.Group>

                            <Form.Group aria-label="tipodoc">
                                <Form.Label>Tipo de documento</Form.Label>
                                <Form.Select
                                    name="tipodoc"
                                    value={dataModal.tipodoc}
                                    onChange={handleChangeModal}>
                                    <option value="selec">Seleccione un tipo de documento</option>
                                    <option value="cc">Cedula de ciudadania</option>
                                    <option value="ce">Cedula de extranjeria</option>
                                    <option value="ps">Pasaporte</option>
                                </Form.Select>
                            </Form.Group>

                            {/* <Form.Group aria-label="capitulos">
                                <Form.Label>Capitulos</Form.Label>
                                <Form.Select
                                    name="capitulos"
                                    value={dataModal.capitulos}
                                    onChange={handleChangeModal}>
                                    <option>Seleccione el número de capitulos</option>
                                    <option capitulos="4">4</option>
                                    <option capitulos="8">8</option>
                                    <option capitulos="12">12</option>
                                    <option capitulos="16">16</option>
                                </Form.Select>
                            </Form.Group> */}

                            <Form.Group>
                                <Form.Label>Fecha de nacimiento</Form.Label>
                                <Form.Control
                                    type="date"
                                    placeholder="Ingrese su fecha de nacimiento"
                                    name="fnacimiento"
                                    value={dataModal.fnacimiento}
                                    onChange={handleChangeModal} />
                            </Form.Group>

                            <Form.Group aria-label="genero">
                                <Form.Label>Genero</Form.Label>
                                <Form.Select
                                    name="genero"
                                    value={dataModal.genero}
                                    onChange={handleChangeModal}>
                                    <option value="selec">Seleccione su genero</option>
                                    <option value="hom">Masculino</option>
                                    <option value="muj">Femenino</option>
                                    <option value="sinG">Sin genero</option>
                                    <option value="NoRs">Prefiero no responder</option>
                                </Form.Select>
                            </Form.Group>
                            
                            <Form.Group>
                                <Form.Label>Correo</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Ingrese su correo electrónico"
                                    name="email"
                                    value={dataModal.email}
                                    onChange={handleChangeModal} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Teléfonon</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Ingrese su numero de contacto"
                                    name="telefono"
                                    value={dataModal.telefono}
                                    onChange={handleChangeModal} />
                            </Form.Group>

                            {/* <Form.Group>
                                <Form.Label>Foto</Form.Label>
                                <Form.Control 
                                type="text" 
                                placeholder="Ingrese la URL de la imagen"
                                name="foto" 
                                value={dataModal.foto}
                                onChange={handleChangeModal}/> 
                            </Form.Group> */}

                        </Modal.Body>
                        <Modal.Footer>
                        <button className="btn btn-secundary" onClick={handleClose}>close</button>
                        <button className="btn btn-primary" type="submit">Guardar cambios</button>
                        </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    );
}

export default Cperfil;