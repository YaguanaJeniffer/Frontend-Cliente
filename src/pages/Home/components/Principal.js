import React from "react";
import "../components/Principal.css";
import CardList from "./componenteCards/FrecuenciasList";

/**
 * Componente de clase Principal que representa la pantalla principal de la aplicación.
 * @class
 * @extends React.Component
 */

class Principal extends React.Component {

/**
   * Método que se encarga de renderizar el componente.
   * @returns {JSX.Element} Elemento de JSX que representa el componente.
   */

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
/**
 * Exporta la clase Principal para ser utilizada en otros componentes.
 * @default
 */
export default Principal;
