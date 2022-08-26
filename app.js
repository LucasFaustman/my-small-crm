//dependancies
const express = require('express');
const app = express();
const path = require('path');
const route = require('./Routes/route');
const authroute = require('./Routes/authroute');
const leadroute = require('./Routes/leadroute');
const tasksroute = require('./Routes/tasksroute')
const dealroute = require('./Routes/dealroute')
const companyroute = require('./Routes/companyroute')
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const cookieParser = require('cookie-parser');
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


app.use(express.json());
app.use(session({ resave: false, saveUninitialized: true, secret: 'nodedemo' }));
app.use(cookieParser());

app.set('layout', 'layout/layout');

app.use(express.static(__dirname + '/public'));



app.use('/', tasksroute)
app.use('/', authroute);
app.use('/', leadroute)
app.use('/', companyroute)
app.use('/', dealroute)
app.use('/', route);

const http = require("http").createServer(app);
http.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));