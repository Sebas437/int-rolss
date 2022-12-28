import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Modal, Button, Form, Check } from "react-bootstrap";
import { BuildingAdd } from "react-bootstrap-icons";


const CreateEmpresa = (props) => {

  const [nit, setNit] = useState();
  const [nombre, setNombre] = useState();


  const store = async (e) => {
    e.preventDefault();
    await axios.post("http://127.0.0.1:8000/api/empresas", { nit: nit, nombre: nombre });

    setNit("");
    setNombre('');

    props.getEmpresas();
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
              <Form.Control value={nit} onChange={(e) => setNit(e.target.value)} required type='text' />
            </Form.Group>

            <Form.Group className='mt-3'>
              <Form.Label>Nombre: <strong className="text-danger">*</strong></Form.Label>
              <Form.Control value={nombre} onChange={(e) => setNombre(e.target.value)} type='text' required />
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