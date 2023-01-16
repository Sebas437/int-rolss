import React, { useEffect, useState } from 'react'

import { Modal, Button, Form } from "react-bootstrap";
import { Building } from "react-bootstrap-icons";

const EditUsuario = (props) => {

    const id  = props.datos.id;
    const rol = props.datos.rol;

    // Declaramos las variables de estado
    const [usuario, setUsuario] = useState(props.datos.usuario);
    const [correo, setCorreo]   = useState(props.datos.correo);
    const [rolNew, setRolNew]   = useState(props.datos.rol.id);
    const [roles, setRoles]     = useState([]);

    // Se ejecuta cada render
    useEffect(() => {
        getRoles()

    }, [])

    // Funciones del modal
    const [modal, setModal] = useState(false);
    const modalShow  = () => setModal(true);
    const modalClose = () => setModal(false);

    const editUsuario = async (e) => {
        e.preventDefault();

        // Peticion al back
        await fetch(`http://127.0.0.1:8000/api/usuario/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ usuario: usuario, correo: correo, id_rol: rolNew })
        })
            .then(a => {
                props.getUsuarios();//Recargamos la Table 
                modalClose();
            })

    }

    const getRoles = async () => {
        // Peticion al back
        await fetch(`http://127.0.0.1:8000/api/roles`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        })
            .then(res => res.json())
            .then(data => { setRoles(data) })
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
                        <Form className='row m-1' onSubmit={editUsuario}>

                            <Form.Group className='mt-4'>
                                <Form.Label>Usuario: <strong className="text-danger">*</strong></Form.Label>
                                <Form.Control value={usuario} onChange={(e) => setUsuario(e.target.value)} type='text' required />
                            </Form.Group>

                            <Form.Group className='mt-4'>
                                <Form.Label>Correo: <strong className="text-danger">*</strong></Form.Label>
                                <Form.Control value={correo} onChange={(e) => setCorreo(e.target.value)} type='text' required />
                            </Form.Group>

                            <Form.Group className='mt-3'>
                                <Form.Label>Rol: <strong className="text-danger">*</strong></Form.Label>
                                <Form.Select aria-label="Default select example" onChange={(e) => setRolNew(e.target.value)} required>
                                    {/* Rol que tiene el usuario */}
                                    <option value={rol.id}>{rol.descripcion}</option>
                                    {/* El codigo iterará solo sobre los elementos que cumplen la condición de no ser igual al rol seleccionado arriba */}
                                    {roles.filter(vt_rol => vt_rol.id !== rol.id).map((vt_rol) => (
                                        <option key={vt_rol.id} value={vt_rol.id}>
                                            {vt_rol.descripcion}
                                        </option>
                                    ))}
                                </Form.Select>
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

export default EditUsuario