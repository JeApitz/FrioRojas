import { useState } from "react";
import { Button, Form, Card, Container } from "react-bootstrap";

const AddPost = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("form", formData);
    try {
      const response = await fetch("http://localhost:3000/publicacion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Response:", response);
      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      const result = await response.json();
      localStorage.setItem("token", result.token);
      alert("Publicaciónagregada con exito!");
      // navigate("/");
    } catch (error) {
      console.error("Error:", error);
      // setLoginError(
      //   "Error al iniciar sesión. Por favor, verifica tus credenciales."
      // );
    }
    alert("Publicación agregada con éxito!");
  };

  return (
    <Container className="my-5 p-5">


    <Card className="shadow p-3" >
      <Card.Header className="bg-dark text-white">
        <h4>Agregar Publicación</h4>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Imagen</Form.Label>
            <Form.Control type="file" name="image" onChange={handleImageChange} required />
          </Form.Group>
          <Form.Group>
          <Form.Label>select menu</Form.Label>
        <Form.Select>
          <option> select</option>
        </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit">
            Publicar
          </Button>
        </Form>
      </Card.Body>
      </Card>
      </Container>
  );
};

export default AddPost;