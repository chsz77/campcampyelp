var express = require("express"),
    router = express.Router({mergeParams: true}),
    Campground = require("../models/campground"),
    Comment = require("../models/comment"),
    middleware = require("../middleware");

//Comments
router.post("/", middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			req.flash("error", "Something isn't right!")
      res.redirect("/campgrounds")
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err)
				} else{
					//add username and id to comment          
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save()
          campground.comments.push(comment);
					campground.save();
					req.flash("success", "Added new comment")
          res.redirect("/campgrounds/" + campground._id);
				}
			})
		}
	})
})

router.get("/new", middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err)
		} else {
			res.render("comments/new", {campground:campground});
		}
	})
});

//Edit
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
  Comment.findById(req.params.comment_id, function(err, foundComment){
    if(err){
      res.redirect("back")
    } else{
      res.render("comments/edit", {campground_id: req.params.id, comment:foundComment});
    }
    
  })
})
//Update
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
    if(err){
      res.redirect("back")
    } else {
      req.flash("success", "Comment is edited")
      res.redirect("/campgrounds/" + req.params.id)
    }
  });
})

//Destroy
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if(err){
      res.redirect("back");
    } else {
      req.flash("success", "Your comment has been deleted")
      res.redirect("back")
    }
  });
})



module.exports = router