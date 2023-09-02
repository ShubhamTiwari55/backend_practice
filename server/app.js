const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: [process.env.FRONTEND_URL], // Replace with your frontend URL
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));

app.use('/ping', (req, res) => {
  res.send('pong');
});

app.all('*', (req, res) => {
  res.status(404).send('OOPS! 404 not found!');
});

module.exports = app;