import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Modal, Button, Form, Table } from "react-bootstrap";
import datos from '../../api/colaboradores.json'
const ModalSolicitud = () => {

    const [colaboradores, setColaboradores] = useState([])

    useEffect(() => {
        getColaboradores()

    }, [])


    const getColaboradores = async () => {
        // await fetch(`${endpoint}/products`, {
        //     method: 'GET',
        //     headers: { 'Content-Type': 'application/json;charset=utf-8' }
        // })
        //     .then(res => res.json())
        //     .then(data => { setProducts(data) })
        setColaboradores(datos);
    }

    const [cedula, setCedula] = useState('');
    const [nombre, setNombre] = useState('');

    const [modal, setModal] = useState(false);
    
    const modalShow = () => setModal(true);
    const modalClose = () => setModal(false);

    return (
        <div>
            <button className='btn btn-primary' onClick={modalShow}>Enviar Solicitud</button>

            <Modal show={modal} onHide={modalClose} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Solicitud</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        <Form className='row m-1'>

                            <Form.Group className='col-6'>
                                <Form.Label>Labor que se ejecutara: <strong className="text-danger">*</strong></Form.Label>
                                <Form.Control as="textarea" rows={3} value={cedula} onChange={(e) => setCedula(e.target.value)} required type='text' />
                            </Form.Group>

                            <Form.Group className='col-6'>
                                <Form.Label>Fecha: <strong className="text-danger">*</strong></Form.Label>
                                <Form.Control value={nombre} onChange={(e) => setNombre(e.target.value)} type='date' required />
                            </Form.Group>

                            <h4 className='mt-5 text-end'>Colaboradores</h4>
                            <hr></hr>
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>Cedula</th>
                                        <th>Nombre</th>
                                        <th>Apellidos</th>
                                        <th>Numero</th>
                                        <th>Arl</th>
                                        <th>Fotocopia Cedula</th>
                                        <th>C. Trabajo en Alturas</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {colaboradores.map((vt_colaborador) => (
                                        <tr key={vt_colaborador.cedula}>
                                            <td>{vt_colaborador.cedula}</td>
                                            <td>{vt_colaborador.nombre}</td>
                                            <td>{vt_colaborador.apellidos}</td>
                                            <td>{vt_colaborador.n_contacto}</td>
                                            <td>{vt_colaborador.arl}</td>
                                            <td>{vt_colaborador.f_cedula}</td>
                                            <td>{vt_colaborador.c_alturas}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                            <div className='text-end'>
                                <Button>Enviar</Button>
                            </div>


                        </Form>
                    </>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ModalSolicitud