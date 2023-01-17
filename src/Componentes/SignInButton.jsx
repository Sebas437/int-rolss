import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import Button from "react-bootstrap/Button";
import "./Login/Login.css";
import { useIsAuthenticated } from "@azure/msal-react";

export const SignInButton = () => {
    const { instance } = useMsal();

    const isAuthenticated = useIsAuthenticated();
    console.log(isAuthenticated);

    const handleLogin = (loginType) => {
        if (loginType === "redirect") {
            instance.loginRedirect(loginRequest).catch((e) => {
                console.log(e);
            });
        }
    };
    return (
        <Button variant="light" className="custom" onClick={() => handleLogin("redirect")}>{" "}<img className="microsoft-img m-2" src="/icons8-microsoft.svg" alt="" />
            Inicie sesión con Microsoft
        </Button>
    );
};
