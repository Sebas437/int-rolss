import React, { useState } from 'react'
import { Eye } from "react-bootstrap-icons";
import { Modal, Button, Form, Table } from "react-bootstrap";
import { showSuccessAlert, showErrorAlert } from '../alerts.js';

const ModalSolicitud = () => {

    const [colaboradorSolic, setColaboradorSolic] = useState([])
    const [descripcion, setDescripcion] = useState('');
    const [fecha_inicio, setFecha_inicio] = useState('');

    const getColaboradoSolic = async () => {
        // Peticion al back
        await fetch('http://127.0.0.1:8000/api/colaboradores', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        })
            .then(res => res.json())
            .then(data => { setColaboradorSolic(data) }) // Asignamos a colaboradores, los datos que nos retorna la peticion       
    }

    const store = async (e) => {
        e.preventDefault();

        await fetch("http://127.0.0.1:8000/api/solicitudes", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ descripcion: descripcion, fecha_inicio: fecha_inicio, colaboradorSolic: colaboradorSolic })
        })
            .then(res => res.json())
            .then(data => {
                // Validamos la respuesta del back
                if (data === true) {
                    setDescripcion('')
                    setFecha_inicio('')
                    showSuccessAlert('Colaborador');
                    modalClose();

                } else {
                    // Error
                    showErrorAlert();
                    console.log(data)
                }
            })
    }

    const [modal, setModal] = useState(false);

    const modalShow = () => {
        getColaboradoSolic();
        setModal(true)
    };

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
                        <Form className='row m-1' onSubmit={store}>

                            <Form.Group className='col-6'>
                                <Form.Label>Labor que se ejecutara: <strong className="text-danger">*</strong></Form.Label>
                                <Form.Control as="textarea" rows={3} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required type='text' />
                            </Form.Group>

                            <Form.Group className='col-6'>
                                <Form.Label>Fecha: <strong className="text-danger">*</strong></Form.Label>
                                <Form.Control value={fecha_inicio} onChange={(e) => setFecha_inicio(e.target.value)} type='date' required />
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
                                    {/* Exploramos la variable e imprimimos los datos */}
                                    {colaboradorSolic.map((vt_colaborador) => (
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

                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                            <div className='text-end'>
                                <Button type='submit'>Enviar</Button>
                            </div>


                        </Form>
                    </>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ModalSolicitud