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

    const editEmpresa = async (e) => {
        e.preventDefault();
    
        await fetch(`http://127.0.0.1:8000/api/empresa/${nit}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json;charset=utf-8' },
          body: JSON.stringify({ nombre: nombre })
        })
        .then(a => {
    
          props.getEmpresas();
          modalClose();
        })
    
    
      }


    return (
        <div>
            <button className='btn btn-primary' onClick={modalShow}>Editar</button>

            <Modal show={modal} onHide={modalClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Editar Empresa <Building /></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        <Form className='row m-1' onSubmit={editEmpresa}>

                            <Form.Group className='mt-2 mb-2'>
                                <Form.Label>Documento: <strong className="text-danger">*</strong></Form.Label>
                                <Form.Control value={nit}  disabled/>
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