const PORT = process.env.PORT ?? 8000;
const express = require('express');
const cors = require('cors');
const app = express();
const start = require('./utils/start.js');

app.use(cors());
app.use(express.json());
app.use('/api', require('./routes/index'));

start(app, PORT);
