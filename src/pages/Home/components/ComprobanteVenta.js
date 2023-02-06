import React  from 'react';
import PagoList from './componenteCards/PagoCard';

/**
Clase que muestra los comprobantes de compra en una lista
@class
*/
class Comprobantes extends React.Component {

/**
Renderiza la lista de comprobantes de compra
@returns {JSX.Element} El componente con la lista de comprobantes
*/
    render() {
        return (
          <div className="Contenedor1">
            <div className="Encabezado">
              <p> Comprobantes de su compra</p>
            </div>
            <div >
              <div style={{ textAlign: "center", margin: "5px",flexWrap:"wrap" }}>
                <PagoList></PagoList>
              </div>
            </div>
          </div>
        );
      }
    }
  /**
   * Exporta la clase Comprobantes para ser utilizada en otros componentes.
   * @default
   */
export default Comprobantes;
