require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./models')

// const router = require('./routes/router');
const customerRouter = require('./routes/customer');
const categoryRouter = require('./routes/category');
const productRouter = require('./routes/product');
const transactionsRouter = require('./routes/transactions');
const transactionProductRouter = require('./routes/transactionProduct');


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: true, credentials: true }));

// app.use('/', router);
app.use('/customer', customerRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/transactions', transactionsRouter);
app.use('/transactionProduct', transactionProductRouter);

app.listen(process.env.SERVER_PORT, () => {console.log('Server Running')});
