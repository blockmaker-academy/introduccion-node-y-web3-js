const express = require('express');
const { body, validationResult } = require('express-validator');
const helmet = require('helmet');

const app = express();
const PORT = 8000;

// Simulación de base de datos
const database = {
  productos: [
    { id: 1, nombre: 'Producto 1', cantidad: 5 },
    { id: 2, nombre: 'Producto 2', cantidad: 10 },
    { id: 3, nombre: 'Producto 3', cantidad: 15 }
  ]
};

app.use(express.json());
app.use(helmet()); // Mejora la seguridad

// Middleware para manejo de errores
const errorHandler = (error, req, res, next) => {
  if (error) {
    res.status(500).send({ error: error.message });
  } else {
    next();
  }
};

app.get('/', (req, res) => {
  res.send({ mensaje: 'Bienvenido a la API de Gestión de Productos' });
});

app.get('/api/productos', (req, res) => {
  res.json(database.productos);
});

app.get('/api/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const producto = database.productos.find(p => p.id === id);
  
  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  res.json(producto);
});

app.post(
  '/api/productos',
  body('nombre').isString().withMessage('Nombre debe ser una cadena'),
  body('cantidad').isNumeric().withMessage('Cantidad debe ser un número'),
  (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }

    const nuevoProducto = req.body;
    const nuevoId = database.productos.length + 1;
    nuevoProducto.id = nuevoId;

    database.productos.push(nuevoProducto);
    res.status(201).json({ message: 'Producto agregado correctamente', producto: nuevoProducto });
  }
);
// Actualizar un producto existente
app.put('/api/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const indice = database.productos.findIndex(p => p.id === id);

  if (indice === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  const actualizacion = req.body;
  database.productos[indice] = { ...database.productos[indice], ...actualizacion };
  res.json({ message: 'Producto actualizado correctamente', producto: database.productos[indice] });
});

// Eliminar un producto
app.delete('/api/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const indice = database.productos.findIndex(p => p.id === id);

  if (indice === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  database.productos.splice(indice, 1);
  res.json({ message: 'Producto eliminado correctamente' });
});
// Middleware para manejo de errores
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
