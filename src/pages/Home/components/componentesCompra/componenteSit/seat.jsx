import React, { Component } from "react";
import "./seat.css";
import { Button } from "antd";
class Seat extends Component {
  handleClick = () => {
    this.props.onSelect(this.props.seat);
  };

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

class Seats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: [],
    };
  }

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

  handleClear = () => {
    this.setState({ selected: [] });
  };

  handleSelectSeats = (selected) => {
    this.props.onSelectSeats(selected);
  };

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

export default Seats;
