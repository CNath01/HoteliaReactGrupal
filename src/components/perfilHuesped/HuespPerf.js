import Swal from 'sweetalert2';
import axios from 'axios';
// import '../../components/elementos/Formulario.css';

function HuesPerf ({perfil, setUplist, upList,handleClose,handleOpen,setDataModal}){

    // 1. definir la url del api a la que me voy a conectar
    const url ="https://hoteliakuepa.herokuapp.com/users/1234567890";
    // 2. funcion asincrona para borrar a partir del listener del bton eliminar
    const handleDelete=async()=>{
        Swal.fire({
            title: '¿Esta seguro que desea eliminar este dorama?',
            text: "No puede revertir esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borralo!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Eliminando el registro de la base de datos falsa
                axios.put(`${url}/${perfil._id}`).then((response)=>{
                    console.log(response);
                    if(response.status===200){
                        Swal.fire(
                            'Eliminado!',
                            'El dorama ha sido borrado.',
                            'success'
                        )
                        setUplist(!upList);
                    }else{
                        Swal.fire(
                            'Error!',
                            'Hubo un error al borrar el dorama.',
                            'error'
                        )
                    }
                })
            }
        })
    }

    const handleEdit=()=>{
        handleOpen();
        setDataModal(perfil);
    }

    return(
        <tr>
            <td>{perfil._id}</td>
            {/* <td><img src={doramas.foto} alt={doramas.nombre} width="100px"></img></td> */}
            <td>{perfil.nombre}</td>
            <td>{perfil.apellido}</td>
            <td>{perfil.tipodoc}</td>
            <td>{perfil.fnacimiento}</td>
            <td>{perfil.genero}</td>
            <td>{perfil.email}</td>
            <td>{perfil.telefono}</td>
            <td><button className="btn btn-warning" onClick={handleEdit}>Editar</button></td>
            <td><button className="btn btn-danger" onClick={handleDelete}>Eliminar</button></td>
        </tr>
    );
}

export default HuesPerf;