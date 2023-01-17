import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import Empresas from '../Empresas/Empresas';
import Colaboradores from '../Colaboradores/Colaboradores';
import ValidaOk from '../ValidaOk/ValidaOk';
import ValidaColaborador from '../Colaboradores/ValidateColaborador'
import ViewPdf from '../ViewPdf/ViewPdf';
import Usuarios from '../Usuarios/Usuarios';
import Navbar1 from '../layouts/Navbar';

import { useIsAuthenticated, useMsal } from "@azure/msal-react";

function App() {

  const { accounts } = useMsal();

  const setToken = (userToken) => {
    localStorage.setItem('token', JSON.stringify(userToken));
  }

  const getToken = (name) => {
    const tokenString = localStorage.getItem(name);
    const userToken = JSON.parse(tokenString);
    return userToken
  }

  const isAuthenticated = useIsAuthenticated();
  const token = getToken('token');

  //Si el token no existe, llamos el login y le pasamos la funcion
  if (!isAuthenticated && !token) {
    return <Login setToken={setToken} />
  }
  else if (getToken('typeLog') == '365') {
    const email = accounts[0] && accounts[0].username;
    
    console.log(email)
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar1 />
        <Routes>

          <Route path="/" element={<Dashboard />} />
          <Route path="/empresas" element={<Empresas />} />
          <Route path="/colaboradores" element={<Colaboradores />} />
          <Route path="/validaok" element={<ValidaOk />} />
          <Route path="/verificacion" element={<ValidaColaborador />} />
          <Route path="/viewpdf" element={<ViewPdf />} />
          <Route path="/usuarios" element={<Usuarios />} />

        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;




