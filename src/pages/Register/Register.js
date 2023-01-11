import React from "react";
//css
import "./Register.css";
import Label from "../Login/components/Label/Label";
import { Button, Form, Input } from "antd";

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

class Register extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="Contenedor">
          <div className="ModalPadre"></div>

          <div className="ModalHijo">
            <div>
              <label className="title-label">BUS-LINK </label>
            </div>
            <Label text="Crea una cuenta."></Label>

            <div className="information" >
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
                  <Input />
                </Form.Item>

                <Form.Item
                  label={
                    <div>
                      Nombres
                      <br />
                      Completos
                    </div>
                  }
                  name="full_name"
                  rules={[
                    {
                      required: true,
                      message: "Campo vacío",
                    },
                  ]}
                  style={{ marginBottom: 0 }}
                >
                  <Input />
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
                  <Input />
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
                  <Input />
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
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  label={
                    <div>
                      Verificación 
                      <br />
                      de contraseña
                    </div>
                  }
                  name="cotraseniaConfirm"
                  rules={[
                    {
                      required: true,
                      message: "Campo vacío",
                    },
                  ]}
                  >
                  <Input.Password />
                </Form.Item>

<div style={{ textAlign: "center"}}>
                  <Button
                    className="Button2"
                    type="submit"
                    shape="round"
                    size="large"
                    style={{
                      backgroundColor: "#1677ff",
                      width: "250px",
                      color: "#fff",
                      margin: "10px"
                    }}
                  >
                    INGRESAR
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

export default Register;
