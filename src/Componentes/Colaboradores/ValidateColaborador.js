import React, { useEffect, useState } from "react";
import axios from "axios";
import {Accordion, Container, Row, Col} from "react-bootstrap";
import datos from "../../api/colaboradoresEmpresa.json";
import ModalValidacion from "./ModalValidacion";

const ModalSolicitud = () => {
  const [colaboradores, setColaboradores] = useState([]);
 

  useEffect(() => {
    getColaboradores();
  }, []);

  const getColaboradores = async () => {
    // await fetch(`${endpoint}/products`, {
    //     method: 'GET',
    //     headers: { 'Content-Type': 'application/json;charset=utf-8' }
    // })
    //     .then(res => res.json())
    //     .then(data => { setProducts(data) })
    setColaboradores(datos);
    
  };


  return (
    //Colaboradores Por Aprobar

    <Container>
      <Row>
        <Col>
          <Accordion className=" mt-5">
            <div className=" mb-4">
              <h4>Colaboradores a validar</h4>
            </div>
            {colaboradores.map((item) =>
              //   valida y me trae solo los campos que aun no estan validados

              item.aprobacion === null || item.aprobacion === false ? (
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <div>{item.nombre + " " + item.apellidos}</div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div>
                        {
                          <div key={item.cedula}>
                            <div>
                              <b>Cedula: </b>
                              {item.cedula}
                            </div>
                            <div>
                              <b>Nombre: </b>
                              {item.nombre + " " + item.apellidos}
                            </div>
                            <div className=" mt-3">
                              <ModalValidacion datos={item} />
                            </div>
                          </div>
                        }
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              ) : (
                " "
              )
            )}
          </Accordion>
        </Col>
      </Row>

      {/* Colaboradores Aprobados */}

      <Accordion className=" mt-5">
        <div className=" mb-4">
          <h4>Colaboradores validados</h4>
        </div>
        {colaboradores.map((item) =>
          //  valida y me trae solo los campos que ya estan validados "true"

          item.aprobacion === true ? (
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <div>{item.nombre + " " + item.apellidos}</div>
                </Accordion.Header>
                <Accordion.Body>
                  <div>
                    {
                      <div key={item.cedula}>
                        <div>
                          <b>Cedula: </b>
                          {item.cedula}
                        </div>
                        <div>
                          <b>Nombre: </b>
                          {item.nombre + " " + item.apellidos}
                        </div>
                        <div className=" mt-3">
                          <ModalValidacion datos={item} />
                        </div>
                       
                      </div>
                    }
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ) : (
            " "
          )
        )}
      </Accordion>
    </Container>


  );
};

export default ModalSolicitud;
