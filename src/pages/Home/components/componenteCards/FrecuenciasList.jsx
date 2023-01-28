import React from "react";
import { Card } from 'antd'
import "../componenteCards/FrecuenciasList.css";
import { Pagination } from 'antd';
//librerias
import axios from 'axios'
//servicio
import { ApiUrl } from "../../../../service/ApiRest";

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
        let url = ApiUrl + "protected/frequencies";
        axios.get(url)
          .then(response => {
            if(Array.isArray(response.data.data)){
                this.setState({ frecuencias: response.data.data })
            } else {
                console.log(response.data.data);
                console.error("No hay frecuencias disponibles");
            }
          })
      }

      handleChange = (page, pageSize) => {
        this.setState({ currentPage: page, itemsPerPage: 4 });
      }

    render() {

    const { frecuencias, currentPage, itemsPerPage } = this.state;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = frecuencias.slice(indexOfFirstItem, indexOfLastItem);

        return (
            
        <div style={{marginTop:"40px"}}>
        <div >
            {currentItems.map(frecuencia => (
              <Card
              cover={
                <img alt="example" src="http://www.ecuabus.net/Santa2.jpg" />
              }
              style={{ width: 170, background: "4169E1" }}
            >
              <div>
                <p style={{textAlign:"left"}}><span style={{fontWeight:"bold"}}>Origen:</span><span style={{marginLeft:'10px'}}>{frecuencia.origen}</span></p>
                <p style={{textAlign:"left"}}><span style={{fontWeight:"bold"}}>Destino:</span><span style={{marginLeft:'5px'}}>{frecuencia.destiny}</span></p>
                <p style={{textAlign:"left"}}><span style={{fontWeight:"bold"}}>Tipo:</span><span style={{marginLeft:'24px'}}>{frecuencia.type}</span></p>
                <p style={{textAlign:"left"}}><span style={{fontWeight:"bold"}}>Precio:</span><span style={{marginLeft:'14px'}}>{frecuencia.price}</span><span>$</span></p>
                <p style={{textAlign:"left"}}><span style={{fontWeight:"bold"}}>Tiempo:</span><span style={{marginLeft:'6px'}}>{frecuencia.hours}</span><span style={{marginRight:"2px"}}>h</span><span>{frecuencia.minutes}</span><span style={{marginLeft:"1px"}}>min</span></p>
                <p style={{textAlign:"left"}}><span style={{fontWeight:"bold"}}>Paradas:</span><span style={{marginLeft:'4px'}}> {frecuencia.stops.length === 0 ? <span style={{fontSize:"10.5px"}}>No hay paradas.</span> : frecuencia.stops.map(stop => (<span style={{fontSize:"10.5px"}}>{stop} </span>))}  </span></p>
              </div>
              
            </Card>
            ))}

          </div>
        <div style={{textAlign: "center"}}>
          <Pagination defaultCurrent={1} total={frecuencias.length} showSizeChanger onChange={this.handleChange} onShowSizeChange={this.handleChange} pageSize={4}/>
        </div>
          </div>
        )
    }
}

export default CardList;