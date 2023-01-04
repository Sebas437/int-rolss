import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Modal, Button, Form } from "react-bootstrap";


const EditColaborador = (props) => {

    const [cedula, setCedula]         = useState(props.datos.documento);
    const [nombre, setNombre]         = useState(props.datos.nombre);
    const [apellidos, setApellidos]   = useState(props.datos.apellidos);
    const [n_contacto, setN_contacto] = useState(props.datos.n_contacto);
    const [arl, setArl]               = useState(); 
    const [f_cedula, setF_cedula]     = useState();
    const [c_alturas, setC_alturas]   = useState();

    const [modal, setModal] = useState(false);
    const modalShow = () => setModal(true);
    const modalClose = () => setModal(false);

    const getArchivos = async (doc, archivo) => {


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
        <div>
            <button className='btn btn-primary' onClick={modalShow}>Editar</button>

            <Modal show={modal} onHide={modalClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Editar Colaborador </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        <Form className='row m-1'>

                            <Form.Group className='col-6'>
                                <Form.Label>Documento: <strong className="text-danger">*</strong></Form.Label>
                                <Form.Control value={cedula} onChange={(e) => setCedula(e.target.value)} required type='text' />
                            </Form.Group>

                            <Form.Group className='col-6'>
                                <Form.Label>Nombre: <strong className="text-danger">*</strong></Form.Label>
                                <Form.Control value={nombre} onChange={(e) => setNombre(e.target.value)} type='text' required />
                            </Form.Group>

                            <Form.Group className='col-6 mt-2'>
                                <Form.Label>Apellidos: <strong className="text-danger">*</strong></Form.Label>
                                <Form.Control value={apellidos} onChange={(e) => setApellidos(e.target.value)} type='text' required />
                            </Form.Group>

                            <Form.Group className='col-6 mt-2'>
                                <Form.Label>Numero de contacto: <strong className="text-danger">*</strong></Form.Label>
                                <Form.Control value={n_contacto} onChange={(e) => setN_contacto(e.target.value)} type='number' required />
                            </Form.Group>

                            <Form.Group className='col-12 mt-2'>
                                <Form.Label>Arl: <strong className="text-danger">*</strong></Form.Label>
                                <Form.Control value={arl} onChange={(e) => setArl(e.target.value)} type='file' required />
                            </Form.Group>

                            <Form.Group className='col-12 mt-2'>
                                <Form.Label>Fotocopia Cedula: <strong className="text-danger">*</strong></Form.Label>
                                <Form.Control value={f_cedula} onChange={(e) => setF_cedula(e.target.value)} type='file' required />
                            </Form.Group>

                            <Form.Group className='col-12 mt-2'>
                                <Form.Label>Certificado Trabajo en alturas:</Form.Label>
                                <Form.Control value={c_alturas} onChange={(e) => setC_alturas(e.target.value)} type='file' />
                            </Form.Group>


                            <div className='text-center'>
                                <Button type='submit' variant='outline-primary' className='mt-4 px-5'>Editar</Button>
                            </div>

                        </Form>
                    </>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default EditColaborador