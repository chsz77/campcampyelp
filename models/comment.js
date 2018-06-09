var mongoose = require("mongoose"),
    moment = require('moment')

var commentSchema = new mongoose.Schema(
  {
    text: String,
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      username: String
    },
    createdAt: { 
      type: Date, 
      default: Date.now}
  }
);

//virtual
commentSchema
  .virtual('date_formatted')
  .get(function(){
  return moment(this.createdAt).fromNow()
})

module.exports = mongoose.model("Comment", commentSchema);