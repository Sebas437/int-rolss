import React, { useEffect, useState } from "react";

import {Accordion, Container, Row, Col, Table} from "react-bootstrap";
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

  const [counter, setCounter] = useState(1);
  return (
    //Colaboradores Por Aprobar

    // <Container>
    
    //   <Row>
    //     <Col>
    //       <Accordion className=" mt-5">
    //         <div className=" mb-4">
              
    //           <h4>Colaboradores a validar</h4>
    //         </div>
    //         {colaboradores.map((item) =>
    //           //   valida y me trae solo los campos que aun no estan validados

    //           item.aprobacion === null || item.aprobacion === false ? (
    //             <Accordion>
    //               <Accordion.Item eventKey="0">
    //                 <Accordion.Header>
    //                   <div>{item.nombre + " " + item.apellidos}</div>
    //                 </Accordion.Header>
    //                 <Accordion.Body>
    //                   <div>
    //                     {
    //                       <div key={item.cedula}>
    //                         <div>
    //                           <b>Cedula: </b>
    //                           {item.cedula}
    //                         </div>
    //                         <div>
    //                           <b>Nombre: </b>
    //                           {item.nombre + " " + item.apellidos}
    //                         </div>
    //                         <div className=" mt-3">
    //                           <ModalValidacion datos={item} />
    //                         </div>
    //                       </div>
    //                     }
    //                   </div>
    //                 </Accordion.Body>
    //               </Accordion.Item>
    //             </Accordion>
    //           ) : (
    //             " "
    //           )
    //         )}
    //       </Accordion>
    //     </Col>
    //   </Row>

    //   {/* Colaboradores Aprobados */}

    //   <Accordion className=" mt-5">
    //     <div className=" mb-4">
    //       <h4>Colaboradores validados</h4>
    //     </div>
    //     {colaboradores.map((item) =>
    //       //  valida y me trae solo los campos que ya estan validados "true"

    //       item.aprobacion === true ? (
    //         <Accordion>
    //           <Accordion.Item eventKey="0">
    //             <Accordion.Header>
    //               <div>{item.nombre + " " + item.apellidos}</div>
    //             </Accordion.Header>
    //             <Accordion.Body>
    //               <div>
    //                 {
    //                   <div key={item.cedula}>
    //                     <div>
    //                       <b>Cedula: </b>
    //                       {item.cedula}
    //                     </div>
    //                     <div>
    //                       <b>Nombre: </b>
    //                       {item.nombre + " " + item.apellidos}
    //                     </div>
    //                     <div className=" mt-3">
    //                       <ModalValidacion datos={item} />
    //                     </div>
                       
    //                   </div>
    //                 }
    //               </div>
    //             </Accordion.Body>
    //           </Accordion.Item>
    //         </Accordion>
    //       ) : (
    //         " "
    //       )
    //     )}
    //   </Accordion>
    // </Container>

    <Container>
     <div className="my-5">
    <h3 className="fs-4">Solicitudes a validar</h3>
      <div className="table-responsive my-4 " style={{ height: '30vh' }}> 
        
     <Table >
      <thead>
        <tr>
          <th>#</th>
          <th>Fecha</th>
          <th>Nombre</th>
          <th>Cedula</th>
          
          
        </tr>
      </thead>
      <tbody>
        
       {colaboradores.map((item, index) =>
       
       item.aprobacion===false||item.aprobacion===null ? (
        
        <tr>
        <td>{index.length}</td>
        </tr>
        
       ):
       (" ")
       
       )}
    
          
       
       
        
      </tbody>
    </Table>
    </div>
    </div> 

    {/* --------------------------------------------------------------------------- */}


    
    <div className="my-5">
    <h3 className="fs-4">Solicitudes Validadas</h3>
      <div className="table-responsive my-4 h-300" style={{ height: '30vh' }}> 
        
     <Table >
      <thead>
        <tr>
          <th>#</th>
          {Array.from({ length: 5 }).map((_, index) => (
            <th key={index}>Table heading</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          {Array.from({ length: 5 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
        </tr>
        <tr>
          <td>2</td>
          {Array.from({ length: 5 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
        </tr>
        <tr>
          <td>3</td>
          {Array.from({ length: 5 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
        </tr>
        <tr>
          <td>2</td>
          {Array.from({ length: 5 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
        </tr>
        <tr>
          <td>2</td>
          {Array.from({ length: 5 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
        </tr>
        <tr>
          <td>2</td>
          {Array.from({ length: 5 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
        </tr>
        <tr>
          <td>2</td>
          {Array.from({ length: 5 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
        </tr>
        <tr>
          <td>2</td>
          {Array.from({ length: 5 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
        </tr>
        <tr>
          <td>2</td>
          {Array.from({ length: 5 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
        </tr>
        <tr>
          <td>2</td>
          {Array.from({ length: 5 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
        </tr>
        <tr>
          <td>2</td>
          {Array.from({ length: 5 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
        </tr>
      </tbody>
    </Table>
    </div>
    </div> 
    </Container>
    
    );

};

export default ModalSolicitud;
