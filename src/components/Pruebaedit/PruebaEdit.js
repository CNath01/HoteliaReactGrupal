import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Form, Modal} from 'react-bootstrap';
import TableDoramas from './TableDoramas';
import Swal from 'sweetalert2';
// import '../../components/elementos/Formulario.css';

function LisDoramas(){

    // 1. definir el url al api al que me voy a conectar 
    const url="http://localhost:4000/users";
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
            const response=await axios.put(`${url}/${dataModal.id}`,dataModal);
            console.log(response);  
            if(response.status===200){
                Swal.fire(
                    'Cambios guardados!',
                    `El dorama <strong> ${response.data.nombre}</strong> ha sido actualizado exitosamente!`,
                    'success'
                )
                handleClose();
                setUpList(!upList);

            } else {
                Swal.fire(
                    'Error!',
                    'Hubo un problema al actualizar el estudiante!',
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
                        <TableDoramas
                        Key={index}
                        doramas={dor}
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
                            Editar Estudiante
                        </Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={handleSubmit}>
                        <Modal.Body>

                            <Form.Group>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese el nombre del Dorama en español o ingles"
                                    name="nombre"
                                    value={dataModal.perfil}
                                    onChange={handleChangeModal}/>
                            </Form.Group>

                            <Form.Group aria-label="genero">
                                <Form.Label>Género</Form.Label><br/>
                                <Form.Check
                                        inline
                                        label="Drama"
                                        name="genero1"
                                        value="Drama"
                                        onChange={handleChangeModal}
                                    />
                                    <Form.Check
                                        inline
                                        label="Romance"
                                        name="genero2"
                                        value="Romance"
                                        onChange={handleChangeModal}
                                    />
                                    <Form.Check
                                        inline
                                        label="Comedia"
                                        name="genero3"
                                        value="Comedia"
                                        onChange={handleChangeModal}
                                    />
                                    <Form.Check
                                        inline
                                        label="Negocios"
                                        name="genero4"
                                        value="Negocios"
                                        onChange={handleChangeModal}
                                    />
                                    <Form.Check
                                        inline
                                        label="Acción"
                                        name="genero5"
                                        value="Acción"
                                        onChange={handleChangeModal}
                                    />
                                    <Form.Check
                                        inline
                                        label="Aventuras"
                                        name="genero6"
                                        value="Aventuras"
                                        onChange={handleChangeModal}
                                    />
                                    <Form.Check
                                        inline
                                        label="Fantasía"
                                        name="genero7"
                                        value="Fantasía"
                                        onChange={handleChangeModal}
                                    />
                            </Form.Group>

                            <Form.Group aria-label="estado">
                                <Form.Label>Estado</Form.Label>
                                <Form.Select
                                    name="estado"
                                    value={dataModal.estado}
                                    onChange={handleChangeModal}>
                                    <option>Seleccione en que estado se encuentra el Dorama</option>
                                    <option value="Finalizado">Finalizado</option>
                                    <option value="En emisión">En emisión</option>
                                    <option value="Estreno">Próximos estrenos</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group aria-label="capitulos">
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
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Fecha de emisión</Form.Label>
                                <Form.Control
                                    type="date"
                                    placeholder="Ingrese la fecha de emisión"
                                    name="anio"
                                    value={dataModal.anio}
                                    onChange={handleChangeModal} />
                            </Form.Group>
                            
                            <Form.Group>
                                <Form.Label>Foto</Form.Label>
                                <Form.Control 
                                type="text" 
                                placeholder="Ingrese la URL de la imagen"
                                name="foto" 
                                value={dataModal.foto}
                                onChange={handleChangeModal}/> 
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Sinopsis del Dorama</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Escriba aquí una pequeña sinopsis"
                                    name="sinopsis"
                                    value={dataModal.sinopsis}
                                    onChange={handleChangeModal} />
                            </Form.Group>

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

export default LisDoramas;