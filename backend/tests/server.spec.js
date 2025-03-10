const request = require("supertest");
const server = require("../index");
describe("Operaciones CRUD de FrioRojas", () => {
  it("200 Get & verificar publicaciones", async () => {
    const response = await request(server).get("/publicaciones").send();
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);

    //  console.log(response.body);
  });
  it("200 obtener Favoritos", async () => {
    const id_usuario = 1;
    const response = await request(server)
      .get(`/favoritos`)
      .set("Authorization", "valorDelToken");

    expect(response.statusCode).toBe(200);
    //console.log(response, response.statusCode);
  });
  it("201 Post para agregar usuario", async () => {
    const usuario = {
      id_usuario: 50,
      nombre: "Viktor",
      email: "viktor@desafioLatam.com",
      rol: "usuario",
      passwod: "123456",
    };
    const response = await request(server).post("/usuarios").send(usuario);
    expect(response.statusCode).toBe(201);
    expect(response.body).toContainEqual(usuario);
    //console.log(response.body);
  });
  it(" Cargar datos de publicaciones", async () => {
    const response = await request(server).get(`/publicaciones`).send(cafe);
    expect(response.statusCode).toBe(200);
    //console.log(response.body);
  });
  //it("", () => {});
});
