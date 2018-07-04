var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: {
                type: String,
                required: true
              },
    password: String,
    isAdmin: {
      type:Boolean,
      default: false}
})

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema)