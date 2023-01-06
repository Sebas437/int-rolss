import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Modal, Button, Form } from "react-bootstrap";
import { PersonAdd } from "react-bootstrap-icons";
import { showSuccessAlert, showErrorAlert } from '../alerts.js';

const CreateColaborador = (props) => {

  const [documento, setDocumento] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [n_contacto, setN_contacto] = useState('');

  const [arl, setArl] = useState(null);
  const [f_cedula, setF_cedula] = useState(null);
  const [c_alturas, setC_alturas] = useState(null);

  const insertColaborador = async (e) => {
    e.preventDefault();
    const fileArl = document.getElementById("arl");
    const fileF_cedula = document.getElementById("f_cedula");
    const fileC_alturas = document.getElementById("c_alturas");

    // if (fileInput.files[0] && fileInput.files[0].type === "application/pdf"
    // ) {
    //   // El archivo es un PDF
    // } else {
    //   // El archivo no es un PDF
    // }

    const formData = new FormData();

    // Añadimos más datos al objeto FormData si es necesario
    formData.append('documento', documento);
    formData.append('nombre', nombre);
    formData.append('apellidos', apellidos);
    formData.append('n_contacto', n_contacto);
    formData.append('arl', arl);
    formData.append('f_cedula', f_cedula);
    formData.append('c_alturas', c_alturas);

    await fetch("http://127.0.0.1:8000/api/colaboradores", {
      method: 'POST',
      body: formData,
    })
    .then(res => res.json())
    .then(data => {

      if (data === false) {
        showErrorAlert();
      }else if(data === true){
        props.getColaboradores();
        e.target.reset();
        showSuccessAlert('Colaborador');
      }

    })
  

    
    
  };


  return (

    <div>
      <div className="card shadow mb-2">
        <div className="card-body m-3">

          <div className='text-end'>
            <h4>Agregar Colaborador <PersonAdd /></h4>
          </div>
          <hr className='mb-4'></hr>

          <Form onSubmit={insertColaborador}>

            <Form.Group>
              <Form.Label>Documento: <strong className="text-danger">*</strong></Form.Label>
              <Form.Control onChange={(e) => setDocumento(e.target.value)} required type='text' />
            </Form.Group>

            <Form.Group className='mt-3'>
              <Form.Label>Nombre: <strong className="text-danger">*</strong></Form.Label>
              <Form.Control onChange={(e) => setNombre(e.target.value)} type='text' required />
            </Form.Group>

            <Form.Group className='mt-3'>
              <Form.Label>Apellidos: <strong className="text-danger">*</strong></Form.Label>
              <Form.Control onChange={(e) => setApellidos(e.target.value)} type='text' required />
            </Form.Group>

            <Form.Group className='mt-3'>
              <Form.Label>Numero de contacto: <strong className="text-danger">*</strong></Form.Label>
              <Form.Control onChange={(e) => setN_contacto(e.target.value)} type='number' required />
            </Form.Group>

            <Form.Group className='mt-3'>
              <Form.Label>Arl: <strong className="text-danger">*</strong></Form.Label>
              <Form.Control onChange={(e) => setArl(e.target.files[0])} type='file' accept=".pdf" id='arl' required />
            </Form.Group>

            <Form.Group className='mt-3'>
              <Form.Label>Fotocopia Cedula: <strong className="text-danger">*</strong></Form.Label>
              <Form.Control onChange={(e) => setF_cedula(e.target.files[0])} type='file' accept=".pdf" id='f_cedula' required />
            </Form.Group>

            <Form.Group className='mt-3'>
              <Form.Label>Certificado Trabajo en alturas:</Form.Label>
              <Form.Control onChange={(e) => setC_alturas(e.target.files[0])} type='file' id='c_alturas' accept=".pdf" />
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