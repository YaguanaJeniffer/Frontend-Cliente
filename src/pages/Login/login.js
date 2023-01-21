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
import { Alert } from "antd";
import { Link } from "react-router-dom";
import { notification } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
//servicio
import { ApiUrl } from "../../service/ApiRest";
//librerias
import axios from "axios";

class Login extends React.Component {
  state = {
    form: {
      email: "",
      password: "",
    },
    error: false,
    errorMsg: "",
  };

  manejadorSubmit = (e) => {
    e.preventDefault();
  };

  manejadorChange = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  manejadorBoton = () => {
    let url = ApiUrl + "auth/signin/client";
    axios
      .post(url, this.state.form)
      .then((response) => {
        // console.log(response.data.data.token);
        if (response.request.status === 200) {
          localStorage.setItem("token", response.data.data.token);
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
          // El servidor respondió con un código de estado de error
          //console.log(error.response.data);
          //console.log(error.response.status);
          if (error.response.status === 401 || error.response.status === 400) {
            notification.open({
              message: <span style={{ color: '#f5222d' }}><CloseCircleOutlined /> Los campos ingresados son inválidos.</span>,
              duration: 10,
              style: {
                backgroundColor: "#fff1f0",
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

  render() {
    return (
      <React.Fragment>
        <div className="Contenedor">
          <div className="ModalPadre"></div>

          <div className="ModalHijo">
            {this.state.error === true && (
              <Alert message={this.state.errorMsg} type="error" />
            )}
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

export default Login;
