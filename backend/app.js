const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const postRoutes = require("./routes/posts");

const app = express();

// this is currently depecrated will need to update this portion with
// latest way to update connection to  mongoose
mongoose.connect("mongodb+srv://edgar:<Password>@cluster0.iieuk.mongodb.net/node-angular?retryWrites=true&w=majority",{ useNewUrlParser: true , useUnifiedTopology: true } )
  .then(()=>{
    console.log("Connected to database");
  })
  .catch(()=>{
    console.log("Connection failed");
  })

app.use(bodyParser.json());




app.use( (req, res, next) => {
  // the header provided
  res.setHeader('Access-Control-Allow-Origin',"*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.use("/api/posts",postRoutes);

module.exports = app;
