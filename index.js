const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./Routers/AuthRouter');
const OrderRouter = require('./Routers/OrderRouter');
const serviceRouter = require('./Routers/ServiceRouter');

require('dotenv').config();

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

// routers
app.use('/auth', authRouter);
app.use('/services', serviceRouter);
app.use('/order', OrderRouter);
app.post('/', (req, res) => res.send(req.body));

const CONNECTION_URL =  'mongodb+srv://shourov:shourov123@cluster0.nor46.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 4000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)),
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);
