import React from "react";

import { useMsal } from "@azure/msal-react";

import { PersonCircle } from "react-bootstrap-icons";
import "./layouts/Navbar.css";

export const SignOutButton = () => {
  const { instance } = useMsal();
 

  const handleLogout = (logoutType) => {
    if (logoutType === "redirect") {
      instance.logoutRedirect({
        postLogoutRedirectUri: "http://localhost:3000/",
      });
    }
  };

  return (

    <div class="dropdown">
      <a
        class="btn btn-primary dropdown-toggle "
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <PersonCircle />
      </a>

      <ul class="dropdown-menu">
        <li>
          <a
            onClick={() => handleLogout("redirect")}
            class="dropdown-item"
            href="#"
          >
            Cerrar sesión
          </a>
        </li>
      </ul>
    </div>
  );
};
