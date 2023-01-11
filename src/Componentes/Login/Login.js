import React, { useEffect, useState } from 'react'
import { Form, Button } from "react-bootstrap";
import "./Login.css"
import PropTypes from 'prop-types';
import datos from '../../api/datos.json'

import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "../SignInButton";
import { SignOutButton } from "../SignOutButton";

const Login = ({ setToken }) => {

  const [user, setUser] = useState();
  const [contra, setContra] = useState();
  const isAuthenticated = useIsAuthenticated();

  const validar = async (e) => {
    e.preventDefault();

    // await fetch('http://127.0.0.1:8000/api/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(user, contra)
    // })
    //   .then(data => data.json())
    //   .then(data => { setToken(data.token) })
    setToken("data.token")
  }
  

  return (
    <div className='login'>

      <div className='row vh-100 align-items-center justify-content-center'>

        <div className='row row_login justify-content-md-center'>

          <img src="/rosa.jpg" className='col-lg-6 img_rosa'></img>

          <div className='col-lg-4 frm_login'>
            <Form onSubmit={validar}>
              <h2 className="text-center px-5 pt-3 pb-5">Inicio de Sesión</h2>

              <Form.Group className="h5 mb-5 mx-5" controlId="formBasicEmail">
                <Form.Label>Usuario</Form.Label>
                <Form.Control type="text" onChange={(e) => setUser(e.target.value)} />
              </Form.Group>

              <Form.Group className="h5 mb-4 mx-5" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" onChange={e => setContra(e.target.value)} />
              </Form.Group>

              <div className='mt-5 text-center'>
                <Button variant="success" type="submit">
                  Submit
                </Button>
              </div>

            </Form>
          </div>
          { isAuthenticated ? <SignOutButton /> : <SignInButton /> }

        </div>
      </div>

    </div>
  )
}

//Requerimos la funcion setToken si o si, la cual nos llega desde app.js
Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default Login 