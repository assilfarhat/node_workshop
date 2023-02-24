const express = require("express");
const createError = require("http-errors");
const app = express();

const mongoose = require('mongoose');
const dbConfig = require("./database/mongodb.json");
const contactRouter = require('./routes/contact');

const logger = require("morgan");

app.subscribe(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/contact',contactRouter);
app.use((req,res,next)=>{
    next(createError(404));
});

mongoose.connect(dbConfig.mongo.uri);

const PORT=8067
app.listen(PORT, () => {
    console.log('Server running on port ');
});


module.exports = app;