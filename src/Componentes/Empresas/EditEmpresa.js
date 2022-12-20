import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Modal, Button, Form } from "react-bootstrap";
import { Building } from "react-bootstrap-icons";

const EditEmpresa = (props) => {

    const [nit, setNit] = useState(props.datos.nit);
    const [nombre, setNombre] = useState(props.datos.nombre);

    const [modal, setModal] = useState(false);
    const modalShow = () => setModal(true);
    const modalClose = () => setModal(false);




    return (
        <div>
            <button className='btn btn-primary' onClick={modalShow}>Editar</button>

            <Modal show={modal} onHide={modalClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Editar Empresa <Building /></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        <Form className='row m-1'>

                            <Form.Group className='mt-2 mb-2'>
                                <Form.Label>Documento: <strong className="text-danger">*</strong></Form.Label>
                                <Form.Control value={nit} onChange={(e) => setNit(e.target.value)} required type='text' />
                            </Form.Group>

                            <Form.Group className='mt-4'>
                                <Form.Label>Nombre: <strong className="text-danger">*</strong></Form.Label>
                                <Form.Control value={nombre} onChange={(e) => setNombre(e.target.value)} type='text' required />
                            </Form.Group>


                            <div className='text-center mt-4 mb-2'>
                                <Button type='submit' variant='outline-primary' className='mt-4 px-5'>Editar</Button>
                            </div>

                        </Form>
                    </>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default EditEmpresa