import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button, Row, Col, Alert } from "react-bootstrap";
import { useCart } from "../contexts/CartContext.jsx";
import { useState, useEffect } from "react";

const ProductDetail = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const { carrito, agregarAlCarrito } = useCart();
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const volver = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const url = `http://localhost:3000/producto/${id}`;
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
          throw new Error(
            `Error en la respuesta del servidor: ${respuesta.status}`
          );
        }

        const datos = await respuesta.json();

        setProducto(datos[0] || null);

        const productoEnCarrito = carrito.find(
          (item) => item.id_productos === datos?.id_productos
        );
        if (productoEnCarrito) {
          setCantidad(productoEnCarrito.cantidad);
        }
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };

    cargarProducto();
  }, [carrito, id]);

  const handleAgregarCarrito = () => {
    const productoConCantidad = { ...producto, cantidad };
    agregarAlCarrito(productoConCantidad);
    setMensaje(`${producto.nombre_articulo} agregado al carrito!`);
    setTimeout(() => setMensaje(""), 3000);
  };

  if (!producto) {
    return <Container className="my-5">Producto no encontrado.</Container>;
  }
  return (
    <Container className="my-5 d-flex justify-content-center align-items-center">
      <Row className="d-flex justify-content-center">
        <Col sm={8}>
          <Card className="text-center">
            <Card.Img
              variant="top"
              src={producto.url}
              alt={producto.nombre_articulo}
              style={{ maxWidth: "300px", margin: "0 auto" }}
            />
            <Card.Body>
              <Card.Title>{producto.nombre_articulo}</Card.Title>
              <Card.Text>{producto.descripcion}</Card.Text>
              <Card.Text className="fw-bold">{producto.precio}</Card.Text>
              <div className="d-flex align-items-center justify-content-center">
                <Button
                  variant="primary"
                  onClick={handleAgregarCarrito}
                  className="ms-3"
                >
                  Agregar al Carrito
                </Button>
              </div>
            </Card.Body>
          </Card>
          {mensaje && (
            <Alert variant="success" className="mt-3">
              {mensaje}
            </Alert>
          )}
        </Col>
        <div className="d-flex align-items-center justify-content-center mt-4">
          <Button
            variant="primary"
            type="button"
            onClick={volver}
            className="ms-3"
          >
            Volver
          </Button>
        </div>
      </Row>
    </Container>
  );
};

export default ProductDetail;
