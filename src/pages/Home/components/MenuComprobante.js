/**

@file Archivo que renderiza el menú lateral y la sección principal de la página de Comprobante
@author Jeniffer
*/
import { Layout, Space, Menu } from "antd";
import "../components/Comprobante.css";
import { withRouter } from "react-router-dom";
import logo from "../../../assets/images/cliente.png";
import { HomeFilled } from "@ant-design/icons";
import { RiLogoutBoxRFill } from "react-icons/ri";
import React from "react";
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';
import { MdPointOfSale } from "react-icons/md";
import { IoNewspaperSharp } from "react-icons/io5";
import ComprobanteDetalle from "./Comprobante";
import Comprobante from "./Comprobante";

/**
@constant usuario Almacena el email del usuario actual que se encuentra en el localStorage
*/
const usuario = localStorage.getItem("email");

const { Header, Footer, Sider, Content } = Layout;

/**
@constant headerStyle Estilo para el header del layout
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
@constant contentStyle Estilo para el contenido del layout
*/
const contentStyle = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#108ee9",
};
/**
@constant siderStyle Estilo para el sider del layout
*/
const siderStyle = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#3ba0e9",
};
/**
@constant footerStyle Estilo para el footer del layout
*/
const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#7dbcea",
};

/**

@class
@classdesc Clase que renderiza el menú lateral y la sección principal de la página de Comprobante.
*/
class MenuComprobante extends React.Component {
  /*
@constructor
@property {object} selectedItem Almacena el item seleccionado actualmente en el menú
@property {object} currentContent Almacena el contenido actual que se está mostrando
*/
  state = {
    selectedItem: (
      <p style={{marginBottom:"5px"}}>
        <MdPointOfSale style={{fontSize:"26px"}}/> Venta de Boleto
      </p>
    ),
    currentContent: <ComprobanteDetalle location={this.props.location}  history={this.props.history}/>,
  };

/*
Obtiene el nombre del elemento seleccionado en el menú
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
            this.setState({
                selectedItem: e.item.props.children,
                currentContent: <Comprobante />,
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
          currentContent: <Comprobante location={this.props.location} history={this.props.history}/>,
        });
    }
  };

  /*
  @description Renderiza el componente con una estructura de Layout de Ant Design y contiene un menú lateral y un contenido central.
  @returns {JSX} Elemento JSX que representa el componente.
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
              defaultSelectedKeys={["2"]}
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
            <Content style={{ contentStyle, backgroundColor: "#D4D4D4",height:"auto" }}>
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
 * Exporta la clase MenuComprobante para ser utilizada en otros componentes.
 * @default
 */
export default withRouter(MenuComprobante);
