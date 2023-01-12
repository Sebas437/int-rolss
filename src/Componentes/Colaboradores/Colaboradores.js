import React, { useEffect, useState } from 'react';

import CreateColaborador from './CreateColaborador';
import EditColaborador from './EditColaborador';
import ModalSolicitud from './ModalSolicitud';

import './Colaboradores.css'

import { Eye, Person } from "react-bootstrap-icons";
import { Table } from "react-bootstrap";

const Colaboradores = () => {

    // Declaramos las variables de estado
    const [colaboradores, setColaboradores] = useState([]);
    const [tablaCol, setTablaCol] = useState([])
    const [buscador, setBuscador] = useState('');

    // Se ejecuta cada render
    useEffect(() => {
        getColaboradores()

    }, [])


    const getColaboradores = async () => {
        // Peticion al back
        await fetch('http://127.0.0.1:8000/api/colaboradores', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        })
            .then(res => res.json())
            .then(data => { 
                // Asignamos a colaboradores, los datos que nos retorna la peticion 
                setColaboradores(data);
                setTablaCol(data);
             });       
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
        var resultado = tablaCol.filter((elemento) => {
            //Buscamos por el nit y el nombre, pasamos a string despues a minuscula y despues comprobar si coincide con el termino de busqueda
            if (elemento.documento.toString().toLowerCase().startsWith(terminoBusqueda.toLowerCase())
                || elemento.nombre.toString().toLowerCase().startsWith(terminoBusqueda.toLowerCase())) {
                return elemento;
            }
        });

        // Seteamos el resultado a los datos
        setColaboradores(resultado);
    }

    return (
        <div className='colaboradores'>

            <div className='text-end mb-5'>
                <h1>Gestión Colaboradores</h1>
                <hr></hr>
            </div>

            <div className='row'>

                <div className='col-lg-4'>
                    {/* Llamamos el componente y le pasamos la funcion "getColaboradores" */}
                    <CreateColaborador getColaboradores={getColaboradores} />
                </div>

                <div className='col-lg-8'>
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
                                        <h2>Colaboradores <Person /></h2>
                                    </div>
                                </div>

                            </div>
                            <hr className='mb-4'></hr>


                            <Table striped style={{ display: "block", overflowX: "auto", whiteSpace: "nowrap" }}>
                                <thead>
                                    <tr>
                                        <th style={{ width: "15%" }}>Documento</th>
                                        <th style={{ width: "15%" }}>Nombre</th>
                                        <th style={{ width: "18%" }}>Apellidos</th>
                                        <th style={{ width: "14%" }}>Numero</th>
                                        <th style={{ width: "10%" }}>Arl</th>
                                        <th style={{ width: "10%" }}>F. Cedula</th>
                                        <th style={{ width: "11%" }}>C. Alturas</th>
                                        <th style={{ width: "9%" }}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Exploramos la variable e imprimimos los datos, si no hay datos "No se encontraron registros" */}
                                    {colaboradores.length === 0 ?
                                        <tr>
                                            <td className='text-center' colSpan="8">No se encontraron registros</td>
                                        </tr> :
                                        colaboradores.map((vt_colaborador) => (
                                            <tr key={vt_colaborador.documento}>
                                                <td>{vt_colaborador.documento}</td>
                                                <td>{vt_colaborador.nombre}</td>
                                                <td>{vt_colaborador.apellidos}</td>
                                                <td>{vt_colaborador.n_contacto}</td>

                                                <td>
                                                    {/* Fila con enlace al documento, en la url mandamos los parametros, doc y url */}
                                                    <a href={`./viewpdf?doc=${vt_colaborador.documento}&url=${vt_colaborador.arl}`} target='_blank'>
                                                        <Eye style={{ fontSize: "25px" }}></Eye>
                                                    </a>
                                                </td>

                                                <td>
                                                    {/* Fila con enlace al documento, en la url mandamos los parametros, doc y url */}
                                                    <a href={`./viewpdf?doc=${vt_colaborador.documento}&url=${vt_colaborador.f_cedula}`} target='_blank'>
                                                        <Eye style={{ fontSize: "25px" }}></Eye>
                                                    </a>
                                                </td>

                                                {/* Validamos si el colaborador tiene c_alturas, en caso de que no, mostramos "NO" */}
                                                {vt_colaborador.c_alturas != null && vt_colaborador.c_alturas != "null" ?
                                                    <td>
                                                        {/* Fila con enlace al documento, en la url mandamos los parametros, doc y url */}
                                                        <a href={`./viewpdf?doc=${vt_colaborador.documento}&url=${vt_colaborador.c_alturas}`} target='_blank'>
                                                            <Eye style={{ fontSize: "25px" }}></Eye>
                                                        </a>
                                                    </td>
                                                    : <td>NO</td>}

                                                {/* Llamamos el componente EditColaborador y como parametro pasamos los
                                             datos del colaborador que vamos a editar */}
                                                <td className='text-center'><EditColaborador datos={vt_colaborador} getColaboradores={getColaboradores} /></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>


                        </div>

                        <div className='d-flex flex-direction-row justify-content-end'>
                            <div className=' m-2 mt-1'>
                                <ModalSolicitud getColaboradores={getColaboradores} />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Colaboradores