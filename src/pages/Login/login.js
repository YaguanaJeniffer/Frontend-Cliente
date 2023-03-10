import React from "react";
//css
import "./login.css";
import Title from "./components/Title/Title";
import Label from "./components/Label/Label";
import Footer from "./components/Footer/Footer";
import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { Button } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { notification } from "antd";
import { BsExclamationOctagonFill } from "react-icons/bs";
//servicio
import { ApiUrl } from "../../service/ApiRest";
//librerias
import axios from "axios";

/**
 * Componente de Login.
 * @extends React.Component
 * @memberof module:Login
 * @prop {Function} manejadorSubmit - Función que evita el comportamiento por defecto al hacer submit en el formulario.
 * @prop {Function} manejadorChange - Función que maneja los cambios en los inputs del formulario.
 * @prop {Function} manejadorBoton - Función que maneja el evento de click en el botón de inicio de sesión.
 */

class Login extends React.Component {

  /**
   * State de la clase.
   * @property {Object} form - Objeto que almacena los valores de los inputs del formulario.
   * @property {String} form.email - Valor del input de correo electrónico.
   * @property {String} form.password - Valor del input de contraseña.
   * @property {Boolean} error - Booleano que indica si ha ocurrido un error en la petición a la API.
   * @property {String} errorMsg - Mensaje de error si ha ocurrido un error en la petición a la API.
   * @memberof module:Login.Login
   */
  state = {
    form: {
      email: "",
      password: "",
    },
    error: false,
    errorMsg: "",
  };

/**
   * Función que se ejecuta justo antes de montar el componente.
   * Verifica si el usuario ya tiene un token y un correo electrónico guardados en el localStorage, y en tal caso, redirige a la página de home.
   * @memberof module:Login.Login
   */
  componentDidMount() {
    const token = localStorage.getItem("Token");
    const username = localStorage.getItem("email");
    if (token && username) {
      this.props.history.push("/home");
    }
  }

  /**
  @function manejadorSubmit
  @param {Event} e - Evento del formulario
  @description Función que previene el envío del formulario y su recarga
  */
  manejadorSubmit = (e) => {
    e.preventDefault();
  };

  /**
@function manejadorChange
@param {Event} e - Evento del formulario
@description Función que actualiza el estado de los campos del formulario
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

  @function manejadorBoton
  @description Función que realiza una llamada a la API para iniciar sesión
  y almacenar el token y el correo electrónico en el local storage.
  */
  manejadorBoton = () => {
    let url = ApiUrl + "auth/signin/client";
    axios
      .post(url, this.state.form)
      .then((response) => {
        // console.log(response.data.data.token);
        if (response.request.status === 200) {
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("email", response.data.data.username);
          this.props.history.push("/home");
        } else {
          this.setState({
            error: true,
            errorMsg: response.data.message,
          });
        }
      })
      .catch((error) => {
        if (error.response) {

          if (error.response.status === 401 || error.response.status === 400) {
            notification.open({
              message: (
                <div style={{color:"red"}}>
                  <BsExclamationOctagonFill style={{fontSize:"25px",marginBottom:"-7px"}}/>
                  <span style={{ marginLeft: '10px' }}>Credicenciales incorrectas.</span>
                </div>
              ),
              duration: 10,
              style: {
              backgroundColor: "#fff",
              },
            });
          }
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
  };

  /**
   * Renderiza el componente de login.
   *
   * @returns {JSX} El componente de login con el formulario y opciones de registro.
   */
  render() {
    return (
      <React.Fragment>
        <div className="Contenedor">
          <div className="ModalPadre"></div>

          <div className="ModalHijo">
            <div style={{ marginTop: "131px" }}>
              <Title text="BUS-LINK "></Title>
            </div>
            <Label text="Por favor inicie sesión en su cuenta."></Label>

            <div className="information">
              <form onSubmit={this.manejadorSubmit}>
                <div>
                  <Input
                    className="Text"
                    placeholder="Correo electronico"
                    prefix={<UserOutlined />}
                    type="email"
                    name="email"
                    onChange={this.manejadorChange}
                  />
                </div>
                <div>
                <Input.Password
                  className="Text"
                  placeholder="Contraseña"
                  prefix={<LockOutlined />}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  type="password"
                  name="password"
                  onChange={this.manejadorChange}
                />
                </div>
                <Button
                  type="submit"
                  shape="round"
                  size="large"
                  style={{
                    backgroundColor: "#1677ff",
                    width: "250px",
                    color: "#fff",
                    marginTop: "23px",
                  }}
                  onClick={this.manejadorBoton}
                >
                  INGRESAR
                </Button>
              </form>
              <p>
                ¿No tienes cuenta?
                <Link to="/register">Registrate aquí</Link>
              </p>
            </div>

            <Footer></Footer>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

/**
 * Exporta la clase Login para ser utilizada en otros componentes.
 * @default
 */
export default Login;