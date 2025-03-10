import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Favorites = () => {
  const { favoritos, toggleFavorito, agregarAlCarrito } = useCart();
  const [productosFavoritos, setProductosFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/favoritos`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Error al cargar los favoritos");
        }
        const productos = await response.json();
        setProductosFavoritos(productos);
        console.log(productos);
      } catch (error) {
        console.error('No tienes productos favoritos', error);
        setError("No tienes productos favoritos.");
      } finally {
        setLoading(false);
      }
    };
    fetchFavoritos();
  }, []);
  if (loading) return <p className="text-center">Cargando favoritos...</p>;
  if (error) return <p className="text-center">{error}</p>;
  console.log("Favoritos almacenados:", favoritos);

  return (
    <Container className="my-8">
      <h2 className="text-center">Productos Favoritos</h2>
      <Row className="justify-content-center">
        {productosFavoritos.length > 0 ? (
          productosFavoritos.map((producto) => (
            <Col key={producto.id_producto} md={4} className="mb-4">
              <Card className="card-custom text-center">
                <Card.Img
                  variant="top"
                  src={producto.url}
                  alt={producto.nombre_articulo}
                />
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <Card.Title>{producto.nombre_articulo}</Card.Title>
                    <Button
                      variant="link"
                      className="favorito-btn"
                      onClick={() => {
                        toggleFavorito(producto.id_producto);
                        setProductosFavoritos((prevFavoritos) =>
                          prevFavoritos.filter(
                            (item) => item.id_producto !== producto.id_producto
                          )
                        );
                      }}
                    >
                      ❤️
                    </Button>
                  </div>
                  <Card.Text>{producto.precio}</Card.Text>
                  <Card.Text>{producto.descripcion}</Card.Text>
                  <Button
                    className="me-5 btn btn-success"
                    variant="primary"
                    onClick={() => {
                      agregarAlCarrito(producto);
                      toggleFavorito(producto.id_producto);
                      setProductosFavoritos((prevFavoritos) =>
                        prevFavoritos.filter(
                          (item) => item.id_producto !== producto.id_producto
                        )
                      );
                    }}
                  >
                    Agregar al Carrito
                  </Button>
                  <Button
                    className="btn btn-info"
                    variant="primary"
                    onClick={() =>
                      navigate(`/producto/${producto.id_producto}`)
                    }
                  >
                    Ver Detalle
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">No tienes productos favoritos.</p>
        )}
      </Row>
    </Container>
  );
};

export default Favorites;
