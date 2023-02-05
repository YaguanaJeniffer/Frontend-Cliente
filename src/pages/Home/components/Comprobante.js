import React from "react";
import "../components/Venta.css";
import { Form, Button } from "antd";
import { withRouter } from "react-router-dom";
import { notification } from "antd";
import { HiCheckBadge } from "react-icons/hi2";
import { BsExclamationOctagonFill } from "react-icons/bs";
//librerias
import axios from "axios";
//servicio
import { ApiUrl } from "../../../service/ApiRest";

const imagenDefault =
  "https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-4.jpg";

class ComprobanteDetalle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: [],
      previewImage: imagenDefault,
    };
  }

  componentDidMount() {
    if (this.props.location && this.props.location.state) {
      const ticket = this.props.location.state.ticket;
      this.setState({ tickets: ticket });
    }
  }

  handleChange = (event) => {
    this.setState({
      file: event.target.files[0],
    });
    let previewImage = URL.createObjectURL(event.target.files[0]);
    this.setState({
      previewImage,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    const ticket = this.props.location.state.ticket;
    formData.append("receipt", this.state.file);
    formData.append("id", ticket.id);

    let url = ApiUrl + "protected/tickets";
    axios
      .put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        notification.open({
          message: (
            <div style={{ color: "#389e0d" }}>
              <HiCheckBadge
                style={{ fontSize: "25px", marginBottom: "-7px" }}
              />
              <span style={{ marginLeft: "10px" }}>
                Se ah envido de manera exitosa el comprobante. En espera a que
                sea verificado su recibo{" "}
              </span>
            </div>
          ),
          duration: 10,
          style: {
            backgroundColor: "#fff",
          },
        });
        this.props.history.push("/home");
      })
      .catch((error) => {
        notification.open({
          message: (
            <div style={{ color: "red" }}>
              <BsExclamationOctagonFill
                style={{ fontSize: "25px", marginBottom: "-7px" }}
              />
              <span style={{ marginLeft: "10px" }}>
                Error al subir el comprobante
              </span>
            </div>
          ),
          duration: 10,
          style: {
            backgroundColor: "#fff",
          },
        });
      });
  };

  render() {
    const { tickets } = this.state;
    const { previewImage } = this.state;

    return (
      <div className="Contenedor5">
        <div>
          <p>INFORMACIÓN DE COMPRA</p>
        </div>

        {tickets.length === 0 ? (
          <div className="Loading"></div>
        ) : (
          <div>
            {tickets.qr ? (
              <div>
                <img src={`data:image/jpeg;base64,${tickets.qr}`} alt="Comprobante" />
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>
                  <p>
                    Por favor, querido usuario subir el comprobante de pago. Una
                    vez verificado su pago se generara su código.
                  </p>
                </div>

                <div>
                  <form onSubmit={this.handleSubmit}>
                    {previewImage && (
                      <img
                        src={previewImage}
                        alt="Preview"
                        style={{
                          maxHeight: "140px",
                          maxWidth: "150px",
                          height: "140px",
                          width: "150px",
                        }}
                      />
                    )}
                    <Form.Item label="Seleccionar imagen">
                      <input
                        type="file"
                        onChange={this.handleChange}
                        name="receipt"
                      />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                      Enviar
                    </Button>
                  </form>
                </div>
              </div>
            )}
            <div>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  marginBottom: "5px",
                  color: "#000080",
                  textAlign: "center",
                  marginTop: "12px",
                }}
              >
                {tickets.cooperative}
              </p>
              <div>
                <div>
                  <p style={{ textAlign: "left", margin: "1px" }}>
                    <span style={{ fontWeight: "bold", color: "#000080" }}>
                      Fecha de compra:
                    </span>
                    <span style={{ marginLeft: "10px" }}>
                      {tickets.createdAt}
                    </span>
                  </p>
                  <p style={{ textAlign: "left", margin: "1px" }}>
                    <span style={{ fontWeight: "bold", color: "#000080" }}>
                      N° de Bus:
                    </span>
                    <span style={{ marginLeft: "10px" }}>
                      {tickets.busNumber}
                    </span>
                  </p>
                  <p style={{ textAlign: "left", margin: "1px" }}>
                    <span style={{ fontWeight: "bold", color: "#000080" }}>
                      Origen:
                    </span>
                    <span style={{ marginLeft: "10px" }}>{tickets.origen}</span>
                  </p>
                  <p style={{ textAlign: "left", margin: "1px" }}>
                    <span style={{ fontWeight: "bold", color: "#000080" }}>
                      Destino:
                    </span>
                    <span style={{ marginLeft: "10px" }}>
                      {tickets.destiny}
                    </span>
                  </p>
                  <p style={{ textAlign: "left", margin: "1px" }}>
                    <span style={{ fontWeight: "bold", color: "#000080" }}>
                      Hora de salida:
                    </span>
                    <span style={{ marginLeft: "10px" }}>
                      {tickets.departureTime}
                    </span>
                  </p>
                  <p style={{ textAlign: "left", margin: "1px" }}>
                    <span style={{ fontWeight: "bold", color: "#000080" }}>
                      Precio Total:
                    </span>
                    <span style={{ marginLeft: "10px" }}>{tickets.price}</span>
                  </p>
                  <p style={{ textAlign: "left", margin: "1px" }}>
                    <span style={{ fontWeight: "bold", color: "#000080" }}>
                      Asiento(s):
                    </span>
                    <p style={{ marginLeft: "5px", margin: "2px" }}>
                      {" "}
                      {tickets.seatings.length === 0 ? (
                        <span>No hay asientos.</span>
                      ) : (
                        tickets.seatings.map((stop) => (
                          <p style={{ margin: "2px" }}>
                            {stop.number} <span>{stop.type} </span>{" "}
                          </p>
                        ))
                      )}{" "}
                    </p>
                  </p>
                  <p style={{ textAlign: "left", margin: "1px" }}>
                    <span style={{ fontWeight: "bold", color: "#000080" }}>
                      Estado:
                    </span>
                    <span style={{ marginLeft: "10px" }}>{tickets.status}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default withRouter(ComprobanteDetalle);
