
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Endpoint 1: Estado del servidor
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'El servidor funciona correctamente'
  });
});

// Endpoint 2: Información de los integrantes
app.get('/api/info', (req, res) => {
  res.json({
    status: 'ok',
    integrantes: [
      {
        nombre: 'Karla Reneé Rivas Hernández',
        edad: 21,
        carrera: 'ing. informatica',
        materiasAprobadas: 12
      },
      {
        nombre: 'Francisco Javier Guadrón Vásquez',
        edad: 22,
        carrera: 'ing. informatica',
        materiasAprobadas: 2
      }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
