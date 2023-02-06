import React, { Component } from "react";
import "./seat.css";
import { Button } from "antd";

/**
Clase Seat que representa un asiento en el componente Seats
@class Seat
@extends {Component}
*/
class Seat extends Component {
  /*
  Método que se ejecuta al hacer clic en un asiento
  @memberof Seat
  */
  handleClick = () => {
    this.props.onSelect(this.props.seat);
  };
  /**
  Método que renderiza el componente
  @memberof Seat
  */
  render() {
    const { number, type, status } = this.props.seat;
    return (
      <div
        style={
          status === "OCUPADO"
            ? { backgroundColor: "#ff4d4f" }
            : type === "VIP"
            ? { backgroundColor: "#13c2c2" }
            : { backgroundColor: "#bae637" }
        }
        onClick={this.handleClick}
      >
        {number}
      </div>
    );
  }
}
/**
Clase Seats que representa los asientos en un autobús
@class Seats
@extends {Component}
*/
class Seats extends Component {
/*
Crea una instancia de Seats.
@param {Object} props
@memberof Seats
*/
  constructor(props) {
  /**
  Estado inicial del componente
  @type {Object}
  @property {Array} selected - Lista de asientos seleccionados
  */
    super(props);
    this.state = {
      selected: [],
    };
  }
  /**
  Método que se ejecuta al seleccionar un asiento
  @param {Object} seat
  @memberof Seats
  */
  handleSelect = (seat) => {
    if (
      seat.status === "OCUPADO" ||
      this.state.selected.includes(seat.number)
    ) {
      return;
    }

    this.setState(
      (prevState) => ({
        selected: [...prevState.selected, seat.number],
      }),
      () => {
        this.handleSelectSeats(this.state.selected);
      }
    );
  };
  /**
  Método que se ejecuta al limpiar la selección de asientos
  @memberof Seats
  */
  handleClear = () => {
    this.setState({ selected: [] });
  };
  /**
  Método que se ejecuta al seleccionar asientos
  @param {Array} selected
  @memberof Seats
  */
  handleSelectSeats = (selected) => {
    this.props.onSelectSeats(selected);
  };

  /**
  Método que renderiza el componente
  @memberof Seats
  */
  render() {
    const frecuencias = this.props.seating;
    const { selected } = this.state;

    return (
      <div>
        <div className="bus-container">
          <div className="seats-container">
            {frecuencias.map((item) => (
              <Seat
                key={item.number}
                seat={item}
                onSelect={this.handleSelect}
              />
            ))}
          </div>
        </div>
        <div style={{ wordWrap: "break-word", width: "130px" }}>
          <p>Asientos elegidos:</p>
          <div>{selected.join(",")}</div>
        </div>
        <div>
          <Button
            onClick={() => {
              this.props.handleClear();
              this.handleClear();
            }}
          >
            Limpiar
          </Button>
        </div>
      </div>
    );
  }
}
/**
 * Exporta la clase Seats para ser utilizada en otros componentes.
 * @default
 */
export default Seats;
