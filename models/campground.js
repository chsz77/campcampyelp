var mongoose = require("mongoose"),
    moment = require('moment')

var campgroundSchema = new mongoose.Schema({
		name: String,
		image: String,
    price: String,
		description: String,
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      username: String
    },
    createdAt: { 
      type: Date, 
      default: Date.now},
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Comment"
			}
		]
});

//virtual
campgroundSchema
  .virtual('date_formatted')
  .get(function(){
  return moment(this.createdAt).fromNow()
})


module.exports = mongoose.model("Campground", campgroundSchema)
