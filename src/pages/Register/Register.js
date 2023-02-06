/**
@file Register.js
@author Jeniffer
@desc [Archivo para registarse]
@return {React.Fragment} Devuelve un componente React.Fragment que contiene un formulario de registro.
*/
import React from "react";
//css
import "./Register.css";
import Label from "../Login/components/Label/Label";
import { Button, Form, Input } from "antd";
import { notification } from "antd";
import { BsExclamationOctagonFill } from "react-icons/bs";
import { HiCheckBadge } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { FaHouseUser } from 'react-icons/fa';
//servicio
import { ApiUrl } from "../../service/ApiRest";
//librerias
import axios from "axios";

/**

Función que muestra un mensaje de éxito en la consola.
@param {object} values - Valores recibidos.
@returns {void}
*/
const onFinish = (values) => {
  console.log("Success:", values);
};

/**
Función que muestra un mensaje de error en la consola.
@param {object} errorInfo - Información sobre el error.
@returns {void}
*/
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

/**

Clase que representa el componente de registro de usuario.
@class
@extends React.Component
*/

class Register extends React.Component {
/*
Estado inicial del componente.
@type {object}
@property {object} form - Datos del formulario.
@property {boolean} error - Indicador de error.
@property {string} errorMsg - Mensaje de error.
*/
  state = {
    form: {
      ci: "",
      full_name: "",
      phone: "",
      city: "",
      email: "",
      password: "",
    },
    error: false,
    errorMsg: "",
  };

  /**
  Manejador de evento de submit.
  @param {object} e - Evento.
  @returns {void}
  */
  manejadorSubmit = (e) => {
    e.preventDefault();
  };

  /**
  Manejador de evento de cambio de input.
  @param {object} e - Evento.
  @returns {void}
  */
  manejadorChange = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  /**
  Manejador de evento de clic en botón.
  @returns {void}
  */
  manejadorBoton = () => {
    console.log("enviado");
    let url = ApiUrl + "auth/singup/client";
    axios
      .post(url, this.state.form)

      .then((response) => {
        //console.log(response);

        notification.open({
          message: (
            <div  style={{color:"#389e0d"}}>
              <HiCheckBadge style={{fontSize:"25px",marginBottom:"-7px"}}/>
              <span style={{ marginLeft: '10px' }}>Usuario registrado de manera exitosa</span>
            </div>
          ),
          duration: 10,
          style: {
          backgroundColor: "#fff",
          },
        });
        this.props.history.push("/");

      })
      .catch((error) => {
        if (error.response) {
          // El servidor respondió con un código de estado de error
          //console.log(error.response.data.message);
          //console.log(error.response.status);
          if(error.response.data.message ==="ERROR DE VALIDACIÓN"){
            notification.open({
              message: (
                <div style={{color:"red"}}>
                  <BsExclamationOctagonFill style={{fontSize:"25px",marginBottom:"-7px"}}/>
                  <span style={{ marginLeft: '10px' }}>Campos inválidos</span>
                </div>
              ),
              duration: 10,
              style: {
              backgroundColor: "#fff",
              
              },
            });

          } else if(error.response.data.message ==="Ya existe una cuenta asociada a ese email."){
            notification.open({
              message: (
                <div style={{color:"red"}}>
                  <BsExclamationOctagonFill style={{fontSize:"25px",marginBottom:"-7px"}}/>
                  <span style={{ marginLeft: '10px' }}>EL usuario ya existe.</span>
                </div>
              ),
              duration: 10,
              style: {
              backgroundColor: "#fff",
              },
            });
          }

          if (error.response.status === 401 || error.response.status === 400) {
            this.setState({
              error: true,
              errorMsg: "El usuario ya existe.",
            });
          }
        } else if (error.request) {
          //console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
  };

  /**
  @desc [Función que renderiza el componente. Muestra un formulario de registro en una ventana modal.]
  @return {React.Fragment} Devuelve un componente React.Fragment que contiene un formulario de registro.
  */
  render() {
    return (
      <React.Fragment>
        <div className="Contenedor">
          <div className="ModalPadre"></div>
          <div className="ModalHijo">
          <div>
            <Link to="/">
            <div>
            <FaHouseUser  type="user" />
              <p>Inicio de Sesion</p>
            </div>
          </Link></div>
          
            <div>
              <label className="title-label">BUS-LINK </label>
            </div>
            <Label text="Complete el formulario con sus datos."></Label>

            <div className="information">
              <Form
                name="basic"
                labelCol={{
                  span: 7,
                }}
                wrapperCol={{
                  span: 15,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                onSubmit={this.handleSubmit}
              >
                <Form.Item
                  label="Cédula"
                  name="cedula"
                  rules={[
                    {
                      required: true,
                      message: "Campo vacío",
                    },
                  ]}
                >
                  <Input
                    name="ci"
                    onChange={this.manejadorChange}
                    maxLength="10"
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <div>
                      Nombres
                      <br />
                      Completos
                    </div>
                  }
                  name="full_names"
                  rules={[
                    {
                      required: true,
                      message: "Campo vacío",
                    },
                  ]}
                  style={{ marginBottom: 0 }}
                >
                  <Input
                    name="full_name"
                    onChange={this.manejadorChange}
                    maxLength="50"
                  />
                </Form.Item>
                <Form.Item
                  label="Celular"
                  name="celular"
                  rules={[
                    {
                      required: true,
                      message: "Campo vacío",
                    },
                  ]}
                >
                  <Input
                    name="phone"
                    onChange={this.manejadorChange}
                    maxLength="10"
                  />
                </Form.Item>

                <Form.Item
                  label="Ciudad"
                  name="ciudad"
                  rules={[
                    {
                      required: true,
                      message: "Campo vacío",
                    },
                  ]}
                >
                  <Input
                    name="city"
                    onChange={this.manejadorChange}
                    maxLength="20"
                  />
                </Form.Item>

                <Form.Item
                  label="Correo"
                  name="correo"
                  rules={[
                    {
                      required: true,
                      message: "Campo vacío",
                    },
                  ]}
                >
                  <Input
                    name="email"
                    onChange={this.manejadorChange}
                    type="email"
                  />
                </Form.Item>

                <Form.Item
                  label="Contraseña"
                  name="contrasenia"
                  rules={[
                    {
                      required: true,
                      message: "Campo vacío",
                    },
                  ]}
                >
                  <Input.Password
                    name="password"
                    onChange={this.manejadorChange}
                    maxLength="12"
                  />
                </Form.Item>

                <div style={{ textAlign: "center" }}>
                  <Button
                    className="Button2"
                    type="submit"
                    shape="round"
                    size="large"
                    style={{
                      backgroundColor: "#1677ff",
                      width: "250px",
                      color: "#fff",
                      margin: "10px",
                      borderColor:"#fff"
                    }}
                    onClick={this.manejadorBoton}
                  >
                    REGISTRARME
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
/**
 * Exporta la clase Register para ser utilizada en otros componentes.
 * @default
 */
export default Register;
