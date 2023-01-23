import React, { useEffect, useState } from 'react';

import CreateEmpresa from './CreateEmpresa';
import EditEmpresa from './EditEmpresa';

import './Empresas.css'

import { Table } from "react-bootstrap";
import { Building } from "react-bootstrap-icons";

import  Username  from "../Colaboradores/username"

const Empresas = () => {

    // Declaramos las variables de estado
    const [empresas, setEmpresas] = useState([])
    const [tablaEmp, setTablaEmp] = useState([])
    const [buscador, setBuscador] = useState('')

    // Se ejecuta cada render
    useEffect(() => {
        getEmpresas()
    }, [])

    const getEmpresas = async () => {
        // Peticion al back
        await fetch(`http://127.0.0.1:8000/api/empresas`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        })
            .then(res => res.json())
            .then(data => {
                // Asignamos a estas dos hooks, los datos que nos retorna la petición   
                setEmpresas(data)
                setTablaEmp(data)
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
        var resultado = tablaEmp.filter((elemento) => {
            //Buscamos por el nit y el nombre, pasamos a string despues a minuscula y despues comprobar si coincide con el termino de busqueda
            if (elemento.nit.toString().toLowerCase().startsWith(terminoBusqueda.toLowerCase())
                || elemento.nombre.toString().toLowerCase().startsWith(terminoBusqueda.toLowerCase())) {
                return elemento;
            }
        });

        // Seteamos el resultado a los datos
        setEmpresas(resultado);
    }




    return (
        <div className='empresas'>

            <div className='text-end mb-5'>
                <h1>Gestión Empresas</h1>
               
                
          

                <hr></hr>
            </div>

            <div className='row'>

                <div className='col-lg-4'>
                    <CreateEmpresa getEmpresas={getEmpresas} />
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
                                        
                                        <h2>Empresas <Building /></h2>
                                    </div>
                                </div>

                            </div>
                            <hr className='mb-4'></hr>


                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>Nit</th>
                                        <th>Nombre</th>
                                        <th>Correo</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {empresas.length === 0 ?
                                        <tr>
                                            <td className='text-center' colSpan="4">No se encontraron registros</td>
                                        </tr> :
                                        empresas.map((vt_empresa) => (
                                            <tr key={vt_empresa.nit}>
                                                <td>{vt_empresa.nit}</td>
                                                <td>{vt_empresa.nombre}</td>
                                                <td>{vt_empresa.correo}</td>
                                                <td><EditEmpresa datos={vt_empresa} getEmpresas={getEmpresas} /></td>
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

export default Empresas