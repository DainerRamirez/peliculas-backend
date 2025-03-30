const express = require('express')
const { getConnection } = require('./db/connect-mongo')
const cors = require('cors');
require('dotenv').config()

const app = express()
const port = process.env.PORT;

app.use(cors());

getConnection();

app.use(express.json());

app.use('/director', require('./routes/director'));
app.use('/genero', require('./routes/genero'));
app.use('/tipo', require('./routes/tipo'));
app.use('/productora', require('./routes/productora'));
app.use('/multimedia', require('./routes/multimedia'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})