import React from "react";
import "./login.css";
import Title from "./components/Title/Title";
import Label from "./components/Label/Label";
import TextLabel from "./components/TextLabel/TextLabel";

const Login = () => {
  return (
    <div className="ModalPadre">
     
      <div className="ModalHijo">
        Soy un login
        <Title text="Bienvenidos "></Title>
        <Label text="Por favor inicie sesión en su cuenta."></Label>
        <div className="information">
          <TextLabel text="Usuario"></TextLabel>
          
          <TextLabel text="Contraseña"></TextLabel>
        </div>
      </div>
    </div>
  );
};

export default Login;
