import React from "react";

import "../componenteCards/FrecuenciasList.css";

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
        let url = ApiUrl + "protected/itineraries";
        axios.get(url)
          .then(response => {
            if(Array.isArray(response.data.data)){
                /* this.setState({ frecuencias: response.data.data.map(item => item.frequency)}) */
                this.setState({ frecuencias: response.data.data})
                /* this.setState({ cooperativa: response.data.data.map(item => item.bus).map(coop => coop.cooperative).map(name => name.name)}) */
               /*  console.log(response.data.data.map(item => item.bus).map(coop => coop.cooperative)); */
                console.log(response.data.data);
            } else {
                console.log(response.data.data);
                console.error("No hay frecuencias disponibles");
            }
          })
      }

      handleChange = (page) => {
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
            {currentItems.map(item => (item.frequency)).map(frecuencia =>
                <div>
                <p>{frecuencia.origen}</p>
                </div>
                )    
            }
            <p>holi</p>
          </div>
       
          </div>
        )
    }
}

export default CardList;