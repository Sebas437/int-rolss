import React, { useState } from 'react'
import { Button, Form, Check } from "react-bootstrap";
import { BuildingAdd } from "react-bootstrap-icons";


const CreateEmpresa = (props) => {

  // Declaramos las variables de estado
  const [nit, setNit] = useState('');
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');


  const store = async (e) => {
    e.preventDefault();

    await fetch("http://127.0.0.1:8000/api/empresas", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ nit: nit, nombre: nombre, correo: correo })
    })
      .then(a => {
        e.target.reset(); //Vaciamos el formulario
        props.getEmpresas();
      })
  }

  return (

    <div>
      <div className="card shadow mb-2">
        <div className="card-body m-3">

          <div className='text-end'>
            <h4>Agregar Empresa <BuildingAdd /></h4>
          </div>
          <hr className='mb-4'></hr>

          <Form onSubmit={store}>

            <Form.Group>
              <Form.Label>Nit: <strong className="text-danger">*</strong></Form.Label>
              <Form.Control onChange={(e) => setNit(e.target.value)} required type='text' />
            </Form.Group>

            <Form.Group className='mt-3'>
              <Form.Label>Nombre: <strong className="text-danger">*</strong></Form.Label>
              <Form.Control onChange={(e) => setNombre(e.target.value)} type='text' required />
            </Form.Group>

            <Form.Group className='mt-3'>
              <Form.Label>Correo: <strong className="text-danger">*</strong></Form.Label>
              <Form.Control onChange={(e) => setCorreo(e.target.value)} type='email' required />
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

export default CreateEmpresa