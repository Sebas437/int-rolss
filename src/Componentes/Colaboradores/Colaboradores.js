import React, { useEffect, useState } from 'react';
import CreateColaborador from './CreateColaborador';
import EditColaborador from './EditColaborador';
import ModalSolicitud from './ModalSolicitud';

import datos from '../../api/colaboradores.json';
import './Colaboradores.css'

import { BoxArrowInDown } from "react-bootstrap-icons";

import { Button, Table } from "react-bootstrap";
import { Person, Building, } from "react-bootstrap-icons";

const Colaboradores = () => {

    const [colaboradores, setColaboradores] = useState([]);
    const [buscador, setBuscador] = useState('');
    const [create, setCreate] = useState(false)
    useEffect(() => {
        getColaboradores()

    }, [])


    const getColaboradores = async () => {
        await fetch('http://127.0.0.1:8000/api/colaboradores', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        })
            .then(res => res.json())
            .then(data => { setColaboradores(data) })

       
        
    }

    const getArchivo = async (doc, archivo) => {


        const respuesta = await fetch(`http://127.0.0.1:8000/api/colaboradorarchivo/${doc}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ archivo: archivo }),
        })

        const blob = await respuesta.blob();
        const url = URL.createObjectURL(blob);
        const enlace = document.createElement('a');
        enlace.href = url;

        enlace.download = archivo;
        enlace.click();
    }

    return (
        <div className='colaboradores'>

            <div className='text-end mb-5'>
                <h1>Gestión Colaboradores</h1>
                <hr></hr>
            </div>

            <div className='row'>

                <div className='col-lg-4'>
                    <CreateColaborador getColaboradores={getColaboradores} />
                </div>


                <div className='col-lg-8'>
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
                                        <h2>Colaboradores <Person /></h2>
                                    </div>
                                </div>

                            </div>
                            <hr className='mb-4'></hr>


                            <Table striped style={{ display: "block", overflowX: "auto", whiteSpace: "nowrap" }}>
                                <thead>
                                    <tr>
                                        <th>Documento</th>
                                        <th>Nombre</th>
                                        <th>Apellidos</th>
                                        <th>Numero</th>
                                        <th>Arl</th>
                                        <th>F Cedula</th>
                                        <th>C. Trabajo Alturas</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {colaboradores.map((vt_colaborador) => (
                                        <tr key={vt_colaborador.documento}>
                                            <td>{vt_colaborador.documento}</td>
                                            <td>{vt_colaborador.nombre}</td>
                                            <td>{vt_colaborador.apellidos}</td>
                                            <td>{vt_colaborador.n_contacto}</td>

                                            <td><BoxArrowInDown className='chulito' onClick={
                                                () => getArchivo(vt_colaborador.documento, vt_colaborador.arl)}>
                                                </BoxArrowInDown>
                                            </td>

                                            <td><BoxArrowInDown className='chulito' onClick={
                                                () => getArchivo(vt_colaborador.documento, vt_colaborador.f_cedula)}>
                                            </BoxArrowInDown>
                                            </td>

                                            {vt_colaborador.c_alturas != null ? 
                                            <td><BoxArrowInDown className='chulito' onClick={
                                                () => getArchivo(vt_colaborador.documento, vt_colaborador.c_alturas)}>
                                                </BoxArrowInDown></td> 
                                                : <td>NO</td>}

                                            <td><EditColaborador datos={vt_colaborador} /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                       
                        </div>
                    
                        <div className='d-flex flex-direction-row justify-content-end'>
                            <div className=' m-2 mt-1'>
                                <ModalSolicitud />
                            </div>

                        </div>
                    </div>                    
                    </div>
                </div>
                </div>
            
        
    )
}

export default Colaboradores