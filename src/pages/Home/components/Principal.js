import React from "react";
import "../components/Principal.css";
import CardList from "./componenteCards/FrecuenciasList";

class Principal extends React.Component {

  render() {
    return (
      <div className="Contenedor1">
        <div className="Encabezado">
          <p> Bienvenido a BUS-LINK</p>
        </div>
        <div >
          <div style={{ textAlign: "center", margin: "5px",flexWrap:"wrap" }}>
          </div>
          <CardList></CardList>

        </div>
      </div>
    );
  }
}
export default Principal;
