var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middleware = {};

middleware.isLoggedIn = function (req, res, next){
  if(req.isAuthenticated()){
    return next()
  }
  req.flash("error", "You have to be logged in first!");
  res.redirect("/login")
}

middleware.checkOwnership = function(req, res, next){
  if(req.isAuthenticated()){
    Campground.findById(req.params.id, function(err, foundCampground){
      if(err){
        res.redirect("back")
      } else {
        if(foundCampground.author.id.equals(req.user.id)){
          next()
        } else {
          req.flash("error", "That sucks!");
          res.redirect("back")
        }
      }
       
    });
  } else {
    req.flash("error", "That sucks!");
    res.redirect("back")
  }
}

middleware.checkCommentOwnership = function(req, res, next){
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
        res.redirect("back")
      } else {
        if(foundComment.author.id.equals(req.user.id)){
          next()
        } else {
          req.flash("error", "Really?");
          res.redirect("back")
        }
      }
       
    });
  } else {
    req.flash("error", "That sucks!");
    res.redirect("back")
  }
}

module.exports = middleware

