import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Modal, Button, Form } from "react-bootstrap";


const CreateEmpresa = (props) => {

  const [nit, setNit] = useState();
  const [nombre, setNombre] = useState();

  const [modal, setModal] = useState(false);
  const modalShow = () => setModal(true);
  const modalClose = () => setModal(false);

  return (

    <div>
      <div className="card shadow mt-5 mb-2">
        <div class="card-header text-primary"><i class="fas fa-plus-circle "></i>Agregar Empresa</div>

        <div class="card-body">
          <Form className='m-3' >

            <Form.Group>
              <Form.Label>Nit</Form.Label>
              <Form.Control value={nit} onChange={(e) => setNit(e.target.value)} required type='text' />
            </Form.Group>

            <Form.Group className='mt-3'>
              <Form.Label>Nombre</Form.Label>
              <Form.Control value={nombre} onChange={(e) => setNombre(e.target.value)} type='text' required />
            </Form.Group>


            <div className='text-center'>
              <Button type='submit' variant='outline-primary' className='mt-4 px-4'>Crear</Button>
            </div>

          </Form>
        </div>
      </div>

    </div >
  )
}

export default CreateEmpresa