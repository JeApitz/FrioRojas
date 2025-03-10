import { createContext, useState, useEffect, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [productos, setProductos] = useState([]);
  const [totalProductos, setTotalProductos] = useState(0);

  const [favoritos, setFavoritos] = useState(() => {
    try {
      const favoritosGuardados = localStorage.getItem("favoritos");
      return favoritosGuardados ? JSON.parse(favoritosGuardados) : {};
    } catch (error) {
      console.error("Error cargando favoritos:", error);
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  const agregarAlCarrito = (producto) => {
    const productoExistente = carrito.find(
      (item) => item.id_producto === producto.id_producto
    );
    if (productoExistente) {
      setCarrito((prevCarrito) =>
        prevCarrito.map((item) =>
          item.id_producto === producto.id_producto
            ? { ...item, cantidad: item.cantidad + producto.cantidad }
            : item
        )
      );
    } else {
      setCarrito((prevCarrito) => [
        ...prevCarrito,
        { ...producto, cantidad: producto.cantidad || 1 },
      ]);
    }
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prevCarrito) =>
      prevCarrito.filter((producto) => producto.id_producto !== id)
    );
  };

  const obtenerTotalProductos = () => {
    return carrito.reduce((total, producto) => total + producto.cantidad, 0);
  };

  const obtenerTotalPrecio = () => {
    const total = carrito.reduce((total, producto) => {
      const precioNumerico = parseFloat(
        (producto.precio || "0").toString().replace(/[^\d.-]/g, "")
      );
      const cantidad = producto.cantidad || 1;
      return total + precioNumerico * cantidad;
    }, 0);
    return total;
  };

  const actualizarCantidad = (id, incremento) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map((producto) =>
        producto.id_producto === id
          ? {
              ...producto,
              cantidad: Math.max(1, producto.cantidad + incremento),
            }
          : producto
      )
    );
  };

  const toggleFavorito = async (idProducto) => {
    const updatedFavoritos = { ...favoritos };
    if (updatedFavoritos[idProducto]) {
      delete updatedFavoritos[idProducto];
    } else {
      updatedFavoritos[idProducto] = true;
    }
    setFavoritos(updatedFavoritos);
    try {
      const respuesta = await fetch("http://localhost:3000/favoritos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          idProducto,
          estado: updatedFavoritos[idProducto],
        }),
      });
      if (!respuesta.ok) {
        throw new Error("Error al actualizar los favoritos");
      }
      console.log("Favorito actualizado en la base de datos");
    } catch (error) {
      console.error("Error al enviar los favoritos a la base de datos:", error);
    }
  };
  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        actualizarCantidad,
        eliminarDelCarrito,
        obtenerTotalProductos,
        obtenerTotalPrecio,
        favoritos,
        toggleFavorito,
        totalProductos,
        setTotalProductos,
        productos,
        setProductos,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
