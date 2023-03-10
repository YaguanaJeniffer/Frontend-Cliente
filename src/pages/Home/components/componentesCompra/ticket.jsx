/**
@file Ticket componente
@author Jeniffer
@summary Este componente muestra los asientos disponibles para la compra en un viaje en bus y permite a un usuario seleccionar y reservar asientos.
@requires React, componenteSit/seat, antd, react-icons/bs, react-router-dom, axios, react-icons/hi2
@requires service/ApiRest
*/

import React from "react";
import Seats from "./componenteSit/seat";
import "./ticket.css";
import { notification } from "antd";
import { BsExclamationOctagonFill } from "react-icons/bs";
import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { HiCheckBadge } from "react-icons/hi2";
import { withRouter } from 'react-router-dom';
//librerias
import axios from 'axios'
import { Button } from "antd";

//servicio
import { ApiUrl } from "../../../../service/ApiRest";


const usuario = localStorage.getItem("email");

/**
@class Ticket
@extends React.Component
@summary Este componente muestra los asientos disponibles para la compra en un viaje en bus y permite a un usuario seleccionar y reservar asientos.
*/
class Ticket extends React.Component {
  /*
@constructor
@param {object} props Propiedades del componente.
@param {array} [asientos=[]] - Arreglo de asientos seleccionados para la compra.
@param {number} [suma=0] - Total de la compra.
@param {string} [cliente_id=""] - Identificación del cliente.
*/
  constructor(props) {
    super(props);
    this.state = {
        asientos:[],
        suma:0,
        cliente_id:"",
    };
  }

  /**
  @function componentDidMount
  @summary Ejecuta una petición GET para obtener el ID del cliente con base en su correo electrónico.
  */
  componentDidMount() {
    let url = ApiUrl + "protected/users/username/"+usuario;
    axios.get(url)
      .then(response => {
            this.setState({ cliente_id: response.data.data.id});
      })
      .catch(error => {
        console.log(error);
    });
  }
  /**
  @function handleSeatsSelection
  @param {array} selected - Arreglo de asientos seleccionados para la compra.
  @summary Actualiza el estado de los asientos seleccionados y llama la función para calcular el total.
  */
  handleSeatsSelection = (selected) => {
    this.setState({ asientos: selected})
    this.calculateTotal(selected);
  };
  /**
  @function calculateTotal
  @param {Array} selected - Array of selected seats
  @returns {void}
  Calculates the total amount to be paid for the selected seats
  */
  calculateTotal = (selected) => {
    const frecuencias = this.props.location.state.frecuencias;
    let total = 0;
    frecuencias.forEach(item => {
      let list = item.bus.seating
      selected.forEach(seat => {
        if(!(selected.length === 0) ){
        let {type} = list.find(i => i.number === seat);
        total+=item.frequency.price
         if(type === 'VIP'){
         total+=item.bus.vipPrice;
        } 
       }else{
        total = 0;
       }
      });
    });
    this.setState({ suma: total });
  };
  /**
  Función para manejar el click en el botón de reservar boletos
  @function
  @returns {undefined} No retorna ningún valor
  */
  handleClickReservar = () => {
    let url = ApiUrl + "protected/tickets";
    let cooperative = "";
    let busNumber ="";
    let departureTime = "";
    let origen = "";
    let destiny = "";

  const frecuencias = this.props.location.state.frecuencias;
    frecuencias.forEach(item => {
      cooperative = item.bus.cooperative.name
      busNumber = item.bus.busNumber
      departureTime = item.departureTime
      origen = item.frequency.origen
      destiny = item.frequency.destiny
    })

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      cooperative: cooperative,
      client_id: this.state.cliente_id,
      busNumber: busNumber,
      price: this.state.suma,
      departureTime: departureTime,
      origen: origen,
      destiny: destiny,
      seatings: this.state.asientos
      }),
    })
      .then((response) => response.json())
      .then((data) => {

        if (data.message === "Compra exitosa") {
          notification.open({
            message: (
              <div  style={{color:"#389e0d"}}>
                <HiCheckBadge style={{fontSize:"25px",marginBottom:"-7px"}}/>
                <span style={{ marginLeft: '10px' }}>Compra realizada de manera exitosa</span>
              </div>
            ),
            duration: 10,
            style: {
            backgroundColor: "#fff",
            },
          });
          this.props.history.push("/home");
        }

        if (data.message === "El o los asientos no estan disponibles") {
          notification.open({
            message: (
              <div style={{color:"red"}}>
                <BsExclamationOctagonFill style={{fontSize:"25px",marginBottom:"-7px"}}/>
                <span style={{ marginLeft: '10px' }}>Es necesario reservar asientos para la compra.</span>
              </div>
            ),
            duration: 10,
            style: {
            backgroundColor: "#fff",
            },
          });
        }
      })
      .catch((error) => {
        console.log(error.message);
        if (error.message === "El o los asientos no estan disponibles") {
          notification.open({
            message: (
              <div style={{color:"red"}}>
                <BsExclamationOctagonFill style={{fontSize:"25px",marginBottom:"-7px"}}/>
                <span style={{ marginLeft: '10px' }}>Es necesario reservar asientos para la compra.</span>
              </div>
            ),
            duration: 10,
            style: {
            backgroundColor: "#fff",
            },
          });
        }
      });
  }
  /**
  Función que maneja el evento de clic en el botón de cancelar.
  Muestra una confirmación para asegurarse de que el usuario desea abandonar el proceso de compra.
  Si confirma, lo redirige a la página principal.
  */
  handleClickCancelar = () => {

    Modal.confirm({
            title: '¿Seguro que deseaa abandonar?. Se perder la informacion.',
            cancelText: 'Cancelar',
            icon: <ExclamationCircleFilled />,
            okText: 'Continuar',
            onOk: () => {
              this.props.history.push("/home");
            },
          });
  }
  /**
  Función que reinicia los valores de los asientos y la suma.
  */
  clearValues = () => {
    this.setState({ suma: 0, asientos:[] });
  };

  /**
  Método que permite renderizar la interfaz gráfica del componente.
  @returns {React.Fragment} - Interfaz gráfica del componente.
  */
  render() {

    const { asientos, suma  } = this.state;
    const frecuencias = this.props.location.state.frecuencias;
    
    return (
      <div className="Contenedor2">
        <div className="Encabezado">
          <p> Boleto</p>
        </div>   
        {frecuencias.map(item => (
          <div style={{marginLeft:"5px",marginRight:"5px",background: "#fff"}}>
            <div>        
              <p>Informacion de su compra</p>
            <div>
              <p>Querido usuario para la compra de su boleto(s) debe tomar en cuenta que al momento de comprar un boleto, es requisito seleccionar un asiento en la parte derecha. Los asientos VIP tendrán un cargo adicional y el valor total se dará a conocer dependiendo de la cantidad de asientos elegidos. </p>
            </div>
            <div>
              <div>
                <p><div style={{width:"10px", background:"#ff4d4f", height:"10px"}}></div>OCUPADO</p>
                <p><div style={{width:"10px", background:"#13c2c2", height:"10px"}}></div>VIP</p>
                <p><div style={{width:"10px", background:"#bae637", height:"10px"}}></div>LIBRE</p>
              </div>
            <div>
              Cantidad de Asientos: <span>{asientos.length === 0 ? 0 : asientos.length}</span>
            </div>
              <div>
                <span>Total:</span><span>{suma.toFixed(2)}<span>  $</span></span>
              </div>
              <div>
              <Button onClick={() => this.handleClickReservar()}>Reservar</Button>
              <Button className="Cancelar" onClick={() => this.handleClickCancelar()}>Cancelar</Button>
              </div>
            </div>
            </div>
            <div key={item.id}>

            <Seats seating={item.bus.seating} onSelectSeats={this.handleSeatsSelection}  handleClear={this.clearValues} ></Seats>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

  /**
  @exports default
  @type {Object}
  @description Se exporta por defecto el componente Ticket, para su uso en otros archivos.
  */
export default withRouter(Ticket);
