import React from "react";
import { useMsal } from "@azure/msal-react";
import Button from "react-bootstrap/Button";

export const SignOutButton = () => {
    const { instance } = useMsal();
    
    const handleLogout = (logoutType) => {
        if (logoutType === "redirect") {
           instance.logoutRedirect({
                postLogoutRedirectUri: "http://localhost:3000/",
            });
        }
    }

    return (
        <Button variant="secondary" className="ml-auto" onClick={() => handleLogout("redirect")}>
            Cerrar Sesión
        </Button>
    );
}