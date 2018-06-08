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
        req.flash("error", err.message)
        res.redirect("back")
      } else {
        if(foundCampground.author.id && foundCampground.author.id.equals(req.user.id) || req.user.isAdmin){
          next()
        } else {
          req.flash("error", "You dont have any privilage to do that!");
          res.redirect("back")
        }
      }
       
    });
  } else {
    req.flash("error", "You dont have a privilage to to that");
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
    req.flash("error", "You have no privilage to do that");
    res.redirect("back")
  }
}


module.exports = middleware

