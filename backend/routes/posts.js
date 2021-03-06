const express = require("express");

const router = express.Router();
const multer = require("multer");
const Post = require('../models/post');

const MIME_TYPE_MAP = {
  'image/png' :'png',
  'image/jpeg':'jpg',
  'image/jpg' : 'jpg'

};

const storage = multer.diskStorage({
  destination: (req, file, cb)=> {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if(isValid){
      error =null;
    }
    cb(error, "backend/images");
  },
  filename:(req, file, cb)=>{
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name+'-'+Date.now()+'.'+ext);
  }
});

router.post("", multer({storage:storage}).single("image"),(req, res, next)=>{
  const url = req.protocol + '://'+req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url+"/images/" + req.file.filename
  })
  // add then in order to get the id back from the created post
  post.save().then(createdPost =>{
    res.status(201).json({
        message:'Post added successfully',
        ...createdPost,
          id: createdPost._id

      });
  });

});

//use patch to update an existing resource
// use put re
router.put("/:id", multer({storage:storage}).single("image"), (req, res, next)=>{
  console.log(req.file);
  let imagePath = req.body.imagePath;
  if(req.file){
    const url = req.protocol + "://" + req.get("host");
    imagePath = url+"/images/" + req.file.filename
  }

  const post = new Post({
    _id: req.body.id,
    title:req.body.title,
    content:req.body.content,
    imagePath: imagePath
  });
  console.log(post);
  Post.updateOne({_id: req.params.id}, post).then(result=>{
    console.log(result);
    res.status(200).json({message: "Update succesful"});
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
