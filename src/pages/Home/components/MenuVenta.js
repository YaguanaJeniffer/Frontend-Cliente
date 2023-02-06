/**
@file archivo que muestra la barra lateral de navegación y el contenido según la opción seleccionada en el menú.
@author Jeniffeer
*/
import { Layout, Space, Menu } from "antd";
import "../components/MenuVenta.css";
import logo from "../../../assets/images/cliente.png";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { HomeFilled } from "@ant-design/icons";
import React from "react";
import Venta from "./Venta";
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';
import { MdPointOfSale } from "react-icons/md";
import { IoNewspaperSharp } from "react-icons/io5";

  /**
  Almacena el valor del correo electrónico del usuario en localStorage
  @type {string}
  */
const usuario = localStorage.getItem("email");
/**
Desestructuración de las propiedades de Layout de antd
@type {{Header: Header, Footer: Footer, Sider: Sider, Content: Content}}
*/
const { Header, Footer, Sider, Content } = Layout;
/**
Estilos del header
@type {{textAlign: string, color: string, height: number, paddingInline: number, lineHeight: string, backgroundColor: string}}
*/
const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#7dbcea",
};
/**
Estilos del contenido
@type {{textAlign: string, minHeight: number, lineHeight: string, color: string, backgroundColor: string}}
*/
const contentStyle = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#108ee9",
};

/**
Estilos del sider
@type {{textAlign: string, lineHeight: string, color: string, backgroundColor: string}}
*/
const siderStyle = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#3ba0e9",
};

/**

Estilos del footer
@type {{textAlign: string, color: string, backgroundColor: string}}
*/
const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#7dbcea",
};
/**
Clase que contiene la barra lateral de navegación y el contenido según la opción seleccionada en el menú.
*/
class MenuVenta extends React.Component {
  /*
  Estado inicial del componente
  @typedef {Object} state
  @property {Object} selectedItem - Elemento seleccionado del menú
  @property {Object} currentContent - Contenido actual que se mostrará
  */
  state = {
    selectedItem: (
      <p style={{marginBottom:"5px"}}>
        <MdPointOfSale style={{fontSize:"26px"}}/> Venta de Boleto
      </p>
    ),
    currentContent: <Venta location={this.props.location}/>,
  };

  /**
  Función que maneja el evento de clic en el menú
  @param {Object} e - Evento que se desencadena al hacer clic en una opción del menú
  */
  handleMenuClick = (e) => {
    let menu = e.item.props.children[0][1].props.children;

    switch (menu) {
      case " Inicio":
        Modal.confirm({
          title: '¿Seguro que deseas ir al Inicio?. El proceso de la compra se anulara.',
          cancelText: 'Cancelar',
          icon: <ExclamationCircleFilled />,
          okText: 'Continuar',
          
          onOk: () => {
        this.setState({
          selectedItem: e.item.props.children,
          currentContent: this.props.history.push("/home")
        })}
      });
        break;

        case " Comprobantes":
          Modal.confirm({
            title: '¿Seguro que deseas ir a la seccion Comprobantes?. El proceso de la compra se anulara.',
            cancelText: 'Cancelar',
            icon: <ExclamationCircleFilled />,
            okText: 'Continuar',
            
            onOk: () => {
          this.setState({
            selectedItem: e.item.props.children,
            currentContent: this.props.history.push("/comprobante")
          })}
        });
          break;

        case " Cerrar Sesión":
          Modal.confirm({
            title: '¿Seguro que deseas cerrar sesión?. El proceso de la compra se anulara.',
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
          currentContent: <Venta location={this.props.location}/>,
        });
    }
  };


  /**
  @function
  Renderiza la estructura del menú con un sider que contiene información de usuario, un menú con opciones de inicio y comprobantes, y la opción de cerrar sesión.
  El header muestra el elemento seleccionado en el menú.
  El contenido muestra el contenido actual según la selección en el menú.
  El footer muestra una leyenda de copyright.
  @returns {JSX.Element} - Una estructura de menú con sider, header, content y footer.
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
                <div style={{width:"127px", overflow: "hidden", textWrap: "wrap"}}>{usuario}</div>
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
 * Exporta la clase MenuVenta para ser utilizada en otros componentes.
 * @default
 */
export default MenuVenta;
