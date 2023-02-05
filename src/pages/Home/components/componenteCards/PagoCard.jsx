import React from "react";
import "../componenteCards/PagoCards.css";
import { Card } from "antd";
import {imagenComprobante} from "../../../../assets/images/imgComprobante"
//librerias
import axios from "axios";

//servicio
import { ApiUrl } from "../../../../service/ApiRest";
import { Link } from "react-router-dom";
import { Pagination } from 'antd';

const usuario = localStorage.getItem("email");

class PagoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cliente_id: "",
      tickets: [],
      currentPage: 1,
      itemsPerPage: 4,
    };
  }

  obtenerCliente() {
    let url = ApiUrl + "protected/users/username/" + usuario;
    axios
      .get(url)
      .then((response) => {
        this.setState({ cliente_id: response.data.data.id }, () => {
          let url1 =
            ApiUrl + "protected/tickets/client/" + this.state.cliente_id;
            console.log(url1);
          axios.get(url1).then((response) => {
            this.setState({ tickets: response.data.data });
            console.log(this.state.tickets);
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.obtenerCliente();
  }

  handleChange = (page) => {
    this.setState({ currentPage: page, itemsPerPage: 4 });
  }
  render() {

    const { tickets, currentPage, itemsPerPage,} = this.state;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = tickets.slice(indexOfFirstItem, indexOfLastItem);

    return (
      <div style={{ marginTop: "18px", background: "#fff" }}>
        <div
          style={{
            textAlign: "center",
            margin: "5px",
            flexWrap: "wrap",
            marginTop: "15px",
          }}
        >
           {currentItems.map(item =>
        <Link to={{
          pathname: "/comprobante",
          state: { ticket: item }
        }}>
              <Card
              cover={
                <img alt="Comprobante" src={ item.qr ? `data:image/jpeg;base64,${item.qr}` : `data:image/jpeg;base64,${imagenComprobante}` } style={{height:"118px"}}/>
              }
              style={{ width: 217, background: "4169E1" }}
              >
              <div>
                <p style={{fontWeight:"bold",fontSize:"15px",marginBottom:"5px"}}>{item.cooperative}</p>
                <p style={{textAlign:"left"}}><span style={{fontWeight:"bold"}}>Origen:</span><span style={{marginLeft:'10px'}}>{item.origen}</span></p>
                <p style={{textAlign:"left"}}><span style={{fontWeight:"bold"}}>Destino:</span><span style={{marginLeft:'5px'}}>{item.destiny}</span></p>
                <p style={{textAlign:"left"}}><span style={{fontWeight:"bold"}}>Asientos:</span><span style={{marginLeft:'5px'}}>{item.seatings.length}</span></p>
                <p style={{textAlign:"left"}}><span style={{fontWeight:"bold"}}>Precio:</span><span style={{marginLeft:'14px'}}>{item.price}</span><span>$</span></p>
                <p style={{textAlign:"left"}}><span style={{fontWeight:"bold"}}>Hora de Salida:</span><span style={{marginLeft:'5px'}}>{item.departureTime}</span></p>
                 </div>           
            </Card>
          </Link>
            )}

        </div>
        <div style={{textAlign: "center"}}>
          <Pagination defaultCurrent={1} total={tickets.length} showSizeChanger onChange={this.handleChange} onShowSizeChange={this.handleChange} pageSize={4}/>
        </div>
      </div>
    );
  }
}

export default PagoList;
