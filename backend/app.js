const express = require('express');
const cors = require('cors');
require('dotenv').config();


const app = express();
const port = process.env.PORT;
const {connectDB} = require('./config/database');
connectDB();



//Middleware.
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

//Routes.
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/staff', require('./routes/staff.routes'));

//Listening Port.
app.listen(port, ()=>{ console.log(`API is listening on port ${port}`);});

