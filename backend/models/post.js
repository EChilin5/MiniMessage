//important the mongoose to the project
const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: {type:String, required:true},
  content: {type:String, default:"content not known"}
})

module.exports = mongoose.model('Post', postSchema);
