import React, { useEffect, useState } from 'react';

import CreateEmpresa from './CreateEmpresa';
import EditEmpresa from './EditEmpresa';

import datos from '../../api/empresas.json';

import './Empresas.css'

import { Button, Table } from "react-bootstrap";
import { Building } from "react-bootstrap-icons";

const Empresas = () => {

    const [empresas, setEmpresas] = useState([])

    const [buscador, setBuscador] = useState()

    useEffect(() => {
        getEmpresas()
    }, [])


    const getEmpresas = async () => {
        await fetch(`http://127.0.0.1:8000/api/empresas`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        })
            .then(res => res.json())
            .then(data => { setEmpresas(data) })

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
                                        <input type="text" className="form-control" value={buscador} onChange={(e) => setBuscador(e.target.value)} placeholder='Buscar' required />
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
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {empresas.map((vt_empresa) => (
                                        <tr key={vt_empresa.nit}>
                                            <td>{vt_empresa.nit}</td>
                                            <td>{vt_empresa.nombre}</td>
                                            <td><EditEmpresa datos = { vt_empresa } /></td>
                                        </tr>
                                    ))}
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