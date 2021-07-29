const express = require("express");

const router = express.Router();
const Post = require('../models/post');


//use patch to update an existing resource
// use put re
router.put("/:id", (req, res, next)=>{
  const post = new Post({
    _id: req.body.id,
    title:req.body.title,
    content:req.body.content
  });
  Post.updateOne({_id: req.params.id}, post).then(result=>{
    console.log(result);
    res.status(200).json({message: "Update succesful"});
  });
});

router.post("", (req, res, next)=>{
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

router.get("",(req, res, next)=>{
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

///get specific post from the server
router.get("/:id", (req,res,next)=>{
  Post.findById(req.params.id).then(post =>{
    if(post){
        res.status(200).json(post);
    }else{
      res.status(404).json({message:"Post not found"});
    }
  });
});

// id will be extracted by express which will take the id
router.delete("/:id", (req, res, next)=>{
  Post.deleteOne({_id: req.params.id}).then(result =>{
    console.log(result);
    res.status(200).json({message:"Post Deleted"});
  });
});

module.exports = router;
