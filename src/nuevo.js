import { redirect } from "react-router-dom";
import { useIsAuthenticated } from "@azure/msal-react";


function Login(){

    const isAuthenticated = useIsAuthenticated();
  
    console.log(isAuthenticated)
    if (isAuthenticated) {
      return redirect("./Componentes/Colaboradores/ValidateColaborador");
    }
  }
  
  export default Login