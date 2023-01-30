import React from "react";
import "../components/Venta.css";
import {imagen} from "../../../assets/images/imgAlt"
import { Button } from 'antd';
//librerias
import axios from "axios";
//servicio
import { ApiUrl } from "../../../service/ApiRest";

class Venta extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frecuencias: [],
    };
  }

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

  render() {
    const { frecuencias  } = this.state;
    return (
      <div className="Contenedor3">
        <div>
          <p>INFORMACIÓN DEL ITINERARIO</p>
        </div>
        {frecuencias.map((item) => (
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
                   <Button onClick="{handleCancel}">Comprar</Button>
                   <Button onClick="{handleBuy}">Cancelar</Button>
              </div>
              </div>
              </div>
          </div>
        ))}
      </div>
    );
  }
}
export default Venta;
