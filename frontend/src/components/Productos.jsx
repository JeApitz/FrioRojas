import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Card, Pagination, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
//import productosData from "../data/data";
import { useCart } from "../contexts/CartContext";

const Productos = () => {
  const { categoria } = useParams();
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const productosPorPagina = 6;
  const [paginaActual, setPaginaActual] = useState(1);

  const navigate = useNavigate();
  const {
    favoritos,
    toggleFavorito,
    totalProductos,
    setTotalProductos,
    productos,
    setProductos,
  } = useCart();
 // const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setCargando(true);
        //console.log("antes del url");
        const url = new URL(`http://localhost:3000/productos/`);
        // const url = new URL(`${apiUrl}productos/`);
        //console.log("aqui productos");

        if (categoria) {
          url.pathname += categoria;
        }

        url.searchParams.append("pagina", paginaActual.toString());
        url.searchParams.append("porPagina", productosPorPagina.toString());
        //console.log(url);

        const respuesta = await fetch(url);
        //console.log(respuesta);
        if (!respuesta.ok) {
          throw new Error(
            `Error en la respuesta del servidor: ${respuesta.status}`
          );
        }
        const datos = await respuesta.json();
        //console.log(datos);

        setProductos(datos || []);
        setTotalProductos(datos.length || 0);
        //console.log(productos);
      } catch (err) {
        console.error("Error al cargar productos:", err);
        setError("No se pudieron cargar los productos");
        setCargando(false);
      } finally {
        setCargando(false);
      }
    };

    cargarProductos();
  }, [categoria, paginaActual, productosPorPagina]);

  // console.log("Total: ",totalProductos,"Producto Pagina: ",productosPorPagina );

  const totalPaginas = Math.ceil(totalProductos / productosPorPagina);
  /*const productosPaginados = productos.slice(
    (paginaActual - 1) * productosPorPagina,
    paginaActual * productosPorPagina
  );*/

  const manejarPagina = (pagina) => {
    setPaginaActual(pagina);
  };

  const verDetalle = (id) => {
    navigate(`/producto/${id}`);
  };
  if (cargando) return <p className="text-center">Cargando productos...</p>;
  if (error) return <p className="text-center">Error: {error}</p>;
  return (
    <Container className="my-8">
      <h2 className="text-center">
        Productos - {categoria ? categoria.replace("-", " ") : "Todos"}
      </h2>
      <Row className="justify-content-center">
        {productos.length > 0 ? (
          productos.map((producto) => (
            <Col key={producto.id_producto} md={4} className="mb-4">
              <Card className=" text-center">
                <Card.Img
                  variant="top"
                  src={producto.url}
                  alt={producto.nombre_articulo}
                  className="img-custom"
                />
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <Card.Title>{producto.nombre_articulo}</Card.Title>
                    <Button
                      variant="link"
                      className="favorito-btn"
                      onClick={() => toggleFavorito(producto.id_producto)}
                    >
                      {favoritos[producto.id_producto] ? "❤️" : "🤍"}
                    </Button>
                  </div>
                  <Card.Text>{producto.precio}</Card.Text>
                  <Card.Text className="text-truncate">
                    {producto.descripcion}
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => verDetalle(producto.id_producto)}
                  >
                    Ver Detalle
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">No hay productos en esta categoría.</p>
        )}
      </Row>

      <Pagination className="justify-content-center">
        <Pagination.Prev
          onClick={() => manejarPagina(paginaActual - 1)}
          disabled={paginaActual === 1}
        />
        {[...Array(totalPaginas)].map((_, index) => (
          <Pagination.Item
            key={index}
            active={index + 1 === paginaActual}
            onClick={() => manejarPagina(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => manejarPagina(paginaActual + 1)}
          disabled={paginaActual === totalPaginas}
        />
      </Pagination>
      <style>
        {
          `
          .img-custom{
          height: 350px;
          }
          `
        }
      </style>
    </Container>
  );
};

export default Productos;
