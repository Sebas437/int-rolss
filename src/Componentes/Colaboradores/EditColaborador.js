import React, { useState } from 'react';
import { Gear, Eye } from "react-bootstrap-icons";
import { Modal, Button, Form } from "react-bootstrap";
import { showSuccessAlert, showErrorAlert } from '../alerts.js';

const EditColaborador = (props) => {

    // Declaramos las variables de estado
    const [nombre, setNombre] = useState(props.datos.nombre);
    const [apellidos, setApellidos] = useState(props.datos.apellidos);
    const [n_contacto, setN_contacto] = useState(props.datos.n_contacto);
    const [arlnew, setArlnew] = useState(null);
    const [f_cedulanew, setF_cedulanew] = useState(null);
    const [c_alturasnew, setC_alturasnew] = useState(null);

    const documento = props.datos.documento;
    const id_archivo = props.datos.id_archivo;
    const arl = props.datos.archivo.arl;
    const f_cedula = props.datos.archivo.f_cedula;
    const c_alturas = props.datos.archivo.c_alturas;

    // Funciones del modal
    const [modal, setModal] = useState(false);
    const modalShow = () => setModal(true);
    const modalClose = () => setModal(false);

    const editColaborador = async (e) => {
        e.preventDefault();

        // Asignamos a las variables los datos de arl, f_cedula, c_altura
        const fileArl = document.getElementById("arl2");
        const fileF_cedula = document.getElementById("f_cedula2");
        const fileC_alturas = document.getElementById("c_alturas2");

        // Validamos si los archivos que subieron son PDF
        if (fileArl.files[0] == undefined || fileArl.files[0] && fileArl.files[0].type === "application/pdf") {

            if (fileF_cedula.files[0] == undefined || fileF_cedula.files[0] && fileF_cedula.files[0].type === "application/pdf") {

                if (fileC_alturas.files[0] == undefined || fileC_alturas.files[0] && fileC_alturas.files[0].type === "application/pdf") {

                    const formData = new FormData();

                    // Añadimos los datos al objeto FormData 
                    formData.append('nombre', nombre);
                    formData.append('apellidos', apellidos);
                    formData.append('n_contacto', n_contacto);
                    formData.append('id_archivo', id_archivo);
                    formData.append('arl_old', arl);
                    formData.append('f_cedula_old', f_cedula);
                    formData.append('c_alturas_old', c_alturas);
                    formData.append('arl', arlnew);
                    formData.append('f_cedula', f_cedulanew);
                    formData.append('c_alturas', c_alturasnew);

                    // Hacemos la peticion y enviamos en el body el formData
                    // Hacemos peticion post y en la url ponemos ?_method=PUT, Ya que laravel tiene 
                    // errores al usar put y enviar formdata en el body
                    await fetch(`http://127.0.0.1:8000/api/colaborador/${documento}?_method=PUT`, {
                        method: 'POST',
                        body: formData,
                    })
                        .then(res => res.json())
                        .then(data => {
                            // Validamos la respuesta del back
                            if (data === true) {
                                // Exito
                                props.getColaboradores(); //Recargamos la Table 
                                modalClose();
                                showSuccessAlert('Colaborador');

                            } else {
                                // Error, no se inserto el colaborador
                                showErrorAlert();
                                console.log(data)
                            }
                        })

                } else {
                    // Los archivos no son un PDF
                    alert("Los archivos no son PDF, Verifique nuevamente por favor");
                }

            } else {
                // Los archivos no son un PDF
                alert("Los archivos no son PDF, Verifique nuevamente por favor");
            }
        } else {
            // Los archivos no son un PDF
            alert("Los archivos no son PDF, Verifique nuevamente por favor");
        }
    }




    return (
        <div>

            <button className='btn btn-primary' onClick={modalShow}><Gear /></button>

            <Modal show={modal} onHide={modalClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Editar Colaborador </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        <Form className='row m-1' onSubmit={editColaborador}>

                            <Form.Group className='col-lg-6'>
                                <Form.Label>Documento: <strong className="text-danger">*</strong></Form.Label>
                                <Form.Control value={documento} disabled type='text' />
                            </Form.Group>

                            <Form.Group className='col-lg-6'>
                                <Form.Label>Nombre: <strong className="text-danger">*</strong></Form.Label>
                                <Form.Control value={nombre} onChange={(e) => setNombre(e.target.value)} type='text' required />
                            </Form.Group>

                            <Form.Group className='col-lg-6 mt-2'>
                                <Form.Label>Apellidos: <strong className="text-danger">*</strong></Form.Label>
                                <Form.Control value={apellidos} onChange={(e) => setApellidos(e.target.value)} type='text' required />
                            </Form.Group>

                            <Form.Group className='col-lg-6 mt-2'>
                                <Form.Label>Numero de contacto: <strong className="text-danger">*</strong></Form.Label>
                                <Form.Control value={n_contacto} onChange={(e) => setN_contacto(e.target.value)} type='number' required />
                            </Form.Group>

                            <Form.Group className='row mt-4'>
                                <Form.Label className='h5'>Arl: <strong className="text-danger">*</strong></Form.Label>
                                <div className='col-lg-6'>
                                    <h6>Archivo almacenado</h6>
                                    <a className='frmedit' href={`./viewpdf?doc=${documento}&url=${arl}`} target='_blank'>
                                        <Eye /> Ver
                                    </a>
                                </div>

                                <div className='col-lg-6'>
                                    <h6 className='mt-2 mt-lg-0'>Subir nuevo archivo</h6>
                                    <Form.Control onChange={(e) => setArlnew(e.target.files[0])} type='file' accept=".pdf" id='arl2' />
                                </div>
                            </Form.Group>

                            <Form.Group className='row mt-4'>
                                <Form.Label className='h5'>Fotocopia Cedula: <strong className="text-danger">*</strong></Form.Label>

                                <div className='col-lg-6'>
                                    <h6>Archivo almacenado</h6>
                                    <a className='frmedit' href={`./viewpdf?doc=${documento}&url=${f_cedula}`} target='_blank'>
                                        <Eye /> Ver
                                    </a>
                                </div>

                                <div className='col-lg-6'>
                                    <h6 className='mt-2 mt-lg-0'>Subir nuevo archivo</h6>
                                    <Form.Control onChange={(e) => setF_cedulanew(e.target.files[0])} type='file' accept=".pdf" id='f_cedula2' />
                                </div>

                            </Form.Group>


                            <Form.Group className='row mt-4'>
                                <Form.Label className='h5'>Certificado Trabajo en alturas:</Form.Label>
                                {c_alturas != null && c_alturas != "null" ?
                                    <div className='col-lg-6'>
                                        <h6 >Archivo almacenado</h6>
                                        <a className='frmedit' href={`./viewpdf?doc=${documento}&url=${c_alturas}`} target='_blank'>
                                            <Eye /> Ver
                                        </a>
                                    </div>
                                    : ""}

                                <div className='col-lg-6'>
                                    <h6 className='mt-2 mt-lg-0'>Subir nuevo archivo</h6>
                                    <Form.Control onChange={(e) => setC_alturasnew(e.target.files[0])} type='file' id='c_alturas2' accept=".pdf" />
                                </div>
                            </Form.Group>



                            <div className='text-center'>
                                <Button type='submit' variant='outline-primary' className='mt-5 mb-2 px-5'>Editar</Button>
                            </div>

                        </Form>
                    </>
                </Modal.Body>
            </Modal>
        </div >
    )
}

export default EditColaborador