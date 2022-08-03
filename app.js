//dependancies
const express = require('express');
const app = express();
const path = require('path');
const route = require('./Routes/route');
const authroute = require('./Routes/authroute');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const upload = require('express-fileupload');
const dotenv = require('dotenv');
dotenv.config({ path: "./config.env" });
const mongoose = require('mongoose');

//database connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
}).then(() => {
    console.log('DB connection Successful');
}).catch(doc => {
    console.log(`Error` + doc);
})

//middlewar
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'));
// app.use(upload());

app.use(express.json());
app.use(session({ resave: false, saveUninitialized: true, secret: 'nodedemo' }));
app.use(cookieParser());

app.set('layout', 'layout/layout');
app.use(expressLayouts);

app.use(express.static(__dirname + '/public'));


app.use('/', authroute);
app.use('/', route);


// app.use((err, req, res, next) => {
//     let error = { ...err }
//     if (error.name === 'JsonWebTokenError') {
//         err.message = "please login again";
//         err.statusCode = 401;
//         return res.status(401).redirect('view/login');
//     }
//     err.statusCode = err.statusCode || 500;
//     err.status = err.status || 'errors';

//     res.status(err.statusCode).json({
//         status: err.status,
//         message: err.message,

//     })
// });

const http = require("http").createServer(app);
http.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));