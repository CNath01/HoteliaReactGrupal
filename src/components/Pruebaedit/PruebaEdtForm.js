import Swal from 'sweetalert2';
import axios from 'axios';
import '../../components/elementos/Formulario.css';

function Tableusers ({users, setUplist, upList,handleClose,handleOpen,setDataModal}){

    // 1. definir la url del api a la que me voy a conectar
    const url="http://localhost:4000/users";
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
                axios.delete(`${url}/${users.id}`).then((response)=>{
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
        setDataModal(users);
    }

    return(
        <tr>
            <td>{users.id}</td>
            <td><img src={users.foto} alt={users.nombre} width="100px"></img></td>
            <td>{users.nombre}</td>
            <td>{users.sinopsis}</td>
            <td>{users.genero1} {users.genero2} {users.genero3} {users.genero4} {users.genero5} {users.genero6} {users.genero7}</td>
            <td>{users.estado}</td>
            <td>{users.capitulos}</td>
            <td>{users.anio}</td>
            <td><button className="btn btn-warning" onClick={handleEdit}>Editar</button></td>
            <td><button className="btn btn-danger" onClick={handleDelete}>Eliminar</button></td>
        </tr>
    );
}

export default Tableusers;