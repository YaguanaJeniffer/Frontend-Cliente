/**

@file VentaTicket.js - componente que muestra la página de venta de boletos
@author Jeniffer
@module VentaTicket
@extends React.Component
*/
import { Layout, Space, Menu } from "antd";
import "../../components/MenuVenta.css";
import logo from "../../../../assets/images/cliente.png";
import { HomeFilled } from "@ant-design/icons";
import { RiLogoutBoxRFill } from "react-icons/ri";
import React from "react";
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';
import { MdPointOfSale } from "react-icons/md";
import Ticket from "./ticket";
import { IoNewspaperSharp } from "react-icons/io5";

/**
@constant usuario - obtiene el correo electrónico del usuario almacenado en el localStorage
@type {string}
*/
const usuario = localStorage.getItem("email");
const { Header, Footer, Sider, Content } = Layout;

/**
@constant headerStyle - objeto de estilos para el header del componente
@type {Object}
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
@constant contentStyle - objeto de estilos para el contenido del componente
@type {Object}
*/
const contentStyle = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#108ee9",
};

/**
@constant siderStyle - objeto de estilos para el sider del componente
@type {Object}
*/
const siderStyle = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#3ba0e9",
};

/**
@constant footerStyle - objeto de estilos para el footer del componente
@type {Object}
*/
const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#7dbcea",
};

/**
@class VentaTicket - componente de clase que muestra la página de venta de boletos
@extends React.Component
*/
class VentaTicket extends React.Component {
  /*
@property {Object} state - contiene los valores iniciales para el componente
@property {Object} state.selectedItem - componente seleccionado en el menú
@property {Object} state.currentContent - componente actual mostrado en la pantalla
*/
  state = {
    selectedItem: (
      <p style={{marginBottom:"5px"}}>
        <MdPointOfSale style={{fontSize:"26px"}}/> Venta de Boleto
      </p>
    ),
    currentContent: <Ticket location={this.props.location} history={this.props.history}/>,
  };

  /**
  Funcion que controla las acciones de los diferentes menus de la aplicacion
  @function
  @param {Object} e - Evento generado por el componente menu.
  @returns {void}
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
          currentContent: <Ticket location={this.props.location} history={this.props.history}/>,
        });
    }
  };

  /**
  Funcion que renderiza los componentes de la aplicacion.
  @function
  @returns {JSX.Element} El componente a renderizar.
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

Modulo de exportación de la clase VentaTicket
@module VentaTicket
*/
export default VentaTicket;
