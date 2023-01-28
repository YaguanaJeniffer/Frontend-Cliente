import React from "react";
import "../components/Principal.css";
import { Input, Button } from "antd";
import { FaBusAlt } from "react-icons/fa";
import CardList from "./componenteCards/FrecuenciasList";

class Principal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  handleSearch = () => {
    const { origen, destino } = this.state;
    console.log(`Origen: ${origen} Destino: ${destino}`);
    // Aquí puedes agregar el código para hacer la búsqueda con los valores de origen y destino
  };

  render() {
    return (
      <div className="Contenedor1">
        <div className="Encabezado">
          <p> Bienvenido a BUS-LINK</p>
        </div>
        <div>
          <div style={{ textAlign: "center", margin: "5px",flexWrap:"wrap" }}>
            <FaBusAlt></FaBusAlt>
            <Input
              placeholder="Ingrese el origen"
              value={this.state.origen}
              onChange={(e) => this.setState({ origen: e.target.value })}
            />
            <Input
              placeholder="Ingrese el destino"
              value={this.state.destino}
              onChange={(e) => this.setState({ destino: e.target.value })}
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
          <CardList></CardList>

        </div>
      </div>
    );
  }
}
export default Principal;