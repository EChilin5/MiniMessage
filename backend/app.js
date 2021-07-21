const express = require('express');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());


app.use( (req, res, next) => {
  // the header provided
  res.setHeader('Access-Control-Allow-Origin',"*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});


app.post("/api/posts", (req, res, next)=>{
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message:'Post added successfully'
  });
});

app.get("/api/posts",(req, res, next)=>{
  const posts = [
    {id: 'ujieosajt', title:'first server post', content:"hello from server"},
    {id: 'gftrsgfdg', title:'second server post', content:"welcome from server"},
    {id: 'gdfgfery', title:'third server post', content:"end from server"},
  ];
  res.status(200).json({
    message:'Posts fetched succesfully',
    posts:posts
  });
});

module.exports = app;
