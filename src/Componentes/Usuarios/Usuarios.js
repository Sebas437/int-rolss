import React, { useEffect, useState } from 'react';
import CreateUsuario from './CreateUsuario';

import './Usuarios.css'
import EditUsuario from './EditUsuario';
import { Table } from "react-bootstrap";
import { Person } from "react-bootstrap-icons";

const Usuarios = () => {

    // Declaramos las variables de estado
    const [usuarios, setUsuarios] = useState([])
    const [tablaUsu, setTablaUsu] = useState([])
    const [buscador, setBuscador] = useState('')

    // Se ejecuta cada render
    useEffect(() => {
        getUsuarios()

    }, [])

    const getUsuarios = async () => {
        // Peticion al back
        await fetch(`http://127.0.0.1:8000/api/usuarios`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        })
            .then(res => res.json())
            .then(data => {
                // Asignamos a estas dos hooks, los datos que nos retorna la petición   
                setUsuarios(data)
                setTablaUsu(data);
            })
    }

    const buscarChange = e => {
        //Cada que hay un cambio en el input del buscador, se ejecutara esta función
        setBuscador(e.target.value);

        //Llamamos la funcion filtrar y le pasamos el valor del input
        filtrar(e.target.value);
    }

    const filtrar = (terminoBusqueda) => {
        //Recibimos el valor a buscar

        //Filtramos el valor a buscar en la tabla
        var resultado = tablaUsu.filter((elemento) => {
            //Buscamos por el nit y el nombre, pasamos a string despues a minuscula y despues comprobar si coincide con el termino de busqueda
            if (elemento.usuario.toString().toLowerCase().startsWith(terminoBusqueda.toLowerCase())
                || elemento.correo.toString().toLowerCase().startsWith(terminoBusqueda.toLowerCase())) {
                return elemento;
            }
        });

        // Seteamos el resultado a los datos
        setUsuarios(resultado);
    }




    return (
        <div className='usuarios'>

            <div className='text-end mb-5'>
                <h1>Gestión Usuarios</h1>
                <hr></hr>
            </div>

            <div className='row'>

                <div className='col-lg-4'>
                    <CreateUsuario getUsuarios={getUsuarios} />
                </div>

                <div className='col-lg-1'></div>

                <div className='col-lg-7 '>
                    <div className="card shadow mb-2">
                        <div className="card-body text-dark">

                            <div className='row'>
                                <div className='col-lg-6'>
                                    <div className="input-group mt-3 ms-2">
                                        <input type="text" className="form-control" value={buscador} onChange={buscarChange} placeholder='Buscar' />
                                    </div>
                                </div>

                                <div className='col-lg-6'>
                                    <div className='text-end mt-2 me-4'>
                                        <h2>Usuarios <Person /></h2>
                                    </div>
                                </div>

                            </div>
                            <hr className='mb-4'></hr>


                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>Usuario</th>
                                        <th>Correo</th>
                                        <th>Rol</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usuarios.length === 0 ?
                                        <tr>
                                            <td className='text-center' colSpan="4">No se encontraron registros</td>
                                        </tr> :
                                        usuarios.map((vt_usuario) => (
                                            <tr key={vt_usuario.id}>
                                                <td>{vt_usuario.usuario}</td>
                                                <td>{vt_usuario.correo}</td>
                                                <td>{vt_usuario.rol.descripcion}</td>
                                                <td><EditUsuario datos={vt_usuario} getUsuarios={getUsuarios} /></td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Usuarios