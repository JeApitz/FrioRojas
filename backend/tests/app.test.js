const request = require("supertest");
const app = require("../index");

describe("Testeo de endpoints", () => {
  it("Debería devolver un token al hacer login", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "jesus@correo.com", password: "123456" });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(typeof response.body.token).toBe("string");
  });
  it("Debería registrar un nuevo usuario", async () => {
    const response = await request(app).post("/register").send({
      nombre: "Nuevo Usuario 4",
      email: "nuevo4@correo.com",
      rol: "usuario",
      password: "12345678",
    });
    expect(response.status).toBe(200);
    expect(response.text).toBe("Usuario registrado con éxito");
  });
  it("Debería obtener las publicaciones", async () => {
    const response = await request(app).get("/publicaciones");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
  it("Debería obtener la información de un producto por ID", async () => {
    const productoId = 1; // Cambia esto por un ID válido de tu base de datos
    const response = await request(app).get(`/productos/${productoId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id_producto", productoId);
    expect(response.body).toHaveProperty("titulo_nombre");
    expect(response.body).toHaveProperty("descripcion");
    expect(response.body).toHaveProperty("precio");
    expect(response.body).toHaveProperty("stock");
    expect(response.body).toHaveProperty("url_imagen");
  });
});
