import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Form } from "react-bootstrap";

const FrmValidar = () => {

    const [cedula, setCedula] = useState('');

    return (
        <div>
            <Form>

                <Form.Group>
                    <Form.Label>Documento: <strong className="text-danger">*</strong></Form.Label>
                    <Form.Control value={cedula} onChange={(e) => setCedula(e.target.value)} required type='text' />
                </Form.Group>

                <div className='text-center'>
                    <Button type='submit' variant='outline-primary' className='mt-4 px-5'>Validar</Button>
                </div>


            </Form>
        </div>
    )
}

export default FrmValidar