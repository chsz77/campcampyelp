var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment")

// var data = [
//   {
//     name : "Salmon Creek", 
//     image:"https://media-cdn.tripadvisor.com/media/photo-s/04/49/4e/96/camp-4.jpg",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
//   },
//   {
//     name : "Mount Akina", 
//     image:"https://media-cdn.tripadvisor.com/media/photo-s/02/bc/01/4c/site-26-t-at-boyd-s-campground.jpg",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
//   },
//   {
//     name : "Gunma", 
//     image:"https://media-cdn.tripadvisor.com/media/photo-s/01/d9/bc/da/cougar-rock-campground.jpg",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
//   },
// ]

function seedDB(){
  Campground.remove({})}
//     if(err){
//       console.log(err)
//     }
//     console.log("Removed Campgrounds");
//       data.forEach(function(seed){
//         Campground.create(seed, function(err, campground){
//           if(err){
//             console.log(err)
//           } else {
//             console.log("added Campground");
//             Comment.create(
//               { 
//                 text: "wowowwwdowd",
//                 author: "Homer"
//               }, function(err, comment){
//                 if(err){
//                   console.log(err)
//                 } else{
//                   campground.comments.push(comment);
//                   campground.save();
//                   console.log("Created new comment")
//               }
//             }
//           )
//         }
//       })
//      }
//   )}
// )}
  
  
module.exports = seedDB;