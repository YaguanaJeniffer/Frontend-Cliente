import React from "react";
import "./login.css";
import Title from "./components/Title/Title";
import Label from "./components/Label/Label";
import InputT from "./components/Input/Input";
import InputPass from "./components/InputPass/InputPass";
import ButtonI from "./components/Button/Button";


const Login = () => {
  return (
    <div className="Contenedor">
      <div className="ModalPadre">

      </div>

      <div className="ModalHijo">
        <Title  text="BUS-LINK "></Title>
        <Label  text="Por favor inicie sesión en su cuenta."></Label>

        <div className="information">
          <InputT> </InputT>
          <InputPass></InputPass>
          <ButtonI></ButtonI>
          <></>
        </div>
      </div>

    </div>
  );
};

export default Login;
