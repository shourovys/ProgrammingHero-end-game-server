const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./Routers/AuthRouter');
const OrderRouter = require('./Routers/OrderRouter');
const serviceRouter = require('./Routers/ServiceRouter');
const UserOrderRouter = require('./Routers/UserOrderRouter');

require('dotenv').config();

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

// routers
app.use('/user/auth', authRouter);
app.use('/services', serviceRouter);
app.use('/user/order', UserOrderRouter);
app.use('/order', OrderRouter);
app.get('/', (req, res) => res.send('welcome to Our App'));

const CONNECTION_URL = process.env.MONGODB_CONNECTION_URL;
const PORT = process.env.PORT || 4000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)),
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);
