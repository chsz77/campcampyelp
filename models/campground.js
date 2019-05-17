var mongoose = require("mongoose"),
    moment = require('moment')

var campgroundSchema = new mongoose.Schema({
		name: {
		  type: String,
		  required: true
		},
		image: {
		  type: String,
		  required: true
		},
    price: {
		  type: String,
		  required: true
		},
		description: String,
    lat: Number,
    lng: Number,
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
