import React, { useEffect, useState } from 'react';
import CreateEmpresa from './CreateEmpresa';
import { Link } from 'react-router-dom';
import datos from '../../api/empresas.json';
import './Empresas.css'

import { Button } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

const Empresas = () => {

    const [empresas, setEmpresas] = useState([])

    useEffect(() => {
        getEmpresas()

    }, [])


    const getEmpresas = async () => {
        // await fetch(`${endpoint}/products`, {
        //     method: 'GET',
        //     headers: { 'Content-Type': 'application/json;charset=utf-8' }
        // })
        //     .then(res => res.json())
        //     .then(data => { setProducts(data) })
        setEmpresas(datos);

    }

    return (
        <div className='empresas '>

            <div className='row'>
                <div className='col-lg-4'>

                    <div className="card shadow mt-2 mb-2">
                        <div className="card-header text-primary"><i className="fa fa-search"></i> Buscar Empresa: </div>

                        <div className="input-group m-2">
                            <input type="text" className="form-control" id="BuscarOperario" required />
                            <div className="input-group-append">
                                <Button type='submit' variant='outline-primary'><Search /></Button>
                            </div>
                        </div>
                    </div>

                    <CreateEmpresa getEmpresas={getEmpresas} />

                </div>

                <div className='col-lg-1'></div>

                <div className='col-lg-7 '>
                    <div className="card shadow mt-2 mb-2">
                        <div className="card-body text-dark">

                            <div className='text-end mt-2 me-4'>
                                <h1>Empresas</h1>
                            </div>
                            <hr className='mb-4'></hr>


                            <table className="table table-striped table-responsive text-dark w-100">
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
                                            <td><Button></Button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Empresas