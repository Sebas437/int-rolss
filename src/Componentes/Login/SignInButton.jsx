import React from "react";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";

import { Windows } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";

export const SignInButton = () => {
    const { instance } = useMsal();

    const setToken365 = async () => {
        localStorage.setItem('typeLog', JSON.stringify('365'));
    }

    const handleLogin = (loginType) => {
        if (loginType === "redirect") {
            instance.loginRedirect(loginRequest).catch(e => {
                console.log(e);
            });
            setToken365();
        }
       
    }
    return (
        <Button variant="light"  className="ml-auto w-10 text-end" onClick={() => handleLogin("redirect")}>
            <Windows />Microsoft
        </Button>       
    );
}