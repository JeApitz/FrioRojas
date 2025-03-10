import "./App.css";
import ContextProvider from "./contexts/Context";
import useDeveloper from "./hooks/useDeveloper";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./views/home";
import Navigation from "./components/Navigation.jsx";
import Register from "./views/register";
import Login from "./views/login";
import Productos from "./components/Productos.jsx";
import AddProducto from "./components/AddProducto.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import Cart from "./components/Cart.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
import Favorites from "./components/Favorites.jsx";
import AddPost from "./components/AddPost.jsx";

function App() {
  const globalState = useDeveloper();

  return (
    <ContextProvider value={globalState}>
      <CartProvider>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/productos/:categoria" element={<Productos />} />
            <Route path="/producto/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/favoritos" element={<Favorites />} />
            <Route path="/addPost" element={<AddPost />} />
            <Route path="/addProducto" element={<AddProducto />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </ContextProvider>
  );
}

export default App;
