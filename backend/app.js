const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');


const app = express();

// this is currently depecrated will need to update this portion with
// latest way to update connection to  mongoose
mongoose.connect("mongodb+srv://edgar:<password>@cluster0.iieuk.mongodb.net/node-angular?retryWrites=true&w=majority")
  .then(()=>{
    console.log("Connected to database");
  })
  .catch(()=>{
    console.log("Connection failed");
  })

app.use(bodyParser.json());

const Post = require('./models/post');



app.use( (req, res, next) => {
  // the header provided
  res.setHeader('Access-Control-Allow-Origin',"*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});


app.post("/api/posts", (req, res, next)=>{
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  })
  // add then in order to get the id back from the created post
  post.save().then(createdPost =>{
    res.status(201).json({
        message:'Post added successfully',
        postId: createdPost._id
      });
  });

});

app.get("/api/posts",(req, res, next)=>{
  Post.find()
  .then(documents =>{
    // this needs to be executed here in order to get all the post
    // or else res will be called before the post are found
    res.status(200).json({
      message:'Posts fetched succesfully',
      posts:documents
    });
  })
});

// id will be extracted by express which will take the id
app.delete("/api/posts/:id", (req, res, next)=>{
  Post.deleteOne({_id: req.params.id}).then(result =>{
    console.log(result);
    res.status(200).json({message:"Post Deleted"});
  });
});

module.exports = app;
