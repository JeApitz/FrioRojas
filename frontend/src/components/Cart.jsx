import { useCart } from "../contexts/CartContext.jsx";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    carrito,
    eliminarDelCarrito,
    actualizarCantidad,
    obtenerTotalPrecio,
  } = useCart();
  const navigate = useNavigate();

  if (carrito.length === 0) {
    return <Container className="my-5">El carrito está vacío.</Container>;
  }

  const handleEliminarDelCarrito = (id) => {
    eliminarDelCarrito(id);
  };

  const handleIncrementar = (id) => {
    actualizarCantidad(id, 1);
  };

  const handleDecrementar = (id) => {
    actualizarCantidad(id, -1);
  };

  const realizarCompra = async () => {
    const productosCarrito = carrito.map((producto) => ({
      id_producto: producto.id_producto,
      nombre_articulo: producto.nombre_articulo,
      cantidad: producto.cantidad,
      precio: parseFloat(producto.precio),
    }));

    try {
      //console.log(productosCarrito);
      const response = await fetch("http://localhost:3000/ventas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `beaver ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          productos: productosCarrito,
          total: obtenerTotalPrecio(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Error en la compra: ${errorData.message || response.statusText}`
        );
      }

      const result = await response.json();
      console.log(result);

      alert("Compra realizada con éxito!");

      navigate("/");
    } catch (error) {
      console.error("Error al realizar la compra:", error);
      alert(
        "Hubo un error al realizar la compra, por favor intente nuevamente."
      );
    }
  };

  return (
    <Container className="my-5">
      <h2 className="text-center">Carrito de Compras</h2>
      <Row className="justify-content-center">
        {carrito.map((producto) => (
          <Col key={producto.id_producto} md={12} className="mb-4">
            <div className="d-flex align-items-center mb-3">
              <img
                src={producto.url}
                alt={producto.nombre_articulo}
                style={{ width: "50px", height: "50px", marginRight: "10px" }}
              />
              <div className="flex-grow-1">
                <div>{producto.nombre_articulo}</div>
                <div>
                  <span>{producto.precio}</span> x{" "}
                  <span>{producto.cantidad}</span>
                </div>
                <div className="d-flex align-items-center">
                  <Button
                    variant="secondary"
                    onClick={() => handleDecrementar(producto.id_producto)}
                  >
                    -
                  </Button>
                  <span className="mx-2">{producto.cantidad}</span>
                  <Button
                    variant="secondary"
                    onClick={() => handleIncrementar(producto.id_producto)}
                  >
                    +
                  </Button>
                </div>
              </div>
              <Button
                variant="danger"
                onClick={() => handleEliminarDelCarrito(producto.id_producto)}
              >
                Eliminar
              </Button>
            </div>
          </Col>
        ))}
      </Row>
      <div className="text-center mt-4">
        <h4>Total: {obtenerTotalPrecio()}</h4>
      </div>
      <Container className="d-flex justify-content-center mt-5">
        <Button
          variant="primary"
          type="button"
          onClick={() => realizarCompra()}
        >
          Completar Compra
        </Button>
      </Container>
    </Container>
  );
};

export default Cart;
