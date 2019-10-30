const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const adminAccount = require('./util/adminAccount');

const authRoute = require('./routes/authRoute');
// const userRoute = require('./routes/userRoute');
// const adminRoute = require('./routes/adminRoute');

const app = express();

const MONGODB_URI = 'mongodb://localhost:27017/movie';


app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// app.use(adminAccount.check);

app.use('/api/auth/', authRoute);
// app.use('/api/user/', userRoute);
// app.use('/api/admin/', adminRoute);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

mongoose
    .connect(
        MONGODB_URI, { useNewUrlParser: true }
    )
    .then(result => {
        console.log('Connected');
        // console.log('Date:', Date.now());
        app.listen(8089, adminAccount.createAdminAccount);
    })
    .catch(err => {
        console.log(err);
    });
