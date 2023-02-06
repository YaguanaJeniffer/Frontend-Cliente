/**
 * @file Home.js
 * @author [Jeniffer]
 * @description Componente principal para la página de inicio.
 */

import { Layout, Space, Menu } from "antd";
import "../Home/home.css";
import logo from "../../assets/images/cliente.png";
import { HomeFilled } from "@ant-design/icons";
import { RiLogoutBoxRFill } from "react-icons/ri";
import React from "react";
import Principal from "./components/Principal";

import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';
import Comprobantes from "./components/ComprobanteVenta";
import { IoNewspaperSharp } from "react-icons/io5";

const usuario = localStorage.getItem("email");
const { Header, Footer, Sider, Content } = Layout;
const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#7dbcea",
};
const contentStyle = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#108ee9",
};
const siderStyle = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#3ba0e9",
};
const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#7dbcea",
};

/**
 * @class Home
 * @extends React.Component
 * @description Clase principal para el componente de página de inicio.
 */

class Home extends React.Component {
  
    /**
   * @constructor
   * @description Constructor del componente Home.
   */
  state = {
      /**
       * @property {Object} selectedItem - Contiene el elemento seleccionado en el menú.
       * @property {Object} currentContent - Contiene el contenido actual a mostrar en la página.
       */
    selectedItem: (
      <p>
        <HomeFilled /> Inicio
      </p>
    ),
    currentContent: <Principal />,
  };

    /**
   * @function handleMenuClick
   * @param {Object} e - Evento de clic en el menú.
   * @description Manejador de evento para el clic en el menú. Actualiza el contenido actual en función del elemento seleccionado.
   */

  handleMenuClick = (e) => {
    let menu = e.item.props.children[0][1].props.children;

    switch (menu) {
      case " Inicio":
        this.setState({
          selectedItem: e.item.props.children,
          currentContent: <Principal />,
        });
        break;

      case " Comprobantes":
        this.setState({
          selectedItem: e.item.props.children,
          currentContent: <Comprobantes />,
        });
        break;
      

        case " Cerrar Sesión":
          Modal.confirm({
            title: '¿Seguro que deseas cerrar sesión?',
            cancelText: 'Cancelar',
            icon: <ExclamationCircleFilled />,
            okText: 'Continuar',
            
            onOk: () => {
              this.setState({ selectedItem: e.item.props.children });
              localStorage.removeItem("token");
              localStorage.removeItem("correo electrónico");
              this.props.history.push("/");
            },
          });
          break;

      default:
        this.setState({
          selectedItem: e.item.props.children,
          currentContent: <Principal />,
        });
    }
  };

/**
   * Render the component
   * @returns {JSX.Element}
   */
  render() {
    return (
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
        size={[0, 48]}
      >
        <Layout>
          <Sider
            style={{ siderStyle, backgroundColor: "#000080", height: "100vh" }}
          >
            <div id="user-info">
              <img src={logo} id="user-image" alt="sinloog" style={{marginLeft:"3px"}}/>
              <span id="user-name" style={{ fontWeight: "650",fontSize:"11.7px",marginLeft:"-5px" }}>
                <div style={{width:"127px", overflow: "hidden", textWrap: "wrap"}}>{usuario ? usuario : "Usuario"}</div>
              </span>
            </div>
            <hr style={{ width: "185px", color: "#ffff" }} />

            <Menu
              style={{
                backgroundColor: "#4169E1",
                fontWeight: "800",
                color: "#ffff",
              }}
              mode="inline"
              onClick={this.handleMenuClick}
              defaultSelectedKeys={["1"]}
              items={[
                {
                  key: "1",
                  icon: <HomeFilled />,
                  label: " Inicio",
                },
                {
                  key: "2",
                  icon: <IoNewspaperSharp />,
                  label: " Comprobantes",
                },
              ]}
            />
            <div style={{ marginTop: "428px" }}>
              <hr
                style={{ width: "185px", marginBottom: "15px", color: "#ffff" }}
              />
              <Menu
                style={{
                  backgroundColor: "#4169E1",
                  fontWeight: "800",
                  color: "#ffff",
                }}
                mode="inline"
                onClick={this.handleMenuClick}
                items={[
                  {
                    key: "3",
                    icon: <RiLogoutBoxRFill />,
                    label: " Cerrar Sesión",
                  },
                ]}
              />
            </div>
          </Sider>
          <Layout>
            <Header
              style={{ headerStyle, background: "#000080", color: "#ffff" }}
            >
              {this.state.selectedItem}
            </Header>
            <Content style={{ contentStyle, backgroundColor: "#D4D4D4" }}>
              {this.state.currentContent}
            </Content>
            <Footer style={{ footerStyle, backgroundColor: "#000080" }}>
              <p className="copyright"> &copy; 2023 CDG SOLUTIONS </p>
            </Footer>
          </Layout>
        </Layout>
      </Space>
    );
  }
}

/**
 * Exporta la clase Home para ser utilizada en otros componentes.
 * @default
 */
export default Home;
