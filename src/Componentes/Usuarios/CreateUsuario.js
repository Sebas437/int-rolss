import React, { useEffect, useState } from 'react'
import { Button, Form } from "react-bootstrap";
import { PersonAdd } from "react-bootstrap-icons";
import { showSuccessAlert, showErrorAlert } from '../alerts.js';


const CreateUsuario = (props) => {

    // Declaramos las variables de estado
    const [usuario, setUsuario] = useState('');
    const [contra, setContra] = useState('');
    const [contraVeri, setContraVeri] = useState('');
    const [correo, setCorreo] = useState('');
    const [rol, setRol] = useState('');
    const [roles, setRoles] = useState([]);

    // Se ejecuta cada render
    useEffect(() => {
        getRoles()
    }, [])

    const store = async (e) => {
        e.preventDefault();

        if (contra == contraVeri) {
            await fetch("http://127.0.0.1:8000/api/usuarios", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({ usuario: usuario, contra: contra, correo: correo, id_rol: rol })
            })
                .then(res => res.json())
                .then(data => {
                    // Validamos la respuesta del back
                    if (data === true) {
                        // Exito
                        props.getUsuarios(); //Recargamos la Table 
                        e.target.reset(); //Vaciamos el formulario
                        showSuccessAlert('Usuario');

                    } else {
                        // Error, no se inserto el colaborador
                        showErrorAlert();
                        console.log(data)
                    }
                })
        } else {
            alert("Las contraseñas no coinciden");
        }

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
            <div className="card shadow mb-2">
                <div className="card-body m-3">

                    <div className='text-end'>
                        <h4>Agregar Usuario <PersonAdd /></h4>
                    </div>
                    <hr className='mb-4'></hr>

                    <Form onSubmit={store}>

                        <Form.Group>
                            <Form.Label>Usuario: <strong className="text-danger">*</strong></Form.Label>
                            <Form.Control onChange={(e) => setUsuario(e.target.value)} required type='text' />
                        </Form.Group>

                        <Form.Group className='mt-3'>
                            <Form.Label>Contraseña: <strong className="text-danger">*</strong></Form.Label>
                            <Form.Control onChange={(e) => setContra(e.target.value)} type='password' required />
                        </Form.Group>

                        <Form.Group className='mt-3'>
                            <Form.Label>Verificar Contraseña: <strong className="text-danger">*</strong></Form.Label>
                            <Form.Control onChange={(e) => setContraVeri(e.target.value)} type='password' required />
                        </Form.Group>

                        <Form.Group className='mt-3'>
                            <Form.Label>Correo: <strong className="text-danger">*</strong></Form.Label>
                            <Form.Control onChange={(e) => setCorreo(e.target.value)} type='email' required />
                        </Form.Group>



                        <Form.Group className='mt-3'>
                            <Form.Label>Rol: <strong className="text-danger">*</strong></Form.Label>
                            <Form.Select aria-label="Default select example" onChange={(e) => setRol(e.target.value)} required>
                                <option value="">Seleccione una opción...</option>
                                {roles.map((vt_rol) => (
                                    <option key={vt_rol.id} value={vt_rol.id}>
                                        {vt_rol.descripcion}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <div className='text-center'>
                            <Button type='submit' variant='outline-primary' className='mt-4 px-5'>Crear</Button>
                        </div>

                    </Form>
                </div>
            </div>

        </div >
    )
}

export default CreateUsuario