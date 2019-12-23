const express = require('express');
const puerto = process.env.PORT || 3000;

app = express();

// Middleware para la ruta de subir archivos
app.use(require('./routes/upload.route'));

app.listen(puerto, console.log(`Escuchando en el puerto: ${puerto}`));