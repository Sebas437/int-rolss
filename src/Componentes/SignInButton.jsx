import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import Button from "react-bootstrap/Button";
import { redirect } from 'react-router-dom';
import { useState } from 'react';
import { useIsAuthenticated } from "@azure/msal-react";
import { Windows } from "react-bootstrap-icons";




/**
 * Renders a button which, when selected, will redirect the page to the login prompt
 */
export const SignInButton = () => {
    const { instance } = useMsal();

    const isAuthenticated = useIsAuthenticated();
    console.log(isAuthenticated)

    const handleLogin = (loginType) => {
        if (loginType === "redirect") {
            instance.loginRedirect(loginRequest).catch(e => {
                console.log(e);
            });
           
        }
       
       
    }
    return (
       
        <Button variant="light"  className="ml-auto w-10 text-end" onClick={() => handleLogin("redirect")}><Windows />Microsoft</Button>
        
       
    );
}