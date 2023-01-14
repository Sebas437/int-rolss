import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Componentes/App/App';
import Button from 'bootstrap';
import "@fontsource/montserrat";


import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";

import 'bootstrap/dist/css/bootstrap.min.css'


const msalInstance = new PublicClientApplication(msalConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
    
root.render(
    <React.StrictMode>
    <MsalProvider instance={msalInstance}>
        <App />
    </MsalProvider>
</React.StrictMode>
    
);

const account = msalInstance.getAccountByUsername;
console.log(account)
