var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/user");

//Index
router.get("/", function(req, res){
    res.render("landing");
});


//Auth
router.get("/register", function(req, res){
  res.render("register")
})
//Sign Up Logic
router.post("/register", function(req, res){
  var newUser = new User({username: req.body.username})
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(err)
      req.flash("error", err.message);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function(){
      req.flash("success", "Welcome to the Yelp Camp, " + user.username)
      res.redirect("/campgrounds");
    });
  });
})

//Login
router.get("/login", function(req, res){
  res.render("login");
});
//Login logic
router.post("/login", passport.authenticate("local", 
  {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
    failureFlash: true
  }), function(res, req){
});

//Logout
router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "You are logged out")
  res.redirect("/campgrounds");
})


module.exports = router;
