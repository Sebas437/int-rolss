import React, { useLayoutEffect, useState } from 'react';
import './ViewPdf.css'
const ViewPdf = () => {

  //Leemos los parametros en la url
  const searchParams = new URLSearchParams(window.location.search);
  //Asignamos los parametros a las variables
  const doc = searchParams.get('doc');
  const url = searchParams.get('url');

  const [archivo, setArchivo] = useState(null);
  
  useLayoutEffect(() => {

    //Ocultamos el navbar, para poder mostrar el archivo
    const navbar = document.getElementById('navbar');
    navbar.remove();
    
    getArchivo()
    
  }, [])
  
  const getArchivo = async () => {

    const respuesta = await fetch(`http://127.0.0.1:8000/api/colaboradorarchivo/${doc}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ archivo: url }),
    })

    const blob = await respuesta.blob()
    setArchivo(URL.createObjectURL(blob));
  }
  
  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
      <object
      data={archivo}
      type='application/pdf'
      width='100%'
      height='100%'
      >
      </object>
    </div>
  )
}

export default ViewPdf