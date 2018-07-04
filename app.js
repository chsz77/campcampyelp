var express = require("express"),
		app = express(),
		bodyParser = require("body-parser"),
		mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),   
    flash = require("connect-flash"),
		Campground = require("./models/campground"),
		methodOverride = require("method-override"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    port = process.env.PORT || 8080;

var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes = require("./routes/comments"),
    indexRoutes = require("./routes/index");

mongoose.connect("mongodb://cahya:isra@ds235850.mlab.com:35850/webdev");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//Passport Config
app.use(require("express-session")({
  secret: "Cahya Isra",
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes)

app.listen(port, process.env.IP, function(){
    console.log("Started");
});

