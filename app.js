require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(bodyParser.json());

// Habilito CORS 
app.use(cors());

// Endpoint para manejar las solicitudes POST del formulario
app.post('/backend', (req, res) => {
  const { email } = req.body;

  // Configuro el transporter para enviar correos electrónicos
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Configuro el correo electrónico que se enviará
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.TO_EMAIL,
    subject: 'Nuevo suscriptor a la lista de espera',
    text: `Nuevo suscriptor: ${email}`,
  };

  // Envio el correo electrónico
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo electrónico:', error);
      res.status(500).send('Error interno del servidor');
    } else {
      console.log('Correo electrónico enviado:', info.response);
      res.status(200).send('Datos del formulario enviados correctamente');
    }
  });
});

// Inicio el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
