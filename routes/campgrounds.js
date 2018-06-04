var express = require("express"),
    router = express.Router(),
    Campground = require("../models/campground"),
    middleware = require("../middleware")

//Index
router.get("/", function(req, res){
   	var perPage = 12
 
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
})

router.get('/pages/:page', function(req, res, next) {
    var perPage = 12
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
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
		var desc = req.body.description;
    var author = {
      id: req.user._id,
      username: req.user.username
    };
    var newCampground = {name: name, image: image, price: price, description: desc, author: author};
		Campground.create(newCampground, function(err, newlyCreated){
			if(err){
				console.log(err)
			} else {
				req.flash("success", "Added a new campground")
        res.redirect("/campgrounds");
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




module.exports = router;