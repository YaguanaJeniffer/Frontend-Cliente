import React from "react";
import { Card } from 'antd'
import "../componenteCards/FrecuenciasList.css";
import { Pagination } from 'antd';
import { Link } from 'react-router-dom'
//librerias
import axios from 'axios'
//servicio
import { ApiUrl } from "../../../../service/ApiRest";
import {imagen} from "../../../../assets/images/imgAlt"

class CardList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            frecuencias: [],
            currentPage: 1,
            itemsPerPage: 4
        };
    }

    componentDidMount() {
        let url = ApiUrl + "protected/itineraries";
        axios.get(url)
          .then(response => {
            if(Array.isArray(response.data.data)){
               /*  this.setState({ frecuencias: response.data.data.map(item => item.frequency)}) */
                this.setState({ frecuencias: response.data.data});
                /* this.setState({ cooperativa: response.data.data.map(item => item.bus).map(coop => coop.cooperative)}); */

                
            } else {
                console.log(response.data.data);
                console.error("No hay frecuencias disponibles");
            }
          })
          .catch(error => {
            console.log(error);
        });
      }

      handleChange = (page) => {
        this.setState({ currentPage: page, itemsPerPage: 4 });
      }

    render() {

    
    const { frecuencias, currentPage, itemsPerPage} = this.state;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = frecuencias.slice(indexOfFirstItem, indexOfLastItem);

    
        return (
            
        <div style={{marginTop:"15px"}}>
        <div >
       
       
        {currentItems.map(item =>

          <Link to='venta/'>
              <Card
              cover={
                <img alt="Cooperativa" src={ item.bus.cooperative.image ? `data:image/jpeg;base64,${item.bus.cooperative.image}` : `data:image/jpeg;base64,${imagen}` }/>
              }
              style={{ width: 195, background: "4169E1" }}
              >
              <div>
                <p style={{fontWeight:"bold",fontSize:"15px"}}>{item.bus.cooperative.name}</p>
                <p style={{textAlign:"left"}}><span style={{fontWeight:"bold"}}>Origen:</span><span style={{marginLeft:'10px'}}>{item.frequency.origen}</span></p>
                <p style={{textAlign:"left"}}><span style={{fontWeight:"bold"}}>Destino:</span><span style={{marginLeft:'5px'}}>{item.frequency.destiny}</span></p>
                <p style={{textAlign:"left"}}><span style={{fontWeight:"bold"}}>Tipo:</span><span style={{marginLeft:'24px'}}>{item.frequency.type}</span></p>
                <p style={{textAlign:"left"}}><span style={{fontWeight:"bold"}}>Precio:</span><span style={{marginLeft:'14px'}}>{item.frequency.price}</span><span>$</span></p>
                <p style={{textAlign:"left"}}><span style={{fontWeight:"bold"}}>Tiempo:</span><span style={{marginLeft:'6px'}}>{item.frequency.hours}</span><span style={{marginRight:"2px"}}>h</span><span>{item.frequency.minutes}</span><span style={{marginLeft:"1px"}}>min</span></p>
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

export default CardList;