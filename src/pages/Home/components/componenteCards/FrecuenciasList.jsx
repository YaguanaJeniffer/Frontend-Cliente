import React from "react";
import { Card } from 'antd'
import "../componenteCards/FrecuenciasList.css";
import { Pagination } from 'antd';
import { Link } from 'react-router-dom'
import { notification } from "antd";
import { MdBusAlert } from "react-icons/md";
import {imagen} from "../../../../assets/images/imgAlt"
import { FaBusAlt } from "react-icons/fa";
import { Input, Button } from "antd";
//librerias
import axios from 'axios'
//servicio
import { ApiUrl } from "../../../../service/ApiRest";

  /**
  Clase que renderiza los elementos visuales de las frecuencias
  @class
  */
class CardList extends React.Component {
  /*
  Constructor de la clase
  @constructor
  @param {Object} props - Propiedades iniciales del componente.
  */
    constructor(props) {
        super(props);
    /*
    State de la clase
    @type {Object}
    @property {Array} frecuencias - Arreglo con las frecuencias.
    @property {Number} currentPage - Número de página actual.
    @property {Number} itemsPerPage - Número de elementos por página.
    @property {String} origen - Ubicación de origen de la frecuencia.
    @property {String} destiny - Ubicación de destino de la frecuencia.
    */
        this.state = {
            frecuencias: [],
            currentPage: 1,
            itemsPerPage: 4,
            origen: '',
            destiny: ''
        };
    }

  /**
  Método que se ejecuta después de que el componente ha sido montado.
  Obtiene los datos de las frecuencias a partir de una llamada a la API.
  @function
  */
    componentDidMount() {
        let url = ApiUrl + "protected/itineraries/find";
        axios.post(url)
          .then(response => {
            if(Array.isArray(response.data.data)){
                this.setState({ frecuencias: response.data.data});
                
            } else {
                console.log(response.data.data);
                console.error("No hay frecuencias disponibles");
            }
          })
          .catch(error => {
            console.log(error);
        });
      }
  /**
  Método que maneja el cambio de página
  @function
  @param {Number} page - Número de página a la que se desea cambiar.
  */
    handleChange = (page) => {
      this.setState({ currentPage: page, itemsPerPage: 4 });
    }
  /**
  * Método que maneja la búsqueda de frecuencias
  * @function
  */
    handleSearch = () => {
      let { origen, destiny, frecuencias } = this.state;

      if(origen===""&& destiny===""){
        let url = ApiUrl + "protected/itineraries/find";
        axios.post(url)
          .then(response => {
            if(Array.isArray(response.data.data)){
                this.setState({ frecuencias: response.data.data});
                
            } else {
                console.log(response.data.data);
                console.error("No hay frecuencias disponibles");
            }
          })
          .catch(error => {
            console.log(error);
        });

      }else if(!(origen ==="")&&(destiny==="")){
      let filteredFrequencies = frecuencias.filter(frecuencia => frecuencia.frequency.origen === origen);
      this.setState({ frecuencias: filteredFrequencies });
      if(frecuencias.length===0){
        notification.open({
          message: (
            <div style={{color:"#fa541c"}}>
              <MdBusAlert style={{fontSize:"25px",marginBottom:"-7px"}}/>
              <span style={{ marginLeft: '10px' }}>No hay viajes disponibles con lo buscado.</span>
            </div>
          ),
          duration: 20,
          style: {
          backgroundColor: "#fff",
          },
        });
        this.componentDidMount();
      }

      }else if((origen ==="")&&!(destiny==="")){
      let filteredFrequencies = frecuencias.filter(frecuencia => frecuencia.frequency.destiny === destiny);
      this.setState({ frecuencias: filteredFrequencies });
      if(frecuencias.length===0){
        notification.open({
          message: (
            <div style={{color:"#fa541c"}}>
              <MdBusAlert style={{fontSize:"25px",marginBottom:"-7px"}}/>
              <span style={{ marginLeft: '10px' }}>No hay viajes disponibles con lo buscado.</span>
            </div>
          ),
          duration: 20,
          style: {
          backgroundColor: "#fff",
          },
        });
        this.componentDidMount();
      }

      }else if(!(origen ==="")&&!(destiny==="")){
      let filteredFrequencies = frecuencias.filter(frecuencia => frecuencia.frequency.origen === origen && frecuencia.frequency.destiny === destiny);
      this.setState({ frecuencias: filteredFrequencies });
      if(frecuencias.length===0){
        notification.open({
          message: (
            <div style={{color:"#fa541c"}}>
              <MdBusAlert style={{fontSize:"25px",marginBottom:"-7px"}}/>
              <span style={{ marginLeft: '10px' }}>No hay viajes disponibles con lo buscado.</span>
            </div>
          ),
          duration: 20,
          style: {
          backgroundColor: "#fff",
          },
        });
        this.componentDidMount();
      }
      }
    }
  /**
  Función encargada de renderizar la vista de la aplicación
  @function
  @returns {JSX} Regresa el componente de la vista
  */
    render() {

    // Destructuración del estado de la clase
    const { frecuencias, currentPage, itemsPerPage, origen, destiny} = this.state;
    // Cálculo del índice del último elemento
    const indexOfLastItem = currentPage * itemsPerPage;
    // Cálculo del índice del primer elemento
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // Selección de los elementos actuales
    const currentItems = frecuencias.slice(indexOfFirstItem, indexOfLastItem);
    
    // Regresa el componente de la vista
        return (
            
        <div style={{marginTop:"18px",background:"#fff"}}>
        <div>
        <FaBusAlt></FaBusAlt>
        
            <Input
              placeholder="Ingrese el origen"
              type="text"
              value={origen}
              onChange={(e) => {
                const re = /^[a-zA-Z\s]+$/;
                if (e.target.value === '' || re.test(e.target.value)) {
                  this.setState({
                    origen: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).toLowerCase()
                  });
                }
              }}
            />
            <Input
              placeholder="Ingrese el destino"
              type="text"
              value={destiny}
              onChange={(e) => {
                const re = /^[a-zA-Z\s]+$/;
                if (e.target.value === '' || re.test(e.target.value)) {
                  this.setState({
                    destiny: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).toLowerCase()
                  });
                }
              }}
            />
            <Button
              type="primary"
              onClick={this.handleSearch}
              style={{
                borderRadius: "20px",
                marginLeft: "5px",
                width: "150px",
              }}
            >
              Buscar
            </Button>
        </div>
        <div style={{ textAlign: "center", margin: "5px",flexWrap:"wrap",marginTop:"15px" }}>
            
        {currentItems.map(item =>
        <Link to={{
          pathname: "/venta",
          state: { id: item.id }
        }}>
              <Card
              cover={
                <img alt="Cooperativa" src={ item.bus.cooperative.image ? `data:image/jpeg;base64,${item.bus.cooperative.image}` : `data:image/jpeg;base64,${imagen}` } style={{height:"115px"}}/>
              }
              style={{ width: 217, background: "4169E1" }}
              >
              <div>
                <p style={{fontWeight:"bold",fontSize:"15px",marginBottom:"5px"}}>{item.bus.cooperative.name}</p>
                <p style={{textAlign:"left"}}><span style={{fontWeight:"bold"}}>Origen:</span><span style={{marginLeft:'10px'}}>{item.frequency.origen}</span></p>
                <p style={{textAlign:"left"}}><span style={{fontWeight:"bold"}}>Destino:</span><span style={{marginLeft:'5px'}}>{item.frequency.destiny}</span></p>
                <p style={{textAlign:"left"}}><span style={{fontWeight:"bold"}}>Tipo:</span><span style={{marginLeft:'24px'}}>{item.frequency.type}</span></p>
                <p style={{textAlign:"left"}}><span style={{fontWeight:"bold"}}>Precio:</span><span style={{marginLeft:'14px'}}>{item.frequency.price}</span><span>$</span></p>
                <p style={{textAlign:"left"}}><span style={{fontWeight:"bold"}}>Tiempo:</span><span style={{marginLeft:'6px'}}>{item.frequency.hours}</span><span style={{marginRight:"2px"}}>h</span><span>{item.frequency.minutes}</span><span style={{marginLeft:"1px"}}>min</span></p>
                <p style={{textAlign:"left"}}><span style={{fontWeight:"bold"}}>Hora de Salida:</span><span style={{marginLeft:'5px'}}>{item.departureTime}</span></p>
                <p style={{textAlign:"left"}}><span style={{fontWeight:"bold"}}>Paradas:</span><span style={{marginLeft:'4px'}}> {item.frequency.stops.length === 0 ? <span style={{fontSize:"10.5px"}}>No hay paradas.</span> : item.frequency.stops.map(stop => (<span style={{fontSize:"10.5px"}}>{stop} </span>))}  </span></p>
              </div>
             
            </Card>
          </Link>
            )}

          </div>
        <div style={{textAlign: "center"}}>
          <Pagination defaultCurrent={1} total={frecuencias.length} showSizeChanger onChange={this.handleChange} onShowSizeChange={this.handleChange} pageSize={4}/>
        </div>
          </div>
        )
    }
}
/**
 * Exporta la clase CardList para ser utilizada en otros componentes.
 * @default
 */
export default CardList;