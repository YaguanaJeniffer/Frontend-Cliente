/**

@file Venta.jsx
@author Jeniffer
@desc Este componente muestra la información de un itinerario seleccionado por el usuario.
*/
import React from "react";
import "../components/Venta.css";
import {imagen} from "../../../assets/images/imgAlt"
import { Button } from 'antd';
//librerias
import axios from "axios";
import { withRouter } from 'react-router-dom';
//servicio
import { ApiUrl } from "../../../service/ApiRest";

/**
@class
@desc Componente que muestra la información de un itinerario seleccionado por el usuario.
*/

class Venta extends React.Component {
  /*
@constructor
@param {Object} props Propiedades que recibe el componente.
*/
  constructor(props) {
    super(props);
    this.state = {
      frecuencias: [],
    };
  }

    /**
  @desc Una vez que el componente se ha montado, hacemos una llamada a la API para obtener la información del itinerario.
  */
  componentDidMount() {
    let url = ApiUrl + "protected/itineraries/find";
    axios
      .post(url)
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          const id = this.props.location.state.id;
          this.setState({
            frecuencias: response.data.data.filter(
              (frecuencia) => frecuencia.id === id
            ),
          });
        } else {
          console.log(response.data.data);
          console.error("No hay frecuencias disponibles");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
  @desc Función que redirige el usuario al componente de compra de ticket.
  @param {Array} frecuencias Arreglo que contiene la información del itinerario seleccionado.
  */

  /**
  @desc Función que redirige el usuario al componente de inicio.
  */
  handleClick(frecuencias) {
    this.props.history.push({
      pathname: "/venta/ticket",
      state: { frecuencias: frecuencias }
    });
  }

  handleClickCancelar() {
    this.props.history.push("/home");
  }

  /**
  Renderiza la página de inicio de sesión
  @return {JSX.Element} Elemento JSX que representa la página de inicio de sesión
  */
  render() {
    const { frecuencias  } = this.state;
    return (
      <div className="Contenedor3">
        <div>
          <p>INFORMACIÓN DEL ITINERARIO</p>
        </div>
        {frecuencias.length === 0 ? 
        <div className="Loading">

        </div> 
        : frecuencias.map((item) => (
          <div>
            <div>
              <img alt="Cooperativa" src={ item.bus.cooperative.image ? `data:image/jpeg;base64,${item.bus.cooperative.image}` : `data:image/jpeg;base64,${imagen}` } style={{height:"140px",width:"150px"}}/>
            </div>
            <div>
              <p style={{fontWeight:"bold",fontSize:"20px",marginBottom:"5px",color:"#000080",textAlign:"center",marginTop:"12px"}}>{item.bus.cooperative.name}</p>
              <div>
              <div>
                <p style={{textAlign:"left",margin:"1px"}}><span style={{fontWeight:"bold",color:"#000080"}}>N° de Bus:</span><span style={{marginLeft:'10px'}}>{item.bus.busNumber}</span></p>
                <p style={{textAlign:"left",margin:"1px"}}><span style={{fontWeight:"bold",color:"#000080"}}>Origen:</span><span style={{marginLeft:'10px'}}>{item.frequency.origen}</span></p>
                <p style={{textAlign:"left",margin:"1px"}}><span style={{fontWeight:"bold",color:"#000080"}}>Destino:</span><span style={{marginLeft:'6px'}}>{item.frequency.destiny}</span></p>
                <p style={{textAlign:"left",margin:"1px"}}><span style={{fontWeight:"bold",color:"#000080"}}>Tipo:</span><span style={{marginLeft:'26px'}}>{item.frequency.type}</span></p>
                <p style={{textAlign:"left",margin:"1px"}}><span style={{fontWeight:"bold",color:"#000080"}}>Precio:</span><span style={{marginLeft:'14px'}}>{item.frequency.price}</span><span>$</span></p>
                <p style={{textAlign:"left",margin:"1px"}}><span style={{fontWeight:"bold",color:"#000080"}}>Tiempo:</span><span style={{marginLeft:'6px'}}>{item.frequency.hours}</span><span style={{marginRight:"2px"}}>h</span><span>{item.frequency.minutes}</span><span style={{marginLeft:"1px"}}>min</span></p>
                <p style={{textAlign:"left",margin:"1px"}}><span style={{fontWeight:"bold",color:"#000080"}}>Hora de Salida:</span><span style={{marginLeft:'6px'}}>{item.departureTime}</span></p>
                <p style={{textAlign:"left",margin:"1px"}}><span style={{fontWeight:"bold",color:"#000080"}}>Paradas:</span><span style={{marginLeft:'3px'}}> {item.frequency.stops.length === 0 ? <span>No hay paradas.</span> : item.frequency.stops.map(stop => (<span>{stop} </span>))}  </span></p>
                <p style={{textAlign:"left",margin:"1px"}}><span style={{fontWeight:"bold",color:"#000080"}}>Marca:</span><span style={{marginLeft:'20px'}}>{item.bus.brand}</span></p>
                <p style={{textAlign:"left",margin:"1px"}}><span style={{fontWeight:"bold",color:"#000080"}}>Modelo:</span><span style={{marginLeft:'10px'}}>{item.bus.model}</span></p>
                <p style={{textAlign:"left",margin:"1px"}}><span style={{fontWeight:"bold",color:"#000080"}}>Placa:</span><span style={{marginLeft:'26px'}}>{item.bus.plate}</span></p>
                <p style={{textAlign:"left",margin:"1px"}}><span style={{fontWeight:"bold",color:"#000080"}}>Chassis:</span><span style={{marginLeft:'14px'}}>{item.bus.chassis}</span></p>
              </div>
              <div>
                   <Button onClick={() => this.handleClick(this.state.frecuencias)}>Comprar</Button>
                   <Button onClick={() => this.handleClickCancelar()}>Regresar</Button>
              </div>
              </div>
              </div>
          </div>
        ))}
      </div>
    );
  }
}
/**
 * Exporta la clase Venta para ser utilizada en otros componentes.
 * @default
 */
export default withRouter(Venta);