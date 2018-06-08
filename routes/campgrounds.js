var express = require("express"),
    router = express.Router(),
    Campground = require("../models/campground"),
    middleware = require("../middleware");

//Index
router.get("/", function(req, res){
   	var perPage = 20
 if(req.query.search){
   const regex = new RegExp(escapeRegex(req.query.search), 'gi');
   Campground
        .find({'name': regex})
        .skip(0)
        .limit(perPage)
        .exec(function(err, camps) {
            Campground.count({'name': regex}).exec(function(err, count) {
                if (err) return next(err)
                res.render('campgrounds/index', {
                    campgrounds:camps,
                    current: 1,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
   
 } else{
    Campground
        .find({})
        .skip(0)
        .limit(perPage)
        .exec(function(err, camps) {
            Campground.count().exec(function(err, count) {
                if (err) return next(err)
                res.render('campgrounds/index', {
                    campgrounds:camps,
                    current: 1,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
  } 
})

router.get('/pages/:page', function(req, res, next) {
    var perPage = 20
    var page = req.params.page || 1

    Campground
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, camps) {
            Campground.count().exec(function(err, count) {
                if (err) return next(err)
                res.render('campgrounds/index', {
                    campgrounds:camps,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
})



//Post
router.post("/", middleware.isLoggedIn, function(req, res){
  req.body.campground.author = {
    id: req.user._id,
    username: req.user.username
  }
  Campground.create(req.body.campground, function(err, campground) {
    if (err) {
      req.flash('error', err.message);
      return res.redirect('back');
    } else {
      req.flash('success', 'Campground is added')
      res.redirect('/campgrounds/' + campground.id);
    }
   });
});
                             

router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/new");
});

//Show
router.get("/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err)
		} else {
			res.render("campgrounds/show", {campground:foundCampground});
		}
	})
});

//Edit
router.get("/:id/edit", middleware.checkOwnership, function(req,res){
  Campground.findById(req.params.id, req.body.campground, function(err, foundCampground){
    if(err){
      res.redirect("/")
    } else{
      res.render("campgrounds/edit", {campground:foundCampground});
    }
    
  })
})
//Update
router.put("/:id", middleware.checkOwnership,  function(req, res){
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
    if(err){
      res.redirect("/campgrounds")
    } else {
      req.flash("success", "Campground is updated")
      res.redirect("/campgrounds/" + req.params.id)
    }
  });
})

//Destroy
router.delete("/:id", middleware.checkOwnership, function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/campgrounds");
    } else {
      req.flash("success", "Campground is deleted")
      res.redirect("/campgrounds")
    }
  });
})

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}


module.exports = router;