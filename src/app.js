const express = require('express');
const userRoute = require('./routes/user.route');
const accountRoute = require('./routes/account.route');
const transcationRoute = require('./routes/transaction.route')
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRoute);
app.use('/api/accounts', accountRoute);
app.use('/api/transcation', transcationRoute);

module.exports = app;


