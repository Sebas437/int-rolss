import React, { useEffect, useState } from "react";
import axios from "axios";
import colaboradores from "../../api/colaboradoresEmpresa.json"
import { Modal, Button, Form, Table } from "react-bootstrap";

const ModalValidacion = (props) => {
  const [cedula, setCedula] = useState(props.datos.cedula);
  const [nombre, setNombre] = useState(props.datos.nombre);
  const [apellidos, setApellidos] = useState(props.datos.apellidos);
  const [n_contacto, setN_contacto] = useState(props.datos.n_contacto);
  const [fecha, setFecha] = useState(props.datos.fecha);
  const [labor, setLabor] = useState(props.datos.labor);
  const [arl, setArl] = useState();
  const [f_cedula, setF_cedula] = useState();
  const [c_alturas, setC_alturas] = useState();

  const [modal, setModal] = useState(false);

  const modalShow = () => setModal(true);
  const modalClose = () => setModal(false);

  return (
    <div>
      <button className="btn btn-primary" onClick={modalShow}>
        Validar Solicitud
      </button>

      <Modal show={modal} onHide={modalClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Validacion de solicitud</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <Form className="row m-1">
                
              <h4 className="mt-1 text-end">Colaboradores</h4>
              
              <Table striped responsive>
                
                <thead>
                  
                  <tr>
                    
                    <th>Fecha solicitud</th>
                    
                    <th>Cedula</th>
                    
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Numero</th>
                    <th>Arl</th>
                    
                    <th>C. Trabajo en Alturas</th>
                    <th>Labor a ejecutar</th>
                    <th>Aprobacion</th>
                  </tr>
                 
                </thead>
                <tbody>
                 
                  <tr>
                    <td>{fecha}</td>
                    <td>{cedula}</td>
                    <td>{nombre}</td>
                    <td>{apellidos}</td>
                    <td>{n_contacto}</td>
                    <td>{arl}</td>
                    
                    <td>{c_alturas}</td>
                    <td>{labor}</td>
                    <td>
                      <Form.Select aria-label="Default select example">
                        <option>Seleccione la opcion</option>
                        <option value="aprobado">Aprobado</option>
                        <option value="Naprobado">No aprobado</option>
                        
                      </Form.Select>
                    </td>
                  </tr>
                </tbody>
              </Table>
              

              <div className="text-end">
                <Button>Enviar</Button>
              </div>
            </Form>
          </>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalValidacion;
