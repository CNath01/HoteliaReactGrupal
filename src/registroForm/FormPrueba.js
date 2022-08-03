
import '../assets/css/styleForm.css'
import axios from 'axios';
import { useState } from "react"

function FormPrueba() {


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
    const response = await axios.post(url, data);
    if (response.status === 201) {
      console.log('formulario enviado');
    } else {
      console.log('formulario no enviado');
    }
  }

  return (
    <div>
      <h1 className='titulo'>FORMULARIO</h1>
      <main>
        <form onSubmit={handleSubmit}>
          <label>Foto</label>
          <input
            type="file"
            name="img"
            id='img'
            value={data.img}
            onChange={handleChange} />
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            onChange={handleChange}
            value={data.nombre} />
          <label>Apellido</label>
          <input type="text" name="apellido" onChange={handleChange} value={data.apellido} />
          <label>Tipo de documento</label>
          <select name="tipodoc" onChange={handleChange} value={data.tipodoc}>
            <option>Selecciona una opción</option>
            <option value="Cédula de ciudadania">Cédula de ciudadania</option>
            <option value="Cédula de extranjeria">Cédula de extranjeria</option>
            <option value="Número de identificación personal">Número de identificación personal</option>
            <option value="Número de identificación tributaria">Número de identificación tributaria</option>
          </select>
          <label>Numero de documento</label>
          <input type="number" name="_id" onChange={handleChange} value={data._id} />
          <label>Correo electrónico</label>
          <input type="email" name="email" onChange={handleChange} value={data.email} />
          <label>Fecha de nacimiento</label>
          <input type="date" name="fnacimiento" onChange={handleChange} value={data.fnacimiento} />
          <label>Genero</label>
          <select name="genero" onChange={handleChange} value={data.genero}>
            <option>Selecciona una opción</option>
            <option value="No sabe/No responde">No sabe/No responde</option>
            <option value="Femenino">Femenino</option>
            <option value="Maculino">Maculino</option>
            <option value="Transgénero<">Transgénero</option>
          </select>
          <label>País de origen</label>
          <select name="paisorigen" onChange={handleChange} value={data.paisorigen}>
            <option>Selecciona una opción</option>
            <option value="Colombia">Colombia</option>
            <option value="Brasil">Brasil</option>
            <option value="Argentina">Argentina</option>
          </select>
          <label>Teléfono de contacto</label>
          <input type="tel" name="telefono" onChange={handleChange} value={data.telefono} />
          <label>Contraseña</label>
          <input type="password" name="password" onChange={handleChange} value={data.password} />
          <label>Repetir contraseña</label>
          <input type="password" name="rpassword" />
          <button>Guardar</button>
        </form>
      </main>
    </div>
  );
}


export default FormPrueba;
