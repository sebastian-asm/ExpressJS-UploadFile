const express = require('express');
const fileUpload = require('express-fileupload');

app = express();

app.use(fileUpload({ useTempFiles: true }));

app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      error: {
        mensaje: 'No hay archivo para subir'
      }
    });
  }

  const archivo = req.files.archivo;

  // Archivos permitidos para subir (solo imagenes)
  const extensiones = ['png', 'jpg', 'jpeg', 'gif'];
  const nombre = archivo.name.split('.');
  const extension = nombre[nombre.length - 1];

  if (extensiones.indexOf(extension) < 0) {
    return res.status(400).json({
      ok: false,
      error: {
        mensaje: 'La extensión del archivo no es válida',
        extension_recibida: extension,
        extensiones_permitidas: `Extensiones permitida: ${extensiones.join(', ')}`
      }
    });
  }

  // Cambiando el nombre del archivo para evitar sobreescritura en el servidor
  const nombreFinal = `${new Date().getTime()}.${extension}`;

  archivo.mv(`./uploads/${nombreFinal}`, err => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: 'Error al subir el archivo',
        error: err
      });
    }

    res.json({
      ok: true,
      mensaje: 'Archivo subido correctamente'
    });
  });
});

module.exports = app;