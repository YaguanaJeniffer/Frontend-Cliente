import React  from 'react';
import PagoList from './componenteCards/PagoCard';

class Comprobantes extends React.Component {


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
export default Comprobantes;
