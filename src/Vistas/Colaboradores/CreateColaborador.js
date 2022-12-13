import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Modal, Button, Form } from "react-bootstrap";
import { PersonAdd } from "react-bootstrap-icons";

const CreateColaborador = (props) => {

  const [cedula, setCedula]         = useState('');
  const [nombre, setNombre]         = useState('');
  const [apellidos, setApellidos]   = useState('');
  const [n_contacto, setN_contacto] = useState('');
  const [arl, setArl]               = useState(); 
  const [f_cedula, setF_cedula]     = useState();
  const [c_alturas, setC_alturas]   = useState();

  const insertColaborador = async (e) => {
      const f = new FormData();

  }


  return (

    <div>
      <div className="card shadow mb-2">
        <div className="card-body m-3">

          <div className='text-end'>
            <h4>Agregar Colaborador <PersonAdd /></h4>
          </div>
          <hr className='mb-4'></hr>

          <Form>

            <Form.Group>
              <Form.Label>Documento: <strong className="text-danger">*</strong></Form.Label>
              <Form.Control value={cedula} onChange={(e) => setCedula(e.target.value)} required type='text' />
            </Form.Group>

            <Form.Group className='mt-3'>
              <Form.Label>Nombre: <strong className="text-danger">*</strong></Form.Label>
              <Form.Control value={nombre} onChange={(e) => setNombre(e.target.value)} type='text' required />
            </Form.Group>

            <Form.Group className='mt-3'>
              <Form.Label>Apellidos: <strong className="text-danger">*</strong></Form.Label>
              <Form.Control value={apellidos} onChange={(e) => setApellidos(e.target.value)} type='text' required />
            </Form.Group>

            <Form.Group className='mt-3'>
              <Form.Label>Numero de contacto: <strong className="text-danger">*</strong></Form.Label>
              <Form.Control value={n_contacto} onChange={(e) => setN_contacto(e.target.value)} type='number' required />
            </Form.Group>

            <Form.Group className='mt-3'>
              <Form.Label>Arl: <strong className="text-danger">*</strong></Form.Label>
              <Form.Control value={arl} onChange={(e) => setArl(e.target.value)} type='file' required />
            </Form.Group>

            <Form.Group className='mt-3'>
              <Form.Label>Fotocopia Cedula: <strong className="text-danger">*</strong></Form.Label>
              <Form.Control value={f_cedula} onChange={(e) => setF_cedula(e.target.value)} type='file' required />
            </Form.Group>

            <Form.Group className='mt-3'>
              <Form.Label>Certificado Trabajo en alturas:</Form.Label>
              <Form.Control value={c_alturas} onChange={(e) => setC_alturas(e.target.value)} type='file' />
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

export default CreateColaborador