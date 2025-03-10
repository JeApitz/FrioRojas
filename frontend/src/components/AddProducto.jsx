import { useState, useEffect } from "react";
import { Button, Form, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddProducto = () => {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    categoria: "",
    stock: "",
  });
  const salir = (e) => {
    e.preventDefault();

    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /*const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };*/

  const handleSubmit = async (e) => {
    e.preventDefault();
    //    console.log("form", formData);
    if (
      !formData.title ||
      !formData.description ||
      !formData.price ||
      !formData.stock ||
      !formData.image ||
      !formData.categoria
    ) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    if (
      isNaN(formData.price) ||
      isNaN(formData.stock) ||
      formData.price <= 0 ||
      formData.stock <= 0
    ) {
      alert("Por favor, ingrese valores válidos para el precio y la cantidad.");
      return;
    }
    try {
      //console.log("form", formData);
      /*const formDataToSend = new FormData();
      formDataToSend.append("nombre_articulo", formData.title);
      formDataToSend.append("descripcion", formData.description);
      formDataToSend.append("precio", formData.price);
      formDataToSend.append("stock", formData.stock);
      formDataToSend.append("url", formData.image);
      formDataToSend.append("categoria", formData.categoria);*/
      const response = await fetch("http://localhost:3000/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      //console.log(response);

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      const result = await response.json();
      //console.log("Response:", result);
      //localStorage.setItem("token", result.token);
      alert("Producto agregado con exito!");
      // navigate("/");
    } catch (error) {
      console.error("Error:", error);
      // setLoginError(
      //   "Error al iniciar sesión. Por favor, verifica tus credenciales."
      // );
    }
    setFormData({
      title: "",
      description: "",
      price: "",
      image: "",
      categoria: "",
      stock: "",
    });
    //alert("Publicación agregada con éxito!");
  };

  useEffect(() => {
    fetch("http://localhost:3000/addProducto")
      .then((response) => response.json())
      .then((data) => {
        setCategorias(data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener las categorías:", error);
      });
  }, []);

  return (
    <Container className="my-5 p-5">
      <Card className="shadow p-3">
        <Card.Header className="bg-dark text-white">
          <h4>Agregar Producto</h4>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Escribe el Titulo del Producto"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Describe el producto"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cantidad a Agregar</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                placeholder="Cantidad de Producto a agregar en Stock"
                min="1"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="price"
                placeholder="Precio del Producto"
                min="0.01"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="text"
                name="image"
                placeholder="Direccion de la imagen del Producto"
                value={formData.image}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>select Categoria</Form.Label>
              <Form.Select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                required
              >
                <option value=""> select</option>
                {categorias.map((categoria) => (
                  <option
                    key={categoria.id_producto}
                    value={categoria.categoria}
                  >
                    {categoria.categoria}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
              Agregar
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <Container className="d-flex justify-content-center mt-5">
        <Button variant="primary" type="button" onClick={salir}>
          Volver
        </Button>
      </Container>
    </Container>
  );
};

export default AddProducto;
