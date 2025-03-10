import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
const app = express();
import {
  obtenerUsuario,
  registrarUsuario,
  verificarUsuario,
  usuarioExiste,
  obtenerPublicaciones,
  obtenerFavoritos,
  obtenerVentas,
  registrarArticulo,
  registarPublicacion,
  registrarVenta,
  usuarioActual,
  precioActual,
  obtenerArticulos,
  registrarFavorito,
  obtenerUsuarioId,
  obtenerArticuloPublicacion,
  obtenerArticuloVentas,
  obtenerArticulosCategoria,
  obtenerCategorias,
  registrarDetalleVenta,
  eliminarFavorito,
} from "./consultas.js";
const port = 3000;

app.use(cors());
app.use(express.json());

//get usuario
app.get("/usuario", async (req, res) => {
  try {
    const autorization = req.header("Authorization");
    if (!autorization) {
      return res.status(401).json({ message: "No se proporcionó un token" });
    }
    const token = autorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token no válido" });
    }
    //console.log("Token Actual", autorization);

    const verify = jwt.verify(token, "desafioLatam");

    const { email } = verify;

    const usuario = await obtenerUsuario(email);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.send(usuario);
    /*res.json({
      usuario: {
        nombre: "blabla",
        correo: "blablabla.com",
        rol: "algo",
      },
    });*/
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "Error interno del servidor" });
  }
});
//get Productos
app.get("/productos", async (req, res) => {
  try {
    const articulos = await obtenerArticulos();
    if (articulos.length === 0) {
      return res.status(404).json({ message: "No se encontraron artículos." });
    }
    res.json(articulos);
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "Error interno del servidor" });
  }
});

app.get("/producto/:id", async (req, res) => {
  try {
    const { id } = req.params;
    //console.log(id);
    const articulos = await obtenerArticulos(id);
    if (!articulos) {
      return res.status(404).json({ message: "No se encuentran Articulos" });
    }
    //console.log(articulos);
    res.json(articulos);
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "Error interno del servidor" });
  }
});
//articulos categoria
app.get("/productos/:categoria", async (req, res) => {
  try {
    //console.log("/productos/:categoria");
    const { categoria } = req.params;
    //console.log(categoria);
    const articulos = await obtenerArticulosCategoria(categoria);
    if (!articulos) {
      return res
        .status(404)
        .json({ message: "No se encuentran Articulos en esa Categoria" });
    }
    //console.log(articulos);
    res.json(articulos);
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "Error interno del servidor" });
  }
});
// get publicaciones
app.get("/publicaciones", async (req, res) => {
  try {
    const publicaciones = await obtenerPublicaciones();
    //console.log(publicaciones);
    if (!publicaciones) {
      return res
        .status(404)
        .json({ message: "No se encuentran Publicaciones" });
    }

    const datosPublicaciones = await Promise.all(
      publicaciones.map(async (publicacion) => {
        //const idPublicacion = publicacion.id_publicacion;
        const vendedor = await obtenerUsuarioId(publicacion.id_vendedor);
        const producto = await obtenerArticuloPublicacion(
          publicacion.id_publicacion
        );
        //console.log(publicacion.id_producto);
        return {
          ...publicacion,
          vendedor,
          producto,
        };
      })
    );

    res.json(datosPublicaciones);

    //res.json(publicacion, vendedor, producto);
    /*res.json({publicaciones: [],});*/
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "Error interno del servidor" });
  }
});

// get publicaciones:id
app.get("/publicaciones/:id", async (req, res) => {
  const { id } = req.params;
  const publicaciones = await obtenerPublicaciones(id);

  if (!publicaciones) {
    return res.status(404).json({ message: "No se encuentran Publicaciones" });
  }
  //console.log("datos en get", datosUsuario);
  res.json(publicaciones);
  /*res.json({
    publicaciones: [
      {
        idProducto: "12345678",
        idVendedor: "1234",
        idPublicacion: "4321",
      },
    ],
  });*/
});

//get favoritos
app.get("/favoritos", async (req, res) => {
  try {
    const autorization = req.header("Authorization");
    if (!autorization) {
      return res.status(401).json({ message: "No se proporcionó un token" });
    }
    const token = autorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token no válido" });
    }

    const verify = jwt.verify(token, "desafioLatam");

    const { email } = verify;

    const favoritos = await obtenerFavoritos(email);
    if (!favoritos) {
      return res
        .status(400)
        .json({ message: "No se encuentran favoritos registrados" });
    }

    res.json(favoritos);
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "Error interno del servidor" });
  }
});

//get Ventas
app.get("/ventas", async (req, res) => {
  try {
    const autorization = req.header("Authorization");
    if (!autorization) {
      return res.status(401).json({ message: "No se proporcionó un token" });
    }
    const token = autorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token no válido" });
    }
    //console.log("Token Actual", autorization);

    const verify = jwt.verify(token, "desafioLatam");

    const { email } = verify;

    const ventas = await obtenerVentas(email);

    if (!ventas) {
      return res
        .status(404)
        .json({ message: "No se encuentran Compras registradas" });
    }

    const datosVentas = await Promise.all(
      ventas.map(async (venta) => {
        const comprador = await obtenerUsuarioId(venta.id_comprador);
        const producto = await obtenerArticuloVentas(venta.id_publicacion);

        return {
          ...venta,
          comprador,
          producto,
        };
      })
    );

    res.json(datosVentas);

    /*res.json({
      ventas: [
        {
          idComprador: "1234",
          idPublicacion: "4321",
          precioProducto: "1000",
        },
      ],
    });*/
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "Error interno del servidor" });
  }
});

app.get("/addProducto", async (req, res) => {
  try {
    //console.log("aqui estoy");
    const categorias = await obtenerCategorias();
    //console.log(categorias);
    res.json(categorias);
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "Error interno del servidor" });
  }
});

//post login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //console.log(email, password);

    if (!email || !password) {
      return res.status(400).json({ error: "Credenciales faltantes" });
    }
    const usuario = await verificarUsuario(email, password);
    //console.log(usuario);
    const token = jwt.sign({ email: usuario.email }, "desafioLatam", {
      expiresIn: "10m",
    });
    const { id_usuario, nombre, email: correo, rol } = usuario;
    //console.log("Usuario autenticado:", token);
    res.json({ token, usuario: { id_usuario, nombre, correo, rol } });
    /*res.json({
      token: "blablablablabla",
      email: "uncorreo",
    });*/
  } catch (error) {
    console.log("plop", error);
    res.status(error.code || 500).json({ error: error.message });
  }
});

//post register
app.post("/register", async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (await usuarioExiste(email)) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }
    const rol = "usuario";
    const usuario = await registrarUsuario(nombre, email, rol, password);

    const token = jwt.sign({ email: usuario.email }, "desafioLatam", {
      expiresIn: "10m",
    });
    //console.log("Usuario autenticado:", token);
    res.json({ token, usuario });

    /*res.json({
        token: "blablablablabla",
        email: "uncorreo",
      });*/
  } catch (error) {
    const statusCode =
      error.code && Number.isInteger(error.code) ? error.code : 500;
    res
      .status(statusCode)
      .json({ error: error.message || "Error interno del servidor" });
  }
});

//post productos
app.post("/productos", async (req, res) => {
  try {
    //console.log("aqui");
    const { title, description, price, stock, image, categoria } = req.body;
    //console.log(title, description, price, stock, image, categoria);
    await registrarArticulo(title, description, price, stock, image, categoria);
    res.json({
      message: "Producto registrado con exito",
    });
  } catch (error) {
    res.status(error.code || 500).json({ error });
  }
});

//post publicacion
app.post("/publicacion", async (req, res) => {
  try {
    const { idProducto } = req.body;

    const autorization = req.header("Authorization");

    if (!autorization) {
      return res.status(401).json({ message: "No se proporcionó un token" });
    }
    const token = autorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token no válido" });
    }

    const verify = jwt.verify(token, "desafioLatam");

    const { email } = verify;
    const idVendedor = await usuarioActual(email);
    //    console.log(idVendedor);
    await registarPublicacion(idProducto, idVendedor);
    res.json({
      message: "Publicacion registrada con exito",
    });
    /*res.json({
      id_producto: 1234,
      id_vendedor: 1234,
      id_publicacion: 4321,
    });*/
  } catch (error) {
    res.status(error.code || 500).json({ error: error.message });
  }
});

//post ventas
app.post("/ventas", async (req, res) => {
  try {
    const { productos, total } = req.body;

    const autorization = req.header("Authorization");
    if (!autorization) {
      return res.status(401).json({ message: "No se proporcionó un token" });
    }

    const token = autorization.split(" ")[1];
    //console.log(token);

    if (!token) {
      return res.status(401).json({ message: "Token no válido" });
    }
    const verify = jwt.verify(token, "desafioLatam");

    const { email } = verify;
    const idComprador = await usuarioActual(email);

    if (!productos || !Array.isArray(productos)) {
      return res.status(400).json({ message: "Datos inválidos." });
    }
    const id_venta = await registrarVenta(idComprador, total);
    //console.log("id_venta", id_venta);

    for (const producto of productos) {
      producto.precio = parseFloat(producto.precio);
      producto.cantidad = parseInt(producto.cantidad, 10);

      //console.log(`Producto: ${producto.id_producto}, Cantidad: ${producto.cantidad}, Precio: ${producto.precio}, usuario:${idComprador}`);

      await registrarDetalleVenta(
        id_venta,
        producto.id_producto,
        producto.cantidad,
        producto.precio
      );
    }

    /*productos.forEach((producto) => {
      
      producto.precio = parseFloat(producto.precio);
      producto.cantidad = parseInt(producto.cantidad, 10); 

      await registrarVenta(id_producto, idComprador, cantidad, precio);
      
      console.log(
        `Producto: ${producto.nombre_articulo}, Cantidad: ${producto.cantidad}, Precio: ${producto.precio}`
      );
    });*/
    //const precio = await precioActual(idPublicacion);
    //console.log("En index", id_producto, idComprador, cantidad, precio);
    res.json({
      message: "Venta registrado con exito",
    });
  } catch (error) {
    res.status(error.code || 500).json({ error });
  }
});

app.post("/favoritos", async (req, res) => {
  try {
    const { idProducto, estado } = req.body;

    const autorization = req.header("Authorization");
    //console.log(idPublicacion);
    if (!autorization) {
      return res.status(401).json({ message: "No se proporcionó un token" });
    }
    const token = autorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token no válido" });
    }

    const verify = jwt.verify(token, "desafioLatam");

    const { email } = verify;
    //console.log(estado);
    const idComprador = await usuarioActual(email);
    if (!estado) {
      await eliminarFavorito(idComprador, idProducto);
      res.json({
        message: "Favorito eliminado",
      });
    } else {
      await registrarFavorito(idComprador, idProducto);
      res.json({
        message: "Favorito Guardado",
      });
    }
  } catch (error) {
    res.status(error.code || 500).json({ error });
  }
});

app.listen(port, console.log(`Servido Corriendo en puerto ${port}`));
