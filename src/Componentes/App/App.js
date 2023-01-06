import './App.css';

import React, { useEffect, useState } from 'react'

import Dashboard from '../Dashboard/Dashboard';
import Preferences from '../Preferences/Preferences';
import Login from '../Login/Login';
import Empresas from '../Empresas/Empresas';
import Colaboradores from '../Colaboradores/Colaboradores';
import ValidaOk from '../ValidaOk/ValidaOk';
import ValidaColaborador from '../Colaboradores/ValidateColaborador'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import ViewPdf from '../ViewPdf/ViewPdf';

import Navbar1 from '../layouts/Navbar';


function App() {

  const setToken = (userToken) => {
    localStorage.setItem('token', JSON.stringify(userToken));
  }

  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);

    return userToken
  }

  const token = getToken();

  //Si el token no existe, llamos el login y le pasamos la funcion
  if (!token) {
    return <Login setToken={setToken} />
  }

  
  return (
    <div className="App">
      <BrowserRouter>

        <Navbar1 />

        <Routes>

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/empresas" element={<Empresas />} />
          <Route path="/colaboradores" element={<Colaboradores />} />
          <Route path="/validaok" element={<ValidaOk />} />
          <Route path="/verificacion" element={<ValidaColaborador />} />
          <Route path="/viewpdf" element={<ViewPdf />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
