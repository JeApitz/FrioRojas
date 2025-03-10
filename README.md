# Proyecto Final - FrioRojas

Este proyecto es una aplicación web para la gestión de productos de refrigeración y climatización. La aplicación incluye un frontend desarrollado con React y Vite, y un backend desarrollado con Node.js y Express, utilizando una base de datos PostgreSQL.

## Instalación

### Backend

1. Navega a la carpeta `backend`:

   ```sh
   cd backend
   ```

2. Instala las dependencias:

   ```sh
   npm install
   ```

3. Configura la base de datos PostgreSQL utilizando el script [BD_script.sql](http://_vscodecontentref_/31).

4. Inicia el servidor:
   ```sh
   node index.js
   ```

### Frontend

1. Navega a la carpeta [frontend](http://_vscodecontentref_/32):

   ```sh
   cd frontend
   ```

2. Instala las dependencias:

   ```sh
   npm install
   ```

3. Inicia la aplicación:
   ```sh
   npm run dev
   ```

## Scripts

### Backend

- `node index.js`: Inicia el servidor backend.
- `npm test`: Ejecuta los tests con Jest.

### Frontend

- `npm run dev`: Inicia la aplicación frontend en modo desarrollo.

## Endpoints del Backend

- `POST /register`: Registra un nuevo usuario.
- `POST /login`: Inicia sesión y devuelve un token.
- `GET /usuarios`: Obtiene la información del usuario autenticado.
- `POST /publicaciones`: Ingresa una nueva publicación.
- `GET /publicaciones`: Obtiene todas las publicaciones.
- `GET /publicaciones/:id`: Obtiene una publicación por ID.
- `POST /productos`: Ingresa un nuevo producto.
- `GET /productos`: Obtiene todos los productos.
- `GET /productos/:id`: Obtiene un producto por ID.
- `POST /ventas`: Ingresa una nueva venta.
- `GET /ventas`: Obtiene todas las ventas.
- `GET /ventas/:id`: Obtiene una venta por ID.
- `POST /favoritos`: Ingresa un nuevo favorito.
- `GET /favoritos/:id`: Obtiene los favoritos por ID de usuario.

## Estructura del Frontend

- [src/components](http://_vscodecontentref_/33): Componentes reutilizables de la aplicación.
- [src/contexts](http://_vscodecontentref_/34): Contextos de React para el manejo de estado global.
- [src/data](http://_vscodecontentref_/35): Datos estáticos utilizados en la aplicación.
- [src/hooks](http://_vscodecontentref_/36): Hooks personalizados de React.
- [src/views](http://_vscodecontentref_/37): Vistas principales de la aplicación.
- [src/types](http://_vscodecontentref_/38): Definiciones de tipos TypeScript.
