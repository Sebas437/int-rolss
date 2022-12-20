import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Modal, Button, Form } from "react-bootstrap";
import { Person, Camera } from "react-bootstrap-icons";
import './ValidaOk.css'

import FrmValidar from './FrmValidar';

const ValidaOk = () => {

  const [frmvalidar, setFrmvalidar] = useState(true);

  const escaner = async () => {
    setFrmvalidar(false)
  }

  return (
    <div className='validaok'>

      <div className="card shadow mt-5 mb-2 mx-2">
        <div className="card-body m-3">

          <div className='text-center'>
            <h4>Validar Entrada <Person /></h4>
          </div>
          <hr className='mb-4'></hr>

          <div className='row justify-content-center mb-3'>
            <Button type='submit' variant='outline-primary' className='col-5 me-2' onClick={(e) => setFrmvalidar(true)}>
              Formulario
            </Button>

            <Button type='submit' variant='outline-primary' className='col-5 ms-2' onClick={(e) => escaner()}>
              Escaner
            </Button>
          </div>

          {frmvalidar == true ? <FrmValidar /> : null}

        </div>
      </div>

    </div >
  )
}

export default ValidaOk